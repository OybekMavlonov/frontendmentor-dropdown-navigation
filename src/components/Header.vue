<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import HeaderDropdownMenu from "./HeaderDropdownMenu.vue"
import MobileMenu from "./MobileMenu.vue"

const links = ref([
  {
    title: "Features",
    children: [
      {title: "Todo List", icon: "icon-todo"},
      {title: "Calendar", icon: "icon-calendar"},
      {title: "Reminders", icon: "icon-reminders"},
      {title: "Planning", icon: "icon-planning"},
    ]
  },
  {
    title: "Company",
    children: [
      {title: "History"},
      {title: "Out Team"},
      {title: "Blog"},
    ]
  },
  {title: "Careers"},
  {title: "About"}
])

const openDropdownKey = ref();
const isMobileMenuOpen = ref(false)

function toggleDropdown(title: string) {
  if (openDropdownKey.value === title) {
    openDropdownKey.value = null; // agar ochiq bo‘lsa — yopiladi
  } else {
    openDropdownKey.value = title; // boshqa dropdown bo‘lsa — yangisi ochiladi
  }
}

function closeDropdown() {
  openDropdownKey.value = null;
}

const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.classList.remove('overflow-y-hidden')
})

// Watch for prop changes to manage body overflow
watch(() => isMobileMenuOpen.value, (newValue) => {
  if (newValue) {
    document.body.classList.add('overflow-y-hidden')
  } else {
    document.body.classList.remove('overflow-y-hidden')
    openDropdownKey.value = null
  }
})

</script>

<template>
  <header
      ref="headerRef"
      class="py-4 sm:py-6 px-4 sticky top-0 self-start w-full z-50 bg-white transition duration-300"
      :class="{ 'shadow-md': isScrolled }"
  >
    <div class="container mx-auto flex items-center justify-between">
      <section class="flex items-center gap-x-16">
        <img src="../assets/images/logo.svg" alt="logo" class="w-15 h-5 sm:w-20 sm:h-[26px]">
        <div class="hidden md:flex md:items-center sm:gap-x-10">
          <div
              v-for="link in links"
              :key="link.url"
              class="cursor-pointer rounded-full"
          >
            <div v-if="link?.children">
              <HeaderDropdownMenu
                  :child-links="link.children"
                  :title="link.title"
                  :is-open="openDropdownKey === link.title"
                  @toggle="() => toggleDropdown(link.title)"
                  @close="closeDropdown"
              />
            </div>
            <div
                v-else
                class="text-grey-500 font-semibold rounded-full hover:text-black"
            >
              {{ link.title }}
            </div>
          </div>
        </div>
      </section>
      <section class="flex items-center gap-x-6">
        <button class="hidden md:block text-grey-500 font-semibold rounded-full hover:text-black cursor-pointer">Login</button>
        <button class="hidden md:block text-grey-500 font-semibold border border-2 p-2 px-4 rounded-xl border-grey-500
         hover:text-black hover:border-black cursor-pointer">Register</button>
        <button
            aria-label="Menu"
            class="md:hidden"
            @click="isMobileMenuOpen = true"
        >
          <img src="../assets/images/icon-menu.svg" alt="menu">
        </button>
      </section>
    </div>
  </header>
  <!-- Mobile Menu Component -->
  <MobileMenu
      :is-open="isMobileMenuOpen"
      :links="links"
      @close="isMobileMenuOpen = false"
  />
</template>

