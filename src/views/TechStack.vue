<template>
  <div class="tech-container">
    <h2>[TECH_CORE_DUNP]</h2>
    <div v-for="group in skills" :key="group.category" class="skill-group">
      <h3>{{ group.category }}</h3>
      <ul>
        <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { skillData } from '../data/skills';

const skills = skillData
</script>