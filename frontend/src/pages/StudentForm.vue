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
              v-model="studentViewModel.nome"
              outlined
              dense
              :error-messages="validationMessages.nome"
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
import { useRoute, useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import Form from "@/components/Form.vue";
import { InputRulesConstants } from "@/utils/RulesConstants";
import { MaskUtil, MaskIdentificacao } from "@/utils/MaskUtil";
import { toast } from 'vue3-toastify';
import { useMutation } from "@vue/apollo-composable";
import { INSERT_STUDENT, UPDATE_STUDENT } from "@/graphql/mutations/student.mutation";
import { useStudentStore } from "@/stores/student/student-store";

const studentStore = useStudentStore();

const route = useRoute();

const props = defineProps({
  ra: {
    type: Number,  
    required: false,
  },
});

onMounted(() => {
  if (!route.params.ra) {
    studentStore.ra = 0;
  }
});

const isEditMode = computed(() => studentStore.ra > 0);

const router = useRouter();

interface InsertVariables {
  input: {
    name: string;
    cpf: string;
    email: string;
    ra: number;
  };
}

interface UpdateVariables {
  ra: number;
  input: {
    name: string;
    cpf: string;
    email: string;
  };
}

interface Student {
  nome: string;
  email: string;
  ra: string;
  cpf: string;
}

type Variables = InsertVariables | UpdateVariables;

const { mutate: createStudent } = useMutation(INSERT_STUDENT);
const { mutate: updateStudent } = useMutation(UPDATE_STUDENT);

const studentViewModel = reactive<Student>({
  nome: "",
  email: "",
  ra: "",
  cpf: "",
});

const validations = reactive({
  nome: (): string | true => {
    if (studentViewModel.nome.trim() === "") {
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
    nome: [],
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
      const variables: Variables = studentStore.ra
        ? {
            ra: studentStore.ra,
            input: {
              name: studentViewModel.nome,
              cpf: studentViewModel.cpf,
              email: studentViewModel.email,
            },
          }
        : {
            input: {
              name: studentViewModel.nome,
              cpf: studentViewModel.cpf,
              email: studentViewModel.email,
              ra: parseInt(studentViewModel.ra),
            },
          };

      const response = studentStore.ra
        ? await updateStudent({ variables })
        : await createStudent({ variables });

      if (response?.data?.insertStudent?.studentViewModel || response?.data?.updateStudent?.studentViewModel) {
        toast.success(
          studentStore.ra ? 'Aluno atualizado com sucesso!' : 'Aluno cadastrado com sucesso!'
        );
        router.push({ name: 'StudentSelect' });
      } else {
        throw new Error('Erro ao salvar aluno');
      }
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      toast.error('Erro ao salvar aluno. Verifique os dados e tente novamente.');
    }
  } else {
    toast.warning('Por favor, preencha todos os campos corretamente.');
  }
};

const cancel = () => {
  router.push({ name: "StudentSelect" });
};
</script>
