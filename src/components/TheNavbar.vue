<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">PORTFOLIO</div>
      <div class="nav-links" :class="{ 'is-active': isMenuOpen }">
        <router-link to="/#hero" @click="closeMenu" :class="{'active':config.currentSection==='hero'}">Home</router-link>
        <router-link to="/#projects" @click="closeMenu" :class="{'active':config.currentSection==='projects'}">Projects</router-link>
        <router-link to="/#tech" @click="closeMenu" :class="{'active':config.currentSection==='tech'}">Tech</router-link>
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
  document.addEventListener("click", (e) => {
    const nav = document.querySelector(".navbar");
    if (!nav.contains(e.target) && isMenuOpen.value) {
      isMenuOpen.value = false;
    }
  });
});
</script>
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--navbar-height);
  z-index: 1000;
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
.logo {
  font-weight: bold;
  letter-spacing: -1px;
  color: var(--accent-color);
}
.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}
.nav-links a {
  font-size: 0.9rem;
  color: var(--text-secondary);
}
.nav-links a:hover,
.nav-links a.active {
  color: var(--accent-color);
}

.theme-toggle {
  min-width: 90px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-family: var(--font-geek);
  cursor: pointer;
  border-radius: 4px;
  white-space: nowrap;
}
.theme-toggle:hover {
  border-color: var(--accent-color);
}
.menu-toggle {
  min-width: 80px;
  height: 32px;
  display: none;
  background: none;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 5px 10px;
  font-family: var(--font-geek);
  cursor: pointer;
  border-radius: 4px;
}
@media (min-width: 769px) {
  .menu-toggle {
    display: none !important;
  }
  .nav-links {
    display: flex !important;
    gap: 2rem;
    transform: none !important;
  }
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    flex-direction: column;
    top: var(--navbar-height);
    left: 0;
    width: 100%;
    height: auto;
    max-height: 400px;
    background: var(--bg-secondary);
    padding: 1.5rem;
    gap: 1.5rem;
    border-bottom: 2px solid var(--accent-color);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }
  .nav-links.is-active {
    display: flex;
    animation: slideIn 0.3s ease-out;
  }
  .menu-toggle {
    display: block;
  }
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
