<template>
  <section ref="heroSection" class="relative min-h-screen flex items-center justify-center overflow-hidden text-center hero-section">
    <!-- Spotlight effect -->
    <div class="absolute inset-0 w-full h-full pointer-events-none z-0">
      <div class="w-full h-full bg-gradient-to-br from-[#fff2] via-transparent to-transparent rounded-full blur-3xl opacity-40"></div>
    </div>
    <div class="container-max relative z-10 mt-12">
      <!-- Content -->
      <div class="max-w-[1200px] mx-auto px-4">
        <h1 class="text-4xl md:text-6xl lg:text-[113px] leading-tight text-white mb-8 hero-title">
          {{ $t('hero.title') }}
        </h1>
        <p class="text-md md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          {{ $t('hero.subtitle') }}
        </p>
        <div class="flex justify-center">
          <button @click.prevent="handleScrollToSection('contact')" class="hero-cta flex items-center gap-3 px-8 py-4 rounded-full font-medium text-white text-lg shadow-xl bg-gradient-to-r from-[#1A56EE] to-[#4FC3F7] hover:scale-105 transition-transform">
            {{ $t('hero.cta') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const heroSection = ref(null)

const handleScrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const headerOffset = 0
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.from(heroSection.value.querySelector('h1'), {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
    })
      .from(
        heroSection.value.querySelector('p'),
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .from(
        heroSection.value.querySelector('.hero-cta'),
        {
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
  }
})
</script>

<style scoped>
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-image: url('/assets/images/raylight.png'); */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top left;
  opacity: 0.1; /* You can adjust this value from 0 (transparent) to 1 (opaque) */
  z-index: 1;
}

.hero-section {
  background: radial-gradient(circle at -9% 22%, #1A56EE 0%, transparent 35%),
            radial-gradient(circle at 100% 22%, #1A56EE 0%, transparent 35%),
            linear-gradient(to bottom, #010319 0%, #010319 40%, #010319 70%, #010319 100%);
}

@media screen and (min-width: 768px) {
  .hero-title {
    letter-spacing: -5px;
  }
 
}
</style>
