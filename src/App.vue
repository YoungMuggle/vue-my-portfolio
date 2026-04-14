<template>
  <div
    :class="[
      config.isDark ? 'dark' : 'light',
      config.isMobile ? 'mobile-view' : 'desktop-view',
    ]"
  >
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
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
