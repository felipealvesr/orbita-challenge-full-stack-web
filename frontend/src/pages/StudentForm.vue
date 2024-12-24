<template>
  <div>
    <Header :title="isEditMode ? 'Editar Aluno' : 'Cadastro de Aluno'" />

    <Form @save="save" @cancel="cancel" :disable-save="!isFormValid">
      <!-- Nome -->
      <div class="form-row">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Nome"
              v-model="studentViewModel.name"
              outlined
              dense
              :error-messages="validationMessages.name"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <!-- E-mail -->
      <div class="form-row">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              label="E-mail"
              v-model="studentViewModel.email"
              outlined
              dense
              :error-messages="validationMessages.email"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <!-- RA -->
      <div class="form-row">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              label="RA"
              v-model="studentViewModel.ra"
              outlined
              dense
              :disabled="isEditMode"
              :error-messages="validationMessages.ra"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <!-- CPF -->
      <div class="form-row">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              label="CPF"
              v-model="studentViewModel.cpf"
              v-mask="'###.###.###-##'"
              outlined
              dense
              :disabled="isEditMode"
              :error-messages="validationMessages.cpf"
              @input="onCpfInput"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import Form from "@/components/Form.vue";
import { InputRulesConstants } from "@/utils/RulesConstants";
import { MaskUtil, MaskIdentificacao } from "@/utils/MaskUtil";
import { toast } from 'vue3-toastify';
import { useMutation } from "@vue/apollo-composable";
import insertMutation from "@/graphql/mutations/student.insert.mutation.graphql";
import updateMutation from "@/graphql/mutations/student.update.mutation.graphql";
import { useStudentStore } from "@/stores/student/student-store";

const studentStore = useStudentStore();

const router = useRouter();

const isEditMode = computed(() => studentStore.ra > 0);

// const props = defineProps({
//   ra: {
//     type: Number,  
//     required: false,
//   },
// });

onMounted(() => {
  if (isEditMode.value) {
    const student = studentStore.GET_STUDENT();
    if (student) {
      let cpfFormat = MaskUtil.applyMask(student.cpf, MaskIdentificacao.CPF);
      studentViewModel.name = student.name;
      studentViewModel.email = student.email;
      studentViewModel.ra = student.ra.toString();
      studentViewModel.cpf = cpfFormat;
    } else {
      console.error("Nenhum estudante encontrado.");
    }
  } else {
    studentStore.ra = 0;
  }
});

interface Student {
  name: string;
  email: string;
  ra: string;
  cpf: string;
}

const { mutate: createStudent } = useMutation(insertMutation);
const { mutate: updateStudent } = useMutation(updateMutation);

const studentViewModel = reactive<Student>({
  name: "",
  email: "",
  ra: "",
  cpf: "",
});

const validations = reactive({
  name: (): string | true => {
    if (studentViewModel.name.trim() === "") {
      return InputRulesConstants.NAO_PODE_SER_VAZIO("Nome");
    }
    return true;
  },
  email: (): string | true => {
    const regexEmail = /.+@.+\..+/;
    if (studentViewModel.email.trim() === "") {
      return InputRulesConstants.NAO_PODE_SER_VAZIO("E-mail");
    }
    if (!regexEmail.test(studentViewModel.email)) {
      return InputRulesConstants.EMAIL_INVALIDO();
    }
    return true;
  },
  ra: (): string | true => {
    if (studentViewModel.ra.trim() === "") {
      return InputRulesConstants.NAO_PODE_SER_VAZIO("RA");
    }
    return true;
  },
  cpf: (): string | true => {
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (studentViewModel.cpf.trim() === "") {
      return InputRulesConstants.NAO_PODE_SER_VAZIO("CPF");
    }
    if (!regexCpf.test(studentViewModel.cpf)) {
      return InputRulesConstants.CPF_INVALIDO();
    }
    return true;
  },
});

const validationMessages = computed<Record<keyof Student, string[]>>(() => {
  const messages: Record<keyof Student, string[]> = {
    name: [],
    email: [],
    ra: [],
    cpf: [],
  };

  Object.keys(validations).forEach((field) => {
    const validationResult = validations[field as keyof Student]();
    messages[field as keyof Student] =
      validationResult === true ? [] : [validationResult as string];
  });

  return messages;
});

const isFormValid = computed(() =>
  Object.values(validationMessages.value).every((messages) => messages.length === 0)
);

const onCpfInput = () => {
  studentViewModel.cpf = MaskUtil.applyMask(studentViewModel.cpf, MaskIdentificacao.CPF);
};

const save = async () => {
  if (isFormValid.value) {
    try {
      let response;
      
      if (isEditMode.value) {
        response = await updateStudent({
          ra: parseInt(studentViewModel.ra, 10),
          input: {
            name: studentViewModel.name,
            email: studentViewModel.email,
          },
        });
      } else {
        response = await createStudent({
          input: {
            name: studentViewModel.name,
            cpf: MaskUtil.removeMask(studentViewModel.cpf),
            email: studentViewModel.email,
            ra: parseInt(studentViewModel.ra, 10),
          },
        });
      }

      if (response?.data) {
        const successMessage = isEditMode.value
          ? "Aluno atualizado com sucesso!"
          : "Aluno cadastrado com sucesso!";
        toast.success(successMessage);
        router.push({ name: "StudentSelect" });
      } else {
        throw new Error("Erro ao salvar aluno");
      }
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      toast.error("Erro ao salvar aluno. Verifique os dados e tente novamente.");
    }
  } else {
    toast.warning("Por favor, preencha todos os campos corretamente.");
  }
};

const cancel = () => {
  router.push({ name: "StudentSelect" });
  studentStore.ra = 0;
};
</script>
