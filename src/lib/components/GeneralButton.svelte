<script lang="ts">
  import { onMount } from 'svelte';

  export let text: string = 'Click Me';
  export let width: string = '170px';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let onClick: () => void = () => {};
  export let link: string | null = null;

  let isDarkMode = false;

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      isDarkMode = true;
    }

    const observer = new MutationObserver(() => {
      isDarkMode = document.documentElement.classList.contains('dark-mode');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  });
</script>

{#if link}
  <!-- When link is provided, render as an anchor tag -->
  <a href={link} target="_blank" rel="noopener noreferrer" class="general-button" style="width: {width};">
    <span>{text}</span>
  </a>
{:else}
  <!-- Default button behavior -->
  <button class="general-button" style="width: {width};" type={type} on:click={onClick}>
    <span>{text}</span>
  </button>
{/if}

<style>
  .general-button {
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 12px;
    border-top-right-radius: 12px;
    border: 1px solid var(--primary-accent);
    background: transparent;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: color 0.33s ease, background 0.33s ease;
    z-index: 1;
    text-decoration: none;
  }

  .general-button span {
    font-size: 20px;
    font-family: 'PT Sans', sans-serif;
    font-weight: 400;
    color: var(--primary-accent);
    transition: color 0.33s ease;
  }

  .general-button::before,
  .general-button::after {
    content: '';
    position: absolute;
    height: 110%;
    width: 0%;
    top: -5%;
    left: -5%;
    transform: skewX(-12deg);
    z-index: -1;
    transition: width 0.33s cubic-bezier(0.77, 0, 0.175, 1);
  }

  .general-button::before {
    background: var(--secondary-accent);
  }

  .general-button::after {
    background: var(--primary-accent);
    transition: width 0.53s cubic-bezier(0.77, 0, 0.175, 1) 0.17s;
  }

  .general-button:hover::before {
    width: 130%;
  }

  .general-button:hover::after {
    width: 130%;
  }

  .general-button:hover span {
    color: var(--background);
  }
</style>