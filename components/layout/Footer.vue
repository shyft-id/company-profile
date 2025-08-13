<template>
  <footer class="footer text-white">
    <div class="max-w-[1200px] mx-auto section-padding">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img
            :src="logoWhite"
            alt="logo"
            class="h-[28px] w-auto object-cover mb-[10px]"
          >
          <p>{{ $t('footer.company_description') }}</p>
        </div>
        
        <div>
          <h4 class="font-normal mb-4">{{ $t('footer.services.title') }}</h4>
          <ul class="space-y-2">
            <li><a href="#services" @click.prevent="handleScrollToSection('services')" class="hover:text-white transition-colors">{{ $t('footer.services.workflow_automation') }}</a></li>
            <li><a href="#services" @click.prevent="handleScrollToSection('services')" class="hover:text-white transition-colors">{{ $t('footer.services.ai_chatbots') }}</a></li>
            <li><a href="#services" @click.prevent="handleScrollToSection('services')" class="hover:text-white transition-colors">{{ $t('footer.services.custom_software') }}</a></li>
            <li><a href="#services" @click.prevent="handleScrollToSection('services')" class="hover:text-white transition-colors">{{ $t('footer.services.it_consulting') }}</a></li>
            <li><a href="#services" @click.prevent="handleScrollToSection('services')" class="hover:text-white transition-colors">{{ $t('footer.services.custom_integrations') }}</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-normal mb-4">{{ $t('footer.company.title') }}</h4>
          <ul class="space-y-2">
            <li><a href="#services" @click.prevent="handleScrollToSection('services')" class="hover:text-white transition-colors">{{ $t('footer.company.services') }}</a></li>
            <li><a href="#ourWorks" @click.prevent="handleScrollToSection('ourWorks')" class="hover:text-white transition-colors">{{ $t('footer.company.ourWorks') }}</a></li>
            <li><a href="#contact" @click.prevent="handleScrollToSection('contact')" class="hover:text-white transition-colors">{{ $t('footer.company.contact') }}</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-normal mb-4">{{ $t('footer.contact.title') }}</h4>
          <div class="space-y-2">
            <!-- <p>+1234 567 89</p> -->
            <p>shyftid@gmail.com</p>
          </div>
          <div class="flex space-x-4 mt-4">
            <a href="https://www.instagram.com/shyft.id/" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition-opacity" :aria-label="$t('footer.social.instagram')">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons/icons/instagram.svg" alt="Instagram" width="24" height="24" loading="lazy" class="filter invert" />
            </a>
            <a href="https://www.linkedin.com/company/shyft-id" target="_blank" rel="noopener noreferrer" class="hover:opacity-80 transition-opacity" :aria-label="$t('footer.social.linkedin')">
              <img src="https://cdn.jsdelivr.net/npm/simple-icons/icons/linkedin.svg" alt="LinkedIn" width="24" height="24" loading="lazy" class="filter invert" />
            </a>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-400 mt-8 pt-8 text-center">
        <p>{{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template> 

<script setup>
  import logoWhite from '~/assets/images/logo-white.png'

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
</script>

<style scoped>
.footer {
  background: radial-gradient(ellipse at 30% 90%, #1A56EE 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, #1A56EE 0%, transparent 45%),
            linear-gradient(to bottom, #010319 0%, #010319 30%, #010319 100%);
  background-size: 100% 200%; /* ← Increase height here */
  background-position: center;
  background-repeat: no-repeat;
}
</style>