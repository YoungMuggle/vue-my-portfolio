<template>
  <div class="tech-stack-wrapper">
    <div class="section-header">
      <span class="status-dot"></span>
      <h2 class="section-title">SYSTEM_CORE_SKILLS</h2>
    </div>
    <div class="terminal-window">
      <div class="window-header">
        <div class="dots"><span></span><span></span><span></span></div>
        <div class="file-name">skills.json - edited</div>
      </div>
      <div class="window-content">
        <div v-for="(group, index) in skillData" :key="index" class="code-row">
          <div class="line-number">
            {{ (index + 1).toString().padStart(2, "0") }}
          </div>
          <div class="line-content">
            <span class="bracket">{</span>
            <span class="category">{{ group.category }}</span
            >:
            <span class="bracket">[</span>
            <div class="skills-list">
              <span
                v-for="skill in group.skills"
                :key="skill"
                class="skill-item"
                >"{{ skill }}"</span
              >
            </div>
            <span class="bracket">]</span>
            <span class="bracket">}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { skillData } from "../data/skills";

const skills = skillData;
</script>
<style scoped>
.tech-stack-wrapper {
  padding: 80px 10%;
  background-color: var(--bg-color);
}
.section-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
}
.status-dot {
  width: 8px;
  height: 8px;
  background-color: var(--accent-color);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent-color);
}
.section-title {
  font-family: var(--font-geek);
  font-size: 1.2rem;
  letter-spacing: 2px;
}
.terminal-window {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}
.window-header {
  background-color: var(--border-color);
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.dots {
  display: flex;
  gap: 6px;
}
.dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--text-secondary);
  opacity: 0.5;
}
.file-name {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-family: var(--font-geek);
}
.window-content {
  pad: 20px 0;
  font-family: var(--font-geek);
}
.code-row {
  display: flex;
  padding: 4px 0;
  transition: background var(--transition-speed);
}
.code-row:hover {
  background-color: rgba(88, 166, 255, 0.05);
}
.line-number {
  width: 50px;
  text-align: right;
  padding-right: 20px;
  color: var(--text-secondary);
  opacity: 0.4;
  user-select: none;
  border-right: 1px solid var(--border-color);
}
.line-content {
  padding-left: 20px;
  color: var(--text-primary);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.bracket {
  color: var(--text-secondary);
}
.categoty {
  color: var(--accent-color);
}
.skills-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.skill-item {
  color: var(--neon-green);
  position: relative;
}
.skill-item:not(:last-child)::after {
  content: ",";
  color: var(--text-secondary);
}
@media (max-width: 768px) {
  .tech-stack-wrapper {
    padding: 60px 5%;
  }
  .line-number {
    width: 35px;
    padding-right: 10px;
  }
  .line-content {
    font-size: 0.85rem;
  }
}
</style>
