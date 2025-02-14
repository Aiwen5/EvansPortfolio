<script lang="ts">
  export let link: string;
  export let text: string;
  let isDarkMode = false;

  import { onMount } from 'svelte';

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

  $: iconSrc = isDarkMode 
    ? '/images/icons/arrow-square-out-bold-darkmode.svg' 
    : '/images/icons/arrow-square-out-bold.svg';

  $: hoverIconClass = isDarkMode ? 'hover-dark' : 'hover-light';
</script>

<a href={link} target="_blank" rel="noopener noreferrer" class="external-link-button">
  <div class="button-content">
    <span>{text}</span>
    <img src={iconSrc} alt="External Link Icon" class="link-icon {hoverIconClass}" />
  </div>
</a>

<style>
  .external-link-button {
    min-width: 170px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-bottom-left-radius: 12px;
    border-top-right-radius: 12px;
    border: 1px solid var(--primary-accent);
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: color 0.33s ease;
    z-index: 1;
  }

  .button-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 12px;
    padding: 0 12px;
    position: relative;
    z-index: 2;
    transition: color 0.33s ease;
  }

  .button-content span {
    font-size: 20px;
    font-family: var(--font-body);
    font-weight: 400;
    text-wrap: nowrap;
    color: var(--primary-accent);
    transition: color 0.33s ease;
  }

  .link-icon {
    width: 24px;
    height: 24px;
    transition: filter 0.33s ease, color 0.33s ease;
  }

  .external-link-button::before,
  .external-link-button::after {
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

  .external-link-button::before {
    background: var(--secondary-accent);
  }

  .external-link-button::after {
    background: var(--primary-accent);
    transition: width 0.53s cubic-bezier(0.77, 0, 0.175, 1) 0.17s;
  }

  .external-link-button:hover::before {
    width: 130%;
  }

  .external-link-button:hover::after {
    width: 130%;
  }

  .external-link-button:hover span {
    color: var(--background);
  }

  .external-link-button:hover .hover-light {
    color: var(--background);
    filter: brightness(0) invert(1);
  }

  .external-link-button:hover .hover-dark {
    color: var(--background);
    filter: brightness(1) invert(1);
  }
</style>