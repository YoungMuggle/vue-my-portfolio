import { defineStore } from "pinia";
import { ref } from "vue";
export const useAppConfigStore = defineStore(
  "app-config",
  () => {
    //主题状态
    const isDark = ref(true);
    //切换主题
    const toggleTheme = () => {
      isDark.value = !isDark.value;
      updateThemeAttribute();
    };
    //状态同步到html标签，方便css控制
    const updateThemeAttribute = () => {
      const root = document.documentElement;
      if (isDark.value) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };
    //设备适配
    const isMobile = ref(false);
    const checkDevice = () => {
      isMobile.value = window.innerWidth <= 768;
    };
    return { isDark, toggleTheme, isMobile, checkDevice, updateThemeAttribute };
  },
  { persist: true },
);
