<template>
  <div class="uptime-monitor">
    <span class="label">[SYSTEM_UPTIME]</span>
    <span class="time-value">{{ uptimeString }}</span>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const START_TIME = new Date(2026,3,12,0,0,0).getTime()
const uptimeString = ref('')
let timer = null
const updateUptime = () => {
  const now = new Date().getTime()
  const diff = now - START_TIME
  if (isNaN(diff)) {
    uptimeString.value = 'SYSTEM_OFFLINE'
    return
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  const fNum = (num) => num.toString().padStart(2, '0')
  uptimeString.value = `${fNum(days)}d : ${fNum(hours)}h : ${fNum(minutes)}m : ${fNum(seconds)}s`
}
onMounted(() => {
  updateUptime()
  timer = setInterval(updateUptime, 1000)
})
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
<style scoped>
.uptime-monitor{
  font-family: monospace;
  font-size: 0.85rem;
  display: flex;
  gap: 10px;
}
.label{
  opacity: 0.7;
}
</style>