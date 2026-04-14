<template>
  <div class="main-container">
    <TheBackground />
    <TheNavbar />
    <main class="main-content">
      <section id="hero">
        <HeroSection />
      </section>
      <section id="projects">
        <ProjectGallery />
      </section>
      <section id="tech">
        <TechStack />
      </section>
    </main>
    <TheUptime />
    <CommandPalette />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CommandPalette from "../components/CommandPalette.vue";
import TheBackground from "../components/TheBackground.vue";
import TheNavbar from "../components/TheNavbar.vue";
import TheUptime from "../components/TheUptime.vue";
import { useAppConfigStore } from "../stores/appConfig";
import HeroSection from "./HeroSection.vue";
import ProjectGallery from "./ProjectGallery.vue";
import TechStack from "./TechStack.vue";
const config = useAppConfigStore();
const activeSection = ref("hero");

onMounted(() => {
  const observerOptions = {
    root: null,
    threshold: 0.6,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
        config.currentSection = entry.target.id;
      }
    });
  }, observerOptions);
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => observer.observe(section));
  config.updateThemeAttribute();
  config.checkDevice();
  window.addEventListener("resize", config.checkDevice);
});
</script>
<style scoped>
.main-content {
  padding-top: var(--navbar-height);
}
</style>
