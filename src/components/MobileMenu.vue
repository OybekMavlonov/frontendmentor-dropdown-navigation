<script setup lang="ts">
import {ref} from "vue";
import MobileDropdownMenu from "./MobileDropdownMenu.vue";
const props = defineProps<{
  links: any[];
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease"
    leave-active-class="transition duration-300 ease"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      role="presentation"
      class="fixed inset-0 size-full bg-black/40 z-50"
      @click="isOpen = false"
    />
  </transition>
  <aside
    class="flex flex-col fixed top-0 right-0 w-60 h-full bg-white z-50 transition-transform duration-300 ease-in-out"
    :class="{
      'translate-x-0': isOpen,
      'translate-x-full': !isOpen,
    }"
  >
    <header class="flex items-center justify-end mb-12 px-4 py-4">
      <button @click="emit('close');">
        <img src="../assets/images/icon-close-menu.svg" alt="close">
      </button>
    </header>
    <nav class="flex flex-col overflow-auto">
      <div v-for="link in links" :key="link.title" class="cursor-pointer px-4 py-2">
        <div v-if="link?.children">
          <MobileDropdownMenu
            :child-links="link.children"
            :title="link.title"
          />
        </div>
        <div
          v-else
          class="text-base inline-block w-full text-grey-500 font-semibold "
        >
          {{ link.title }}
        </div>
      </div>
    </nav>

    <footer class="mt-12 flex flex-col items-center gap-y-2 px-4 py-4">
      <button class="text-grey-500 text-base font-semibold rounded-full hover:text-black cursor-pointer">Login</button>
      <button class="w-full text-grey-500 font-semibold border border-2 p-2 px-4 rounded-xl border-grey-500
         hover:text-black hover:border-black cursor-pointer">Register</button>
    </footer>
  </aside>
</template>
