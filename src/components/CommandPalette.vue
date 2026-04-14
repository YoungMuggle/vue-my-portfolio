<template>
  <Transition name="fade">
    <div v-if="isOpen" class="palette-overlay" @click.self="close">
      <div class="palette-window">
        <div class="input-wrapper">
          <span class="prefix">></span>
          <input
            ref="inputRef"
            v-model="searchQuery"
            type="text"
            placeholder="Type a command or search..."
            @keydown.esc="close"
            @keydown.down="moveDown"
            @keydown.up="moveUp"
            @keydown.enter="executeCommand"
          />
          <span class="kbd-hint">ESC to close</span>
        </div>

        <div v-if="filteredCommands.length > 0" class="results-list">
          <div
            v-for="(cmd, index) in filteredCommands"
            :key="cmd.id"
            class="result-item"
            :class="{ 'is-active': index === activeIndex }"
            @mouseenter="activeIndex = index"
            @click="executeCommand"
          >
            <span class="cmd-icon">{{ cmd.icon }}</span>
            <span class="cmd-label">{{ cmd.label }}</span>
            <span class="cmd-shortcut" v-if="cmd.shortcut">{{
              cmd.shortcut
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { useAppConfigStore } from "../stores/appConfig";

const isOpen = ref(false);
const searchQuery = ref("");
const activeIndex = ref(0);
const inputRef = ref(null);

const config = useAppConfigStore();

const commands = [
  {
    id: "home",
    label: "GO_TO: INIT_SECTION",
    icon: "🏠",
    action: () => {
      // 直接修改 section 状态并平滑滚动
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      if (config) config.currentSection = "hero";
    },
  },
  {
    id: "projects",
    label: "GO_TO: PROJECT_ARCHIVE",
    icon: "🚀",
    action: () => {
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth" });
      if (config) config.currentSection = "projects";
    },
  },
  {
    id: "tech",
    label: "GO_TO: TECH_STACK",
    icon: "💻",
    action: () => {
      document.getElementById("tech")?.scrollIntoView({ behavior: "smooth" });
      if (config) config.currentSection = "tech";
    },
  },
  {
    id: "theme",
    label: "SWITCH: VISUAL_MODE",
    icon: "🌓",
    shortcut: "T",
    action: () => {
      // 直接触发你全局的切换逻辑
      if (config) config.toggleTheme();
    },
  },
];

const filteredCommands = computed(() => {
  return commands.filter((c) =>
    c.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const open = () => {
  isOpen.value = true;
  searchQuery.value = "";
  activeIndex.value = 0;
  nextTick(() => inputRef.value?.focus());
};

const close = () => {
  isOpen.value = false;
};

const moveDown = () => {
  activeIndex.value = (activeIndex.value + 1) % filteredCommands.value.length;
};
const moveUp = () => {
  activeIndex.value =
    (activeIndex.value - 1 + filteredCommands.value.length) %
    filteredCommands.value.length;
};

const executeCommand = () => {
  const selected = filteredCommands.value[activeIndex.value];
  if (selected) {
    selected.action();
    close();
  }
};

// 监听快捷键
const handleKeydown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    isOpen.value ? close() : open();
    return;
  }
  if (isOpen.value) {
    if (searchQuery.value === "" && e.key.toLowerCase() === "t") {
      e.preventDefault();
      config.toggleTheme();
      return;
    }
  }
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
</script>
<style scoped>
.palette-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  padding-top: 15vh;
}

.palette-window {
  width: 100%;
  max-width: 600px;
  background: var(--bg-secondary);
  border: 1px solid var(--accent-color);
  box-shadow:
    0 0 30px rgba(0, 0, 0, 0.5),
    0 0 10px var(--accent-color);
  border-radius: 8px;
  overflow: hidden;
  height: max-content;
}

.input-wrapper {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid var(--border-color);
  gap: 15px;
}

.prefix {
  color: var(--accent-color);
  font-family: var(--font-geek);
  font-weight: bold;
}

input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-family: var(--font-geek);
  font-size: 1.1rem;
}

.kbd-hint {
  font-size: 0.7rem;
  color: var(--text-secondary);
  background: var(--bg-color);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
}

.results-list {
  max-height: 400px;
  overflow-y: auto;
  padding: 10px 0;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  gap: 15px;
  cursor: pointer;
  transition: all 0.2s;
}

.result-item.is-active {
  background: rgba(88, 166, 255, 0.1);
  border-left: 4px solid var(--accent-color);
}

.cmd-icon {
  font-size: 1.2rem;
}
.cmd-label {
  flex: 1;
  color: var(--text-primary);
}
.cmd-shortcut {
  font-size: 0.7rem;
  opacity: 0.5;
  font-family: var(--font-geek);
}

/* Vue Transition */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
