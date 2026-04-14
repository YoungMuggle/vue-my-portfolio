<template>
  <div class="projects-wrapper">
    <div class="section-header">
      <span class="status-dot"></span>
      <h2 class="section-title">PROJECT_ARCHIVE_LOG</h2>
      <div class="header-line"></div>
    </div>
    <div class="projects-grid">
      <div
        v-for="project in projectData"
        :key="project.id"
        class="project-card"
      >
        <div class="card-corner top-left"></div>
        <div class="card-corner bottom-right"></div>
        <div class="card-content">
          <div class="project-id">// ID: 00{{ project.id }}</div>
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-desc">{{ project.desc }}</p>
          <div class="tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{
              tag
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { projectData } from "../data/projects";

const projects = ref(projectData);
</script>

<style scoped>
.projects-wrapper {
  padding: 80px 10%;
  background-color: var(--bg-color);
}
.section-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 50px;
}
.status-dot {
  width: 8px;
  height: 8px;
  background-color: var(--neon-green);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--neon-green);
}
.section-title {
  font-family: var(--font-geek);
  font-size: 1.2rem;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: 2px;
}
.header-line {
  flex-grow: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--border-color), transparent);
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
}
.project-card {
  position: relative;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 30px;
  transition: all var(--transition-speed) var(--transition-timing);
  cursor: pointer;
  overflow: visible;
}
.project-card:hover {
  border-color: var(--accent-color);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.card-corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: var(--accent-color);
  border-style: solid;
  opacity: 0;
  transition: opacity 0.3s;
}
.top-left {
  top: -2px;
  left: -2px;
  border-width: 2px 0 0 2px;
}
.bottom-right {
  bottom: -2px;
  right: -2px;
  border-width: 0 2px 2px 0;
}
.project-card:hover .card-corner {
  opacity: 1;
}
.project-id {
  font-size: 0.75rem;
  color: var(--accent-color);
  margin-bottom: 15px;
  opacity: 0.8;
}
.project-title {
  font-size: 1.4rem;
  margin: 0 0 15px 0;
  columns: var(--text-primary);
}
.project-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 25px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.tag {
  font-size: 0.75rem;
  padding: 4px 10px;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  background-color: var(--bg-color);
  border-radius: 2px;
  transition: all 0.2s;
}
.project-card:hover .tag {
  border-color: rgba(88, 166, 255, 0.3);
  color: var(--accent-color);
}
@media (max-width: 768px) {
  .projects-wrapper {
    padding: 60px 5%;
  }
  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
