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
          <Transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="toast.visible"
              :class="[
                'flex items-center gap-2 px-4 py-3 rounded-xl border text-sm',
                toast.type === 'success'
                  ? 'bg-emerald-500/10 text-emerald-100 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-100 border-rose-500/30'
              ]"
            >
              <span class="font-medium">
                {{ toast.message }}
              </span>
            </div>
          </Transition>
          <div>
            <label for="name" class="block text-white text-sm font-medium mb-2">{{ $t('contact.form.name') }}</label>
            <input 
              v-model="form.name"
              type="text" 
              id="name" 
              placeholder="Jane Smith"
              class="w-full bg-[#181A2F] text-white px-4 py-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
          </div>
          <div>
            <label for="email" class="block text-white text-sm font-medium mb-2">{{ $t('contact.form.email') }}</label>
            <input
              v-model="form.email"
              type="email" 
              id="email" 
              placeholder="mail@site.com"
              class="w-full bg-[#181A2F] text-white px-4 py-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
          </div>
          <div>
            <label for="phoneNumber" class="block text-white text-sm font-medium mb-2">{{ $t('contact.form.phoneNumber') }}</label>
            <input
              v-model="form.phoneNumber"
              type="text" 
              id="phoneNumber" 
              placeholder="+628XXXXXXX"
              class="w-full bg-[#181A2F] text-white px-4 py-3 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
          </div>
          <div>
            <label for="message" class="block text-white text-sm font-medium mb-2">{{ $t('contact.form.message') }}</label>
            <textarea
              v-model="form.message"
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
              class="bg-gradient-to-r from-[#1A56EE] to-[#4FC3F7] hover:opacity-90 hover:scale-105 text-white font-semibold py-3 px-8 md:px-10 rounded-full transition-all duration-300 order-1 md:order-2 w-full md:w-auto shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              :disabled="isSubmitting"
              :aria-busy="isSubmitting"
            >
              {{ isSubmitting ? $t('contact.form.sending') : $t('contact.form.submit') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
// Basic script setup for form handling
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const form = ref({
  name: '',
  email: '',
  phoneNumber: '',
  message: '',
});

const contactSection = ref(null);
const contactLabel = ref(null);
const contactTypewriterText = ref('');
const contactHasAnimated = ref(false);
const contactFullText = '[ CONTACT US ]';
const isSubmitting = ref(false);
const toast = ref({
  visible: false,
  type: 'success',
  message: ''
});
const { t } = useI18n();
let toastTimer = null;

const showToast = (type, message) => {
  toast.value = {
    visible: true,
    type,
    message
  };

  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  toastTimer = setTimeout(() => {
    toast.value.visible = false;
  }, 4000);
};

const submitForm = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    const res = await $fetch('https://n8n-shyft.aliirsyaadn.com/webhook/leads', {
      method: 'POST',
      body: form.value, // send form data
      headers: {
        Authorization: 'Basic ' + btoa('shyft:shyftbasicpassword2000')
      }
    })

    console.log('SUCCESS', res)
    showToast('success', t('contact.form.successToast'));
    form.value = {
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
    };
  } catch (err) {
    console.error('ERROR', err)
    showToast('error', t('contact.form.errorToast'));
  } finally {
    isSubmitting.value = false;
  }
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

onBeforeUnmount(() => {
  if (toastTimer) {
    clearTimeout(toastTimer);
  }
});
</script>

