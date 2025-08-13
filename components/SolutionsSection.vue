<template>
  <section id="services" ref="solutionsSection" class="solutions-section bg-[#010319]">
    <div class="max-w-[1200px] mx-auto px-4">
      <div class="solutions-header">
        <div class="flex-shrink-0">
          <span ref="solutionsLabel" class="solutions-label">
            {{ typewriterText }}
          </span>
          <h2 class="solutions-title">
            {{ $t('solutions.title') }}
          </h2>
        </div>
        <p class="solutions-desc">
          {{ $t('solutions.description') }}
        </p>
      </div>
      <div class="solutions-grid">
        <div class="solution-card main-card">
          <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80" alt="Workflow Automation" class="solution-img" />
          <div class="solution-content">
            <h3>{{ $t('solutions.cards.workflow.title') }}</h3>
            <p>{{ $t('solutions.cards.workflow.description') }}</p>
          </div>
        </div>
        <div class="solution-card">
          <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" alt="AI Chatbots & Virtual Assistants" class="solution-img" />
          <div class="solution-content">
            <h3>{{ $t('solutions.cards.chatbots.title') }}</h3>
            <p>{{ $t('solutions.cards.chatbots.description') }}</p>
          </div>
        </div>
        <div class="solution-card">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Personalized AI Marketing" class="solution-img" />
          <div class="solution-content">
            <h3>{{ $t('solutions.cards.custom_software.title') }}</h3>
            <p>{{ $t('solutions.cards.custom_software.description') }}</p>
          </div>
        </div>
        <div class="solution-card">
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" alt="CRM Automation" class="solution-img" />
          <div class="solution-content">
            <h3>{{ $t('solutions.cards.it_consulting.title') }}</h3>
            <p>{{ $t('solutions.cards.it_consulting.description') }}</p>
          </div>
        </div>
        <div class="solution-card">
          <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" alt="Custom AI Integrations" class="solution-img" />
          <div class="solution-content">
            <h3>{{ $t('solutions.cards.integrations.title') }}</h3>
            <p>{{ $t('solutions.cards.integrations.description') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const fullText = '[ OUR SOLUTIONS ]';
const typewriterText = ref('');
const showCursor = ref(true);
const solutionsSection = ref(null)
const solutionsLabel = ref(null)
const hasAnimated = ref(false)

const startTypewriter = () => {
  if (hasAnimated.value) return;
  
  hasAnimated.value = true;
  let i = 0;
  
  function type() {
    if (i <= fullText.length) {
      typewriterText.value = fullText.slice(0, i);
      i++;
      setTimeout(type, 60);
    }
  }
  type();
};

onMounted(() => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger)

    // Typewriter effect trigger
    ScrollTrigger.create({
      trigger: solutionsLabel.value,
      start: 'top 90%',
      onEnter: startTypewriter,
      once: true // This ensures it only triggers once
    });

    // Existing animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: solutionsSection.value,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.from(solutionsSection.value.querySelector('.solutions-header'), {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
    }).from(
      solutionsSection.value.querySelectorAll('.solution-card'),
      {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
      },
      '-=0.5'
    )
  }
});
</script>

<style scoped>
.solutions-section {
  padding: 64px 0;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.solutions-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.solutions-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 48px;
  flex-wrap: nowrap;
  gap: 30px;
}
.solutions-label {
  font-size: 14px;
  letter-spacing: 2px;
  color: #b0b3c6;
  margin-bottom: 12px;
  display: inline-block;
}
.solutions-title {
  font-size: 48px;
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 0;
}
.ai-powered {
  /* color: #a18aff; */
  background: linear-gradient(90deg, #a18fff 0%, #6ec3f4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.solutions-desc {
  max-width: 340px;
  color: #b0b3c6;
  font-size: 18px;
  margin-left: auto;
  margin-top: 8px;
}
.solutions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 220px);
  gap: 16px;
}
.solution-card {
  background: linear-gradient(180deg, rgb(25, 28, 48), rgb(18, 22, 53) 0%, rgb(11, 14, 35), rgb(11, 14, 35) 100%);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  padding: 32px 28px 28px 28px;
  /* transition: box-shadow 0.3s, transform 0.3s; */
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 0px 12px 0 #a18aff33;
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
}
.solution-card:before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  pointer-events: none;
  z-index: 2;
}
.solution-card:hover {
  transform: translateY(-2px);
}
.solution-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.13;
  z-index: 0;
}
.solution-content {
  position: relative;
  z-index: 3;
}
.solution-content h3 {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
  color: #fff;
  text-shadow: 0 2px 12px #a18aff33;
}
.solution-content p {
  color: #b0b3c6;
  font-size: 16px;
}
.main-card {
  grid-column: 1 / span 2;
  grid-row: 1 / span 1;
  min-height: 220px;
  background: linear-gradient(180deg, rgb(25, 28, 48), rgb(18, 22, 53) 0%, rgb(11, 14, 35), rgb(11, 14, 35) 100%);
  border-radius: 16px;
}
@media (max-width: 1024px) {
  .solutions-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 220px);
  }
  .main-card {
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
  }
}
@media (max-width: 768px) {
  .solutions-header {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }
  .solutions-title {
    font-size: 32px;
  }
  .solutions-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 220px);
    gap: 20px;
  }
  .main-card {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }
}
</style>

