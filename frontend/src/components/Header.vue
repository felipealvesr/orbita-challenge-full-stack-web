<template>
  <header class="main-header">
    <div class="header-content">
      <v-icon class="icon" @click="goBack">mdi-arrow-left</v-icon>
      <h1>{{ title }}</h1>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
  title: { type: String, required: true },
});

const router = useRouter();

function goBack() {
  router.back();
}
</script>

<style scoped>
.main-header {
  background-color: #0f171d;
  color: white;
  padding: 16px;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
}

.header-content h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  flex: 1;
  text-align: center;
}

.icon {
  font-size: 20px; 
  cursor: pointer; 
  margin-right: 16px; 
}
</style>
