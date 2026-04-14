<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">PORTFOLIO</div>
      <div class="nav-links" :class="{ 'is-active': isMenuOpen }">
        <router-link to="/#hero" @click="closeMenu">Home</router-link>
        <router-link to="/#projects" @click="closeMenu">Projects</router-link>
        <router-link to="/#tech" @click="closeMenu">Tech</router-link>
        <button class="theme-toggle" @click="config.toggleTheme">
          {{ config.isDark ? "🌙 DARK" : "☀️ LIGHT" }}
        </button>
      </div>
      <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
        {{ isMenuOpen ? "[CLOSE]" : "[MENU]" }}
      </button>
    </div>
  </nav>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useAppConfigStore } from "../stores/appConfig";

const config = useAppConfigStore();
const isMenuOpen = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
};
onMounted(() => {
  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.navbar')
    if (!nav.contains(e.target) && isMenuOpen.value) {
      isMenuOpen.value = false;
    }
  })
})
</script>
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--navbar-height);
  z-index: 1000;
  background-color: rgba(var(--bg-rgb), 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #333;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.menu-toggle{
  display: none;
  background: none;
  border: 1px solid #555;
  color: inherit;
  padding: 5px 10px;
  cursor: pointer;
}

@media (max-width: 768px){
  .nav-links{
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: #111;
    padding: 20px;
  }
  .nav-links.is-active{
    display: flex;
  }
  .menu-toggle{
    display: block;
  }
}

</style>
