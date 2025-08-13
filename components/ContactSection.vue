<template>
  <section id="contact" ref="contactSection" class="section-padding bg-[#010319] py-12 md:py-20">
    <div class="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
      
      <!-- Left Column: Text Content -->
      <div class="text-white">
        <p ref="contactLabel" class="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4">{{ contactTypewriterText }}</p>
        <h2 class="text-3xl md:text-5xl font-normal mb-4 md:mb-6 leading-tight">
          {{ $t('contact.title') }}
        </h2>
        <p class="text-base md:text-lg text-gray-300 max-w-lg">
          {{ $t('contact.subtitle') }}
        </p>
      </div>

      <!-- Right Column: Form -->
      <div class="form bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        <form @submit.prevent="submitForm" class="space-y-4 md:space-y-6">
          <div>
            <label for="name" class="block text-white text-sm font-medium mb-2">{{ $t('contact.form.name') }}</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Jane Smith"
              class="w-full bg-[#181A2F] text-white px-4 py-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
          </div>
          <div>
            <label for="email" class="block text-white text-sm font-medium mb-2">{{ $t('contact.form.email') }}</label>
            <input 
              type="email" 
              id="email" 
              placeholder="mail@site.com"
              class="w-full bg-[#181A2F] text-white px-4 py-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
          </div>
          <div>
            <label for="message" class="block text-white text-sm font-medium mb-2">{{ $t('contact.form.message') }}</label>
            <textarea 
              id="message" 
              rows="4" 
              placeholder="Your message"
              class="w-full bg-[#181A2F] text-white px-4 py-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            ></textarea>
          </div>
          
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4">
            <p class="text-xs text-gray-400 order-2 md:order-1">
              {{ $t('contact.form.terms') }}
            </p>
            <button 
              type="submit" 
              class="bg-gradient-to-r from-[#1A56EE] to-[#4FC3F7] hover:opacity-90 hover:scale-105 text-white font-semibold py-3 px-8 md:px-10 rounded-full transition-all duration-300 order-1 md:order-2 w-full md:w-auto shadow-lg"
            >
              {{ $t('contact.form.submit') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
// Basic script setup for form handling
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const form = ref({
  name: '',
  email: '',
  message: '',
});

const contactSection = ref(null);
const contactLabel = ref(null);
const contactTypewriterText = ref('');
const contactHasAnimated = ref(false);
const contactFullText = '[ CONTACT US ]';

const submitForm = () => {
  // You can add your form submission logic here
  console.log('Form submitted:', form.value);
  // Example: Reset form after submission
  // form.value.name = '';
  // form.value.email = '';
  // form.value.message = '';
};

const startContactTypewriter = () => {
  if (contactHasAnimated.value) return;
  
  contactHasAnimated.value = true;
  let i = 0;
  
  function type() {
    if (i <= contactFullText.length) {
      contactTypewriterText.value = contactFullText.slice(0, i);
      i++;
      setTimeout(type, 60);
    }
  }
  type();
};

onMounted(() => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger);

    // Typewriter effect trigger for contact label
    ScrollTrigger.create({
      trigger: contactLabel.value,
      start: 'top 90%',
      onEnter: startContactTypewriter,
      once: true // This ensures it only triggers once
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactSection.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(contactSection.value.querySelector('.text-white'), {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: 'power3.out',
    }).from(
      contactSection.value.querySelector('.form'),
      {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.5'
    );
  }
});
</script>

