<template>
  <div class="bg-fixed-container">
    <div class="base-layer"></div>
    <div class="grid-layer"></div>
    <div class="vignette-layer"></div>
  </div>
</template>

<style scoped>
.bg-fixed-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.base-layer {
  position: absolute;
  inset: 0;
  background-color: var(--bg-color);
  transition: background-color var(--transition-speed) var(--transition-timing);
}
.grid-layer {
  position: absolute;
  inset: -100px;
  background-image:
    linear-gradient(var(--grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: center center;
  opacity: 0.4;
  /* 如果想要更硬核的效果，可以加上轻微的透视旋转 */
  transform: perspective(1000px) rotateX(10deg);
  transition: background-image var(--transition-speed) var(--transition-timing);
}
.vignette-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    transparent 20%,
    var(--bg-color) 100%
  );
  transition: background var(--transition-speed) var(--transition-timing);
}
.bg-fixed-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--accent-color);
  opacity: 0.05;
  filter: blur(2px);
  animation: scanline 8s linear infinite;
}

@keyframes scanline {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(100vh);
  }
}
</style>
