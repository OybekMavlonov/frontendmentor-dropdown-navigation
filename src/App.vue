<script setup>
import Header from "./components/Header.vue"
</script>

<template>
  <div>
    <Header/>
    <div class="container mx-auto">
      <div class="grid md:grid-cols-2 gap-x-20">
        <div class="mt-10 md:hidden block">
          <img src="./assets/images/image-hero-mobile.png" alt="hero" class="max-h-[calc(100vh-14rem)] w-full object-contain">
        </div>
        <div class="mt-8 text-center px-4 md:mt-32">
          <h1 class="font-bold text-black text-4xl md:text-8xl">Make remote work</h1>
          <p class="text-grey-500 text-base md:text-xl mt-3 md:mt-10 mb-8 md:mb-16">Get your team in sync, no matter your location. <br>
            Streamline processes, create team rituals,
            <br> and watch productivity soar.</p>
          <button
              class="text-white bg-black md:bg-white md:text-grey-500 md:font-semibold border border-2 p-2 md:p-4 text-sm
              rounded-xl md:border-grey-500 md:hover:text-black md:hover:border-black cursor-pointer">
            Learn more
          </button>
          <div class="grid grid-cols-4 items-center gap-x-4 md:gap-x-8 mt-8 md:mt-16">
            <img src="./assets/images/client-databiz.svg" alt="databiz">
            <img src="./assets/images/client-audiophile.svg" alt="audiophile">
            <img src="./assets/images/client-meet.svg" alt="meet">
            <img src="./assets/images/client-maker.svg" alt="maker">
          </div>
        </div>
        <div class="mt-10 hidden md:block">
          <img src="./assets/images/image-hero-desktop.png" alt="hero" class="max-h-[calc(100vh-14rem)] w-full object-contain">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
