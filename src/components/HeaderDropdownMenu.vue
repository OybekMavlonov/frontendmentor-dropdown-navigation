<script setup lang="ts">
import {onMounted, onBeforeUnmount, ref} from "vue";

const props = defineProps<{
  title: string;
  childLinks: any[];
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle'): void;
  (e: 'close'): void;
}>();

const dropdownRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    emit('close');
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});


function getIconUrl(iconName: string) {
  return new URL(`/src/assets/images/${iconName}.svg`, import.meta.url).href
}
</script>

<template>
  <div class="flex items-center relative w-max" ref="dropdownRef">
    <div
        class="flex items-center text-l text-grey-500 font-bold cursor-pointer outline-none px-l py-m rounded-full gap-2 hover:text-black duration-300"
        :class="{ 'bg-ocean-100': isOpen }"
        @click.stop="emit('toggle')"
    >
      <div>
        {{ title }}
      </div>
      <img
          src="../assets/images/icon-arrow-down.svg"
          alt="arrow"
          class="transition-transform duration-300 ease-in-out"
          :class="{ 'rotate-180': isOpen }"
      />
    </div>
    <Transition
        name="dropdown"
        appear
    >
      <div v-if="isOpen" class="absolute top-full left-0 mt-2 w-max
             bg-white border shadow-lg rounded-xl z-50 p-4
             transition-all duration-500 ease-out origin-top"
           :class="{
        'opacity-100 scale-100': isOpen,
        'opacity-0 scale-75': !isOpen
      }">
        <div v-for="item in childLinks" :key="item.title" class="mb-l">
          <div
              class="flex gap-3 items-center group text-grey-500 rounded hover:text-black cursor-pointer relative
                   p-1 select-none outline-none data-[disabled]:pointer-events-none font-semibold"
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
  transition: opacity 0.55s ease, transform 0.55s ease;
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
