<template>
  <DataGrid 
    title="Consulta de Alunos"
    :columns="columns"
    :rows="filteredStudents"
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
import { ref, onMounted, computed } from "vue";
import DataGrid from "@/components/DataGrid.vue";
import router from "@/routes/router";
import { useQuery } from "@vue/apollo-composable";
import { GET_STUDENTS } from "@/graphql/queries/student.query";
import { useStudentStore } from "@/stores/student/student-store";
import StudentViewModel from "@/model/StudentViewModel";

const studentStore = useStudentStore();
const searchQuery = ref("");
const alunos = ref<StudentViewModel[]>([]);

const queryVariables = ref({
  filter: {}, 
});

const { result: listStudentsResult, refetch, loading, error } = useQuery(GET_STUDENTS, queryVariables);

onMounted(async () => {
  try {
    await refetch();
    if (listStudentsResult.value?.students?.nodes) {
      alunos.value = listStudentsResult.value.students.nodes;
    }
  } catch (err) {
    console.error("Erro ao buscar alunos:", err);
  }
});

const filteredStudents = computed(() => {
  return alunos.value.filter((aluno) =>
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

const insertStudent = () => router.push({ name: "StudentForm" });

const editStudent = (ra: number) => {
  studentStore.SET_STUDENT_RA(ra);
  router.push({ name: "StudentForm", params: { ra } });
};

const deleteStudent = async (ra: number) => {
  try {
    alunos.value = alunos.value.filter((a) => a.ra !== ra);
    console.log(`Aluno com RA ${ra} removido.`);
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
  }
};
</script>
