<template>
  <div class="fixed top-8 md:t-6 left-0 right-0 z-50 flex justify-center w-fit m-auto">
    <header 
      ref="headerRef"
      :class="[
        'transition-all duration-300 rounded-2xl',
        { 'py-3 shadow-lg shadow-black/20': isScrolled, 'py-4': !isScrolled }
      ]"
    >
      <div class="relative px-6">
        <nav class="flex justify-between items-center gap-6">
          <div class="flex items-center">
            <img
              :src="logoWhite"
              alt="logo"
              class="h-[32px] w-auto object-cover"
            >
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <a 
              v-for="item in navItems" 
              :key="item.name"
              :href="item.href" 
              @click.prevent="handleScrollToSection(item.href.substring(1))"
              class="text-white/70 hover:text-white transition-colors whitespace-nowrap"
            >
              {{ $t(item.name) }}
            </a>
          </div>

          <!-- Language Switcher -->
          <div class="hidden md:flex items-center relative language-dropdown">
            <button 
              @click="isLanguageDropdownOpen = !isLanguageDropdownOpen"
              class="flex items-center space-x-2 px-3 py-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/80 hover:text-white"
            >
              <span class="text-sm font-medium">{{ locale.toUpperCase() }}</span>
              <ChevronDownIcon 
                :class="[
                  'h-4 w-4 transition-transform duration-200',
                  { 'rotate-180': isLanguageDropdownOpen }
                ]"
              />
            </button>
            
            <!-- Language Dropdown -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95 -translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 -translate-y-1"
            >
              <div 
                v-if="isLanguageDropdownOpen"
                class="absolute top-full mt-2 right-0 min-w-[120px] rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 overflow-visible shadow-xl shadow-black/30 z-[9999]"
                style="z-index: 9999;"
              >
                <button
                  @click="handleLanguageChange('id')"
                  :class="[
                    'w-full px-4 py-2 text-left text-sm transition-colors',
                    locale === 'id' 
                      ? 'text-white bg-white/10' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  ]"
                >
                  ID
                </button>
                <button
                  @click="handleLanguageChange('en')"
                  :class="[
                    'w-full px-4 py-2 text-left text-sm transition-colors',
                    locale === 'en' 
                      ? 'text-white bg-white/10' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  ]"
                >
                  EN
                </button>
              </div>
            </Transition>
          </div>

          <!-- Contact Button -->
          <div class="hidden md:block">
            <button 
              @click.prevent="handleScrollToSection('contact')"
              class="px-6 py-2 rounded-xl bg-gradient-to-r from-[#1A56EE] to-[#4FC3F7] text-white hover:opacity-90 transition-all whitespace-nowrap"
            >
              {{ $t('hero.cta') }}
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button class="md:hidden text-white" @click.stop="isMenuOpen = !isMenuOpen">
            <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </nav>

        <!-- Mobile Menu -->
        <div v-if="isMenuOpen" class="md:hidden mt-6 overflow-hidden">
            <div class="relative p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl shadow-black/40">
              <!-- Background Gradient Overlay -->
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#A250F7]/10 via-transparent to-[#1e93d7]/10 pointer-events-none"></div>
              
              <div class="relative z-10 flex flex-col space-y-1">
                <a 
                  v-for="item in navItems"
                  :key="item.name"
                  :href="item.href" 
                  @click.prevent="handleScrollToSection(item.href.substring(1))"
                  class="group relative px-4 py-3 rounded-xl text-white/80 hover:text-white transition-all duration-300 text-center font-medium hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg"
                >
                  <span class="relative z-10">{{ $t(item.name) }}</span>
                  <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-[#A250F7]/20 to-[#1e93d7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <!-- CTA Button -->
                <div class="pt-4">
                  <button 
                    @click.prevent="handleScrollToSection('contact')"
                    class="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#A250F7] to-[#1e93d7] text-white font-semibold hover:shadow-lg hover:shadow-[#A250F7]/25 transform hover:scale-[1.02] transition-all duration-300"
                  >
                    {{ $t('hero.cta') }}
                  </button>
                </div>
                
                <!-- Mobile Language Switcher -->
                <div class="mt-6 pt-4 border-t border-white/20">
                  <div class="flex justify-center space-x-3">
                    <button
                      @click="handleLanguageChange('id')"
                      :class="[
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                        locale === 'id' 
                          ? 'bg-gradient-to-r from-[#A250F7]/30 to-[#1e93d7]/30 text-white border border-white/30 shadow-lg' 
                          : 'text-white/70 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                      ]"
                    >
                      ID
                    </button>
                    <button
                      @click="handleLanguageChange('en')"
                      :class="[
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                        locale === 'en' 
                          ? 'bg-gradient-to-r from-[#A250F7]/30 to-[#1e93d7]/30 text-white border border-white/30 shadow-lg' 
                          : 'text-white/70 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                      ]"
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <!-- Background Blur -->
      <div 
        v-show="!isMenuOpen"
        :class="[
          'absolute inset-0 -z-10 backdrop-blur-xl transition-all duration-300 rounded-2xl',
          { 'bg-white/10': isScrolled, 'bg-white/5': !isScrolled }
        ]"
      />
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/solid';
import logoWhite from '~/assets/images/logo-white.png'
const { locale, setLocale } = useI18n();

const headerRef = ref(null);
const isMenuOpen = ref(false);
const isScrolled = ref(false);
const isLanguageDropdownOpen = ref(false);

const navItems = [
  { name: 'header.services', href: '#services' },
  { name: 'header.ourWorks', href: '#ourWorks' },
  { name: 'header.contact', href: '#contact' }
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});

const handleScrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 0; // Adjust if you have a different header height
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: 'smooth',
    });
  }
  isMenuOpen.value = false; // Close mobile menu after clicking a link
};

const handleLanguageChange = (newLocale) => {
  setLocale(newLocale);
  isLanguageDropdownOpen.value = false;
};

const handleClickOutside = (event) => {
  // Close language dropdown if clicked outside
  if (!event.target.closest('.language-dropdown')) {
    isLanguageDropdownOpen.value = false;
  }
  
  // Close mobile menu if clicked outside header
  if (headerRef.value && !headerRef.value.contains(event.target)) {
    isMenuOpen.value = false;
  }
};
</script> 