<template>
  <div class="form-container">
    <div class="form-content">
      <slot></slot>
    </div>
    <div class="form-actions">
      <v-btn color="grey" @click="$emit('cancel')">Cancelar</v-btn>
      <v-btn color="primary" :disabled="disableSave" @click="$emit('save')">
        Salvar
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  disableSave: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.form-container {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 24px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  flex-grow: 1;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 16px;
}
</style>
