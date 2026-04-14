<template>
  <div class="hero-inner">
    <div class="terminal-box">
      <div class="code-line">
        <span class="prompt">guest@geek-folder:~$</span>
        <span class="command">{{ displayText }}</span>
        <span class="cursor"></span>
      </div>
      <transition name="fade">
        <div v-if="isTypingDone" class="sub-line">
          <span class="comment"
            >// Front-end Developer / Vue.js Specialist</span
          >
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";

const fullText = "npm install creativity --save-dev";
const displayText = ref("");
const isTypingDone = ref(false);
const typingSpeed = 80;

const typeEffect = () => {
  let i = 0;
  const timer = setInterval(() => {
    if (i < fullText.length) {
      displayText.value += fullText.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      isTypingDone.value = true;
    }
  }, typingSpeed);
};
onMounted(() => {
  typeEffect();
});
</script>
<style scoped>
.hero-inner {
  min-height: calc(100vh - var(--navbar-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10%;
  position: relative;
  background-color: var(--bg-color);
  overflow: hidden;
}
.hero-inner::before {
  content: "01";
  position: absolute;
  bottom: -5%;
  right: 5%;
  font-size: 25rem;
  font-weight: 900;
  color: var(--accent-color);
  opacity: 0.05;
  z-index: 0;
  pointer-events: none;
}
.terminal-box {
  position: relative;
  z-index: 1;
}
.code-line {
  font-family: var(--font-geek);
  font-size: 2rem;
  line-height: 1.2;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.prompt {
  color: var(--neon-green);
  margin-right: 1.2rem;
  user-select: none;
}
.command {
  color: var(--text-primary);
  text-shadow: 0 0 12px rgba(88, 166, 255, 0.2);
}
.cursor {
  display: inline-block;
  width: 12px;
  height: 1.2rem;
  background-color: var(--accent-color);
  margin-left: 8px;
  animation: blink 1s step-end infinite;
}
.sub-line {
  margin-top: 1.5rem;
  font-size: 1.1rem;
}
.comment {
  color: var(--text-primary);
  font-style: italic;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.fade-enter-active {
  transition: all 0.8s ease-out;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
@media (max-width: 768px) {
  .hero-inner {
    padding: 0 5%;
  }
  .code-line {
    font-size: 1.3rem;
  }
  .prompt {
    margin-right: 0.8rem;
    font-size: 1rem;
  }
  .sub-line {
    font-size: 0.9rem;
  }
}
</style>
