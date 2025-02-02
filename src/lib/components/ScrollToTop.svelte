<script lang="ts">
  import { onMount } from 'svelte';
  let isVisible = false;

  const handleScroll = () => {
    isVisible = window.scrollY > 200;
  };

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const scrollToTop = () => {
    console.log("Button clicked");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
</script>

<button on:click={scrollToTop} class:visible={isVisible} class="scroll-to-top-button">
  ↑
</button>

<style>
  .scroll-to-top-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-accent, #10312B);
    color: var(--background);
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
    z-index: 5000;
  }

  .scroll-to-top-button.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .scroll-to-top-button:hover {
    background-color: var(--secondary-accent, #F4A261);
  }
</style>