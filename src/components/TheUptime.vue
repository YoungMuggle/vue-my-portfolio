<template>
  <div class="uptime-monitor">
    <div class="status-group">
      <span class="pulse-dot"></span>
      <span class="status-text">SYSTEM_READY</span>
    </div>

    <div class="divider">|</div>

    <div class="time-group">
      <span class="label">UPTIME:</span>
      <span class="value">{{ uptimeString }}</span>
    </div>

    <div class="version-tag">v2.0.4-stable</div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const uptimeString = ref("00:00:00");
let startTime = Date.now();
let interval = null;

const updateUptime = () => {
  const now = Date.now();
  const diff = Math.floor((now - startTime) / 1000);
  const h = Math.floor(diff / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((diff % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (diff % 60).toString().padStart(2, "0");
  uptimeString.value = `${h}:${m}:${s}`;
};

onMounted(() => {
  interval = setInterval(updateUptime, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>
<style scoped>
.uptime-monitor {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-family: var(--font-geek);
  font-size: 0.75rem;
  color: var(--text-secondary);
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}
.pulse-dot {
  width: 6px;
  height: 6px;
  background-color: var(--neon-green);
  border-radius: 50%;
  position: relative;
}
.pulse-dot::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background-color: var(--neon-green);
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(2.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.status-text {
  color: var(--neon-green);
  font-weight: bold;
}

.divider {
  color: var(--border-color);
}

.time-group .value {
  color: var(--text-primary);
  margin-left: 5px;
}

.version-tag {
  opacity: 0.5;
  font-size: 0.65rem;
}

/* 响应式：移动端简化显示 */
@media (max-width: 768px) {
  .uptime-monitor {
    bottom: 10px;
    left: 10px;
    gap: 8px;
    padding: 4px 8px;
  }
  .version-tag,
  .status-text {
    display: none; /* 手机端只显示时间以节省空间 */
  }
}
</style>
