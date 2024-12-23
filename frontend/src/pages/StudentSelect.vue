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

  <v-progress-circular
    v-if="loading"
    indeterminate
    color="primary"
    size="50"
    class="loading-spinner"
  />
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

.loading-spinner {
  display: block;
  margin: 20px auto;
}
</style>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import DataGrid from "@/components/DataGrid.vue";
import router from "@/routes/router";
import { useQuery } from "@vue/apollo-composable";
import { GET_STUDENTS } from "@/graphql/queries/student.query";
import { useStudentStore } from "@/stores/student/student-store";
import { StudentViewModel } from "@/graphql/graphql";  

const studentOnList = ref<StudentViewModel[]>([]); 

// const alunos = ref([
//   { ra: 12345, name: "João Silva", email: "joao.silva@example.com", cpf: "123.456.789-01" },
//   { ra: 67890, name: "Maria Oliveira", email: "maria.oliveira@example.com", cpf: "234.567.890-12" },
//   { ra: 11223, name: "Pedro Costa", email: "pedro.costa@example.com", cpf: "345.678.901-23" },
//   { ra: 44556, name: "Ana Souza", email: "ana.souza@example.com", cpf: "456.789.012-34" },
//   { ra: 78901, name: "Carlos Pereira", email: "carlos.pereira@example.com", cpf: "567.890.123-45" },
// ]);

const searchQuery = ref("");
const studentStore = useStudentStore();

const { result: listStudentsResult, loading, error } = useQuery(GET_STUDENTS);

const fetchStudents = async () => {
  try {
    if (listStudentsResult.value?.students) {
      studentOnList.value = listStudentsResult.value.students.map((student: any) => ({
        ra: student.ra,
        name: student.name,
        email: student.email,
        cpf: student.cpf,
      }));
    }
  } catch (err) {
    console.error("Erro ao buscar alunos:", err);
  }
};

onMounted(() => {
  fetchStudents(); 
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

const insertStudent = () => router.push({ name: "StudentForm" });

const editStudent = (ra: number) => {
  studentStore.SET_STUDENT_RA(ra);
  router.push({
    name: "StudentForm",
    params: { ra },
  });
};

const deleteStudent = async (ra: number) => {
  try {
    studentOnList.value = studentOnList.value.filter((a) => a.ra !== ra);
    console.log(`Aluno com RA ${ra} removido.`);
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
  }
};

watch(searchQuery, (newSearch) => {
  if (newSearch.trim() === "") {
    fetchStudents(); 
  }
});
</script>