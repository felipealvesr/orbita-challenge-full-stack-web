<template>
  <div class="main-layout">
    <Sidebar :menuItems="menuItems" />

    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue"; 
import { MenuItems } from "@/enums/MenuItems";

const menuItems = MenuItems;
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
}

.main-container {
  flex: 1;
  padding: 16px;
  background-color: #f1eced;
  overflow-y: auto;
}
</style>
