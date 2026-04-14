<template>
  <div class="terminal-hero">
    <CommandPalette />
    <div class="code-line">
      <span class="prompt">guest@geek-folder:~$</span>
      <span class="typed-text">{{ displayText }}</span>
      <span class="cursor">_</span>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import CommandPalette from '../components/CommandPalette.vue';

const fullText = "npm install creativity --save-dev"
const displayText = ref('')
const typingSpeed = 100

const typeEffect = () => {
  let i = 0
  const timer = setInterval(() => {
    if (i < fullText.length) {
      displayText.value += fullText.charAt(i)
      i++
    } else {
      clearInterval(timer)
    }
  },typingSpeed)
}
onMounted(() => {
  typeEffect()
})
</script>