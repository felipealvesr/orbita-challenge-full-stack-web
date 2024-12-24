<template>
  <DataGrid
    title="Consulta de Alunos"
    :columns="columns"
    :rows="studentOnList" 
    :has-default-actions="true"
    @edit="editStudent"
    @delete="deleteStudent"
  >
    <!-- Campo de Busca e Botão -->
    <div class="header-controls">
      <div class="search-wrapper">
        <v-text-field
          v-model="searchQuery"
          label="Digite sua busca"
          outlined
          dense
          hide-details
          class="search-field"
        >
          <template #append-inner>
            <v-icon class="cursor-pointer">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </div>
      <v-btn color="terciary" @click="insertStudent" class="btn-left">
        Cadastrar Aluno
      </v-btn>
    </div>
  </DataGrid>
</template>

<style scoped>
.header-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
}

.search-wrapper {
  flex: 1;
  display: flex;
  justify-content: left;
}

.search-field {
  max-width: 50%;
}

.btn-left {
  margin-right: auto;
}

</style>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import DataGrid from "@/components/DataGrid.vue";
import router from "@/routes/router";
import { useMutation, useQuery } from "@vue/apollo-composable";
import getAllStudents from "@/graphql/queries/get.students.query.graphql";
import deleteOneStudent from "@/graphql/mutations/student.delete.mutation.graphql";
import { useStudentStore } from "@/stores/student/student-store";
import { StudentViewModel } from "@/graphql/graphql";  
import { toast } from 'vue3-toastify';
import Swal from "sweetalert2";

const studentOnList = ref<StudentViewModel[]>([]); 

const searchQuery = ref("");
const studentStore = useStudentStore();

const { result, loading, error, refetch } = useQuery(getAllStudents);
const { mutate: deleteStudentMutate } = useMutation(deleteOneStudent);

onMounted(() => {
  watch(
    result,
    (newResult) => {
      if (newResult?.students) {
        studentOnList.value = newResult.students.map((student: StudentViewModel) => ({
          ra: student.ra,
          name: student.name,
          email: student.email,
          cpf: student.cpf,
        }));
      }
    },
    { immediate: true } 
  );
});

const filteredStudents = computed(() => {
  return studentOnList.value.filter((aluno) =>
    Object.values(aluno)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  );
});
const columns = ref([
  { text: "Registro Acadêmico", value: "ra" },
  { text: "Nome", value: "name" },
  { text: "Email", value: "email" },
  { text: "CPF", value: "cpf" },
]);

const insertStudent = () => {
  studentStore.CLEAR_STUDENT(); 
  router.push({ name: "StudentForm" }); 
};

const editStudent = (ra: number) => {
  const student = studentOnList.value.find((s) => s.ra === ra);

  if (student) {
    studentStore.SET_STUDENT_DETAILS(student);

    router.push({
      name: "StudentForm",
      params: { ra },
    });
  } else {
    console.error(`Estudante com RA ${ra} não encontrado.`);
  }
};

const deleteStudent = async (ra: number) => {
  const result = await Swal.fire({
    title: "Tem certeza?",
    text: `Você realmente deseja excluir o aluno com RA ${ra}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    try {
      await deleteStudentMutate({ input: { ra } });
      toast.warning(`Aluno com RA ${ra} removido.`);
      await refetch();
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
      toast.error("Erro ao deletar aluno. Tente novamente.");
    }
  }
};
</script>