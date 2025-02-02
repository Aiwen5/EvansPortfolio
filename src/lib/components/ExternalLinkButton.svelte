<script lang="ts">
  import { onMount } from 'svelte';

  export let link: string;
  let isDarkMode = false;

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      isDarkMode = true;
    }

    // Listen for theme toggle changes
    const observer = new MutationObserver(() => {
      isDarkMode = document.documentElement.classList.contains('dark-mode');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  });

  $: iconSrc = isDarkMode 
    ? '/images/icons/arrow-square-out-bold-darkmode.svg' 
    : '/images/icons/arrow-square-out-bold.svg';

  $: textColor = isDarkMode ? 'var(--text-dark)' : 'var(--text-light)';
  $: borderColor = isDarkMode ? 'var(--border-dark)' : 'var(--border-light)';
</script>

<a href={link} target="_blank" rel="noopener noreferrer" class="external-link-button">
  <div class="button-content">
    <span>Check it out</span>
    <img src={iconSrc} alt="External Link Icon" class="link-icon" />
  </div>
</a>

<style>
  .external-link-button {
    width: 170px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border: 1px solid var(--primary-accent);
    text-decoration: none;
    position: relative;
    transition: all 0.3s ease;
  }

  .button-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 12px;
  }

  .button-content span {
    font-size: 20px;
    font-family: 'PT Sans', sans-serif;
    font-weight: 400;
    color: var(--primary-accent);
  }

  .link-icon {
    width: 24px;
    height: 24px;
  }

  .external-link-button:hover {
    background-color: var(--primary-accent);
  }

  .external-link-button:hover span,
  .external-link-button:hover .link-icon {
    color: white;
    filter: brightness(0) invert(1);
  }
</style>