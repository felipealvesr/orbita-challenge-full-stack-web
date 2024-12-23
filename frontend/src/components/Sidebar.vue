<template>
  <aside class="sidebar">
    <div class="logo">
      <img src="..\assets\logo.svg" alt="Logo" class="logo-img" />
    </div>
    <div class="module-title">
      <span class="label">Módulo Acadêmico</span>
    </div>
    <ul class="menu">
      <li
        v-for="item in menuItems"
        :key="item.label"
        class="menu-item"
        @click="navigateTo(item.route)"
      >
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.label }}
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { MenuItem } from "../enums/MenuItems";
import { useRouter } from "vue-router";

defineProps<{
  menuItems: MenuItem[];
}>();

const router = useRouter();

function navigateTo(route: string) {
  router.push(route);
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #8699a9;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.logo {
  width: 140px;
  height: 140px;
}

.logo-img {
  width: 75%;
  height: 75%;
  padding: 4px;
}

.module-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
}

.menu {
  list-style: none;
  padding: 0;
  width: 100%;
}

.label {
  position: relative;
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 10px 20px;
  z-index: 1;
}

.label::before,
.label::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  border-radius: 4px;
}

.label::before {
  background-color: #ff4c4c; 
  transform: translate(4px, 4px); 
}

.label::after {
  background-color: #00a0a6; 
  transform: translate(-4px, -4px);
}
.menu-item {
  display: block;
  width: 100%;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  text-align: left;
}

.menu-item:hover {
  background-color: #00a0a6;
  border-radius: 4px;
}
</style>
