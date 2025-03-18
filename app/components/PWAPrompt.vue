<script setup>
const { $pwa } = useNuxtApp();
</script>

<template>
  <Transition name="slide-up">
    <div v-if="$pwa.needRefresh" class="pwa-prompt">
      <span>Przyszła aktualizacja. Zaktualizować czy później?</span>
      <button @click="$pwa.updateServiceWorker()">Dawaj teraz!</button>
      <button @click="">Później. Samo się zaktualizuje</button>
    </div>
  </Transition>
</template>

<style scoped lang="less">
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.pwa-prompt {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  color: #fff;
  padding: 10px;
  text-align: center;
  z-index: 1000;
  height: 8em;

  span {
    display: block;
    margin-bottom: 10px;
  }

  button {
    margin: 10px;
    padding: 10px;
    background: #015205;
    color: #ffffff;
    border: none;
    cursor: pointer;
    border-radius: 25px;

    @media screen and (min-width: 768px) {
      transition: transform 0.5s ease;

      &:hover {
        transform: scale(1.3);
      }
    }
  }
}
</style>
