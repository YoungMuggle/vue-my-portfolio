<template>
  <div
    :class="[
      config.isDark ? 'dark' : 'light',
      config.isMobile ? 'mobile-view' : 'desktop-view',
    ]"
  >
    <TheNavbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import TheNavbar from "./components/TheNavbar.vue";
import { useAppConfigStore } from "./stores/appConfig";
const config = useAppConfigStore();
const handleResize = () => {
  config.checkDevice();
};
onMounted(() => {
  config.checkDevice();
  config.updateThemeAttribute();
  window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
<style>
.dark {
  background-color: #0d1117;
  color: #c9d1d9;
}
.light {
  background-color: #ffffff;
  color: #24292f;
}
</style>
