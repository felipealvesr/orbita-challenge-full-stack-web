<template>
  <div>
    <Header title="Cadastro de Aluno" />

    <Form @save="save" @cancel="cancel" :disable-save="!isFormValid">
      <!-- Nome -->
      <div class="form-row">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              label="Nome"
              v-model="student.nome"
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
              v-model="student.email"
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
              v-model="student.ra"
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
              v-model="student.cpf"
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
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import Form from "@/components/Form.vue";
import { InputRulesConstants } from "@/utils/RulesConstants";
import { MaskUtil, MaskIdentificacao } from "@/utils/MaskUtil";
import { toast } from 'vue3-toastify';
import { useStudentStore } from "@/stores/student/student-store";
import { useMutation } from "@vue/apollo-composable";
import { INSERT_STUDENT } from "@/graphql/mutations/student.mutation";

const router = useRouter();

const studentStore = useStudentStore();

const { mutate: createStudent } = useMutation(INSERT_STUDENT);

interface Student {
  nome: string;
  email: string;
  ra: string;
  cpf: string;
}

const student = reactive<Student>({
  nome: "",
  email: "",
  ra: "",
  cpf: "",
});

const validations = reactive({
  nome: (): string | true => {
    if (student.nome.trim() === "") {
      return InputRulesConstants.NAO_PODE_SER_VAZIO("Nome");
    }
    return true;
  },
  email: (): string | true => {
    const regexEmail = /.+@.+\..+/;
    if (student.email.trim() === "") {
      return InputRulesConstants.NAO_PODE_SER_VAZIO("E-mail");
    }
    if (!regexEmail.test(student.email)) {
      return InputRulesConstants.EMAIL_INVALIDO();
    }
    return true;
  },
  ra: (): string | true => {
    if (student.ra.trim() === "") {
      return InputRulesConstants.NAO_PODE_SER_VAZIO("RA");
    }
    return true;
  },
  cpf: (): string | true => {
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (student.cpf.trim() === "") {
      return InputRulesConstants.NAO_PODE_SER_VAZIO("CPF");
    }
    if (!regexCpf.test(student.cpf)) {
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
  student.cpf = MaskUtil.applyMask(student.cpf, MaskIdentificacao.CPF);
};

const save = async () => {
  if (isFormValid.value) {
    try {
      const variables = {
        input: {
          nome: student.nome,
          email: student.email,
          ra: student.ra,
          cpf: student.cpf,
        },
      };

      const response = await createStudent({ variables });

      if (response?.data?.createStudent) {
        toast.success("Aluno cadastrado com sucesso!");
        router.push({ name: "StudentSelect" });
      } else {
        throw new Error("Erro ao cadastrar aluno");
      }
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      toast.error("Erro ao cadastrar aluno. Verifique os dados e tente novamente.");
    }
  } else {
    toast.warning("Por favor, preencha todos os campos corretamente.");
  }
};

const cancel = () => {
  router.push({ name: "StudentSelect" });
};
</script>
