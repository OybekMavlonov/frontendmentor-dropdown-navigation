<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  title: string;
  childLinks: any[];
}>();

const emit = defineEmits<{
  (e: 'toggle'): void;
  (e: 'close'): void;
}>();

const isOpen = ref(false)

function getIconUrl(iconName: string) {
  return new URL(`../assets/images/${iconName}.svg`, import.meta.url).href
}
</script>

<template>
  <div>
    <div
        class="text-l w-full text-grey-500 flex font-bold"
        :class="{ 'border-b-0': isOpen }"
        @click="isOpen = !isOpen"
    >
      <div
          class="w-full flex justify-between cursor-default items-center text-grey-500 outline-none text-base font-semibold"
      >
        {{ title }}
        <div
            class="ml-1 transition-all duration-300"
            :class="{ 'translate-y--2/4 rotate-180': isOpen }"
        >
          <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.29289 9.79289C7.68342 9.40237 8.31658 9.40237 8.70711 9.79289L12 13.0858L15.2929 9.79289C15.6834 9.40237 16.3166 9.40237 16.7071 9.79289C17.0976 10.1834 17.0976 10.8166 16.7071 11.2071L12.7071 15.2071C12.3166 15.5976 11.6834 15.5976 11.2929 15.2071L7.29289 11.2071C6.90237 10.8166 6.90237 10.1834 7.29289 9.79289Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <Transition
        name="dropdown"
        appear
    >
      <div v-if="isOpen"
           class="transition-all duration-200 overflow-hidden mt-3 pl-4"
      >
        <div v-for="item in childLinks" :key="item.title" class="">
          <div
              class="flex gap-3 text-base items-center group text-grey-500 rounded hover:text-black cursor-pointer relative
                   px-1 py-1 select-none outline-none data-[disabled]:pointer-events-none"
          >
            <img v-if="item.icon" :src="getIconUrl(item.icon)" alt="icon">
            {{ item.title }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
