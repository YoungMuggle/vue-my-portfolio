<template>
  <div class="section-container">
    <h2>PROJECTS_LIST</h2>
    <div v-for="item in projects" :key="item.id" class="project-card">
      <h3>{{ item.title }}</h3>
      <div class="tags">
        <span v-for="tag in item.techStack" :key="tag">[{{ tag }}]</span>
      </div>
      <p>{{ item.description }}</p>
      <small>Status:{{ item.status }}</small>
      <br />
      <a :href="item.link" target="_blank">View_Source_Code</a>
      <hr />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { projectData } from '../data/projects';

const projects = ref(projectData)
</script>

<style scoped>
.project-card{
  margin: 20px 0;
  padding:  10px;
  border: 1px dashed #ccc;
}
.tag{
  color:#666;
  font-size: 0.9em;
}
</style>