<template>
  <div v-if="isVisible" class="palette-overlay" @click.self="isVisible = false">
    <div class="palette-window">
      <input
        ref="searchInput"
        v-model="query"
        placeholder="Type a project name to jump..."
        @keyup.esc="isVisible = false"
      />
      <ul v-if="results.length">
        <li v-for="item in results" :key="item.id" @click="jumpTo(item.id)">
          [EXECUTE]{{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { projectData } from "../data/projects";

const isVisible = ref(false);
const query = ref("");
const router = useRouter();

const results = computed(() => {
  if (!query.value) return [];
  return projectData.filter((p) =>
    p.title.toLowerCase().includes(query.value.toLowerCase()),
  );
});
const jumpTo = (id) => {
  isVisible.value = false;
  router.push(`#/projects`);
};
const handleKeyDown = (e) => {
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault();
    isVisible.value = !isVisible.value;
    if (isVisible.value) {
      nextTick(() => {
        document.querySelector(".palette-window input")?.focus();
      });
    }
  }
};
onMounted(() => window.addEventListener("keydown", handleKeyDown));
onUnmounted(() => window.removeEventListener("keydown", handleKeyDown));
</script>
