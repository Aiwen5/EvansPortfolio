<script lang="ts">
  import { onMount } from 'svelte';

  let isVisible = false;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const checkScroll = () => {
    isVisible = window.scrollY > 300;
  };

  onMount(() => {
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  });
</script>

<button 
  class="scroll-button {isVisible ? 'visible' : ''}" 
  on:click={scrollToTop} 
  aria-label="Scroll to top">
  ↑
</button>

<style>
  .scroll-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-bottom-left-radius: 12px;
    border-top-right-radius: 12px;
    border: 1px solid var(--primary-accent);
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: var(--primary-accent);
    overflow: hidden;

    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s ease, transform 0.4s ease;
    z-index: 1000;
  }

  /* Make the button visible when scrolling down */
  .scroll-button.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Hover Effects */
  .scroll-button::before,
  .scroll-button::after {
    content: '';
    position: absolute;
    height: 120%; 
    width: 0%;
    top: -10%;
    left: -10%;
    transform: skewX(-10deg);
    z-index: -1;
    transition: width 0.33s cubic-bezier(0.77, 0, 0.175, 1);
  }

  .scroll-button::before {
    background: var(--secondary-accent);
  }

  .scroll-button::after {
    background: var(--primary-accent);
    transition: width 0.53s cubic-bezier(0.77, 0, 0.175, 1) 0.17s;
  }

  .scroll-button:hover::before,
  .scroll-button:hover::after {
    width: 150%;
  }

  .scroll-button:hover {
    color: var(--background);
  }
</style>