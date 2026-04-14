<template>
  <div class="app-container">
    <section id="hero">
      <h1>hello , world</h1>
    </section>
    <section id="projects">
      <ProjectGallery />
    </section>
    <section id="tech">
      <TechStack />
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAppConfigStore } from "../stores/appConfig";
import ProjectGallery from "./ProjectGallery.vue";
import TechStack from "./TechStack.vue";
const config = useAppConfigStore();
const activeSection = ref('hero');

onMounted(() => {
  const observerOptions = {
    root: null,
    threshold: 0.6
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
        config.currentSection = entry.target.id
      }
    })
  }, observerOptions)
  const sections = document.querySelectorAll('section')
  sections.forEach(section=>observer.observe(section))
  config.updateThemeAttribute();
  config.checkDevice();
  window.addEventListener("resize", config.checkDevice);
});
</script>
<style scoped>
/* 撑开布局测试路由 */
#hero{
  width: 100%;
  height: 100vh;
  background-color: #00ff00;
}
#projects{
  width: 100%;
  height: 100vh;
}
#tech{
  width: 100%;
  height: 100vh;
  background-color: #ff0055;
}
</style>
