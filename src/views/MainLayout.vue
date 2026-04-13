<template>
  <div class="app-container">
    <section id="hero">
      <h1>hello , world</h1>
    </section>
    <section id="projects">
      <ProjectGallery />
    </section>
    <section id="tech">
      <h2>technology</h2>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAppConfigStore } from "../stores/appConfig";
import ProjectGallery from "./ProjectGallery.vue";
const config = useAppConfigStore();
onMounted(() => {
  config.updateThemeAttribute();
  config.checkDevice();
  window.addEventListener("resize", config.checkDevice);
});
</script>
<style scoped>
/* 撑开布局测试路由
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
} */
</style>
