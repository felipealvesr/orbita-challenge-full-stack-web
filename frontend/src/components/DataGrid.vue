<template>
  <div class="main-layout">
    <div class="main-container">
      <Header :title="title" />

      <div class="grid-container">
        <div class="grid-header">
          <v-card class="content-card">
            <v-card-text>
              <div class="header-controls">
                <slot></slot>
              </div>
              <table v-if="columns.length" class="data-table">
                <thead>
                  <tr>
                    <th
                      v-for="(column, index) in columns"
                      :key="index"
                      class="table-header"
                    >
                      {{ column.text }}
                    </th>
                    <th v-if="hasDefaultActions">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in rows" :key="row.ra">
                    <td
                      v-for="(column, index) in columns"
                      :key="index"
                    >
                      {{ row[column.value] }}
                    </td>
                    <td v-if="hasDefaultActions">
                      <slot name="actions" :row="row">
                        <!-- Ações padrão -->
                        <v-btn
                          small
                          color="primary"
                          class="mr-2"
                          @click="$emit('edit', row.ra)"
                        >
                          Editar
                        </v-btn>
                        <v-btn
                          class="tonal"
                          small
                          color="secondary"
                          @click="$emit('delete', row.ra)"
                        >
                          Excluir
                        </v-btn>
                      </slot>
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue';
defineProps({
  title: { type: String, required: true },
  columns: { 
    type: Array, 
    default: () => [] 
  },
  rows: { type: Array, required: true },
  hasDefaultActions: { type: Boolean, default: true },
});
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  background-color: #F5F5F5;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #f1eced;
}

.table-header {
  font-weight: bold;
  text-align: left;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.data-table th,
.data-table td {
  padding: 8px;
  text-align: left;
}

.data-table th {
  background-color: #0f171d;
  color: white;
}

.data-table tr:nth-child(even) {
  background-color: #e7e7e7;
}

.data-table tr:nth-child(odd) {
  background-color: #ffffff;
}

.header-controls {
  margin-bottom: 16px;
  display: flex;
}
</style>
