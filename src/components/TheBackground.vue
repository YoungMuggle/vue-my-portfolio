<template>
  <div class="geek-bg">
    <div class="grid-layer"></div>
    <div class="dot-layer"></div>
  </div>
</template>
<style scoped>
.geek-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
}
.grid-layer{
  position: absolute;
  width: 200%;
  height: 200%;
  background-image: 
    linear-gradient(var(--grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: center;
  opacity: 0.15;
  transform: perspective(500px) rotateX(60deg);
}
</style>
