<script lang="ts">
  import { onMount } from 'svelte';

  let isDarkMode = false;
  const email = 'schatzdesigns7@gmail.com';

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

  const getIconSrc = (iconName: string) => 
    isDarkMode 
      ? `/images/icons/${iconName}-bold-darkmode.svg` 
      : `/images/icons/${iconName}-bold.svg`;

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        alert('Email copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy email:', err);
      });
  };
</script>

<footer class="footer">
  <div class="footer-content">
    <div class="logo-container">
      <img src="/Logo.svg" alt="Evan Schatz Logo" class="logo" />
      <span class="name">Evan Schatz</span>
    </div>

    <div class="year">2025 © Evan Schatz</div>

    <div class="social-icons">
      <a href="https://www.linkedin.com/in/evan-schatz/" target="_blank" rel="noopener noreferrer">
        <img src={getIconSrc('linkedin-logo')} alt="LinkedIn" />
      </a>
      <a href="https://github.com/Aiwen5" target="_blank" rel="noopener noreferrer">
        <img src={getIconSrc('github-logo')} alt="GitHub" />
      </a>
      <a href="https://www.instagram.com/schatzdesigns7/" target="_blank" rel="noopener noreferrer">
        <img src={getIconSrc('instagram-logo')} alt="Instagram" />
      </a>
      <button class="email-button" on:click={copyEmailToClipboard} aria-label="Copy email to clipboard">
        <img src={getIconSrc('envelope')} alt="Email" />
      </button>
    </div>
  </div>
</footer>

<style>
  .footer {
    width: 100%;
    padding: 1rem 2rem;
    position: relative;
    justify-content: center;
    align-items: center;
    grid-column: span 12;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo {
    width: 33px;
    height: auto;
  }

  .name {
    font-size: 1.5rem;
    font-family: var(--font-heading);
    font-weight: 600;
    color: var(--primary-accent);
  }

  .year {
    font-size: 1.2rem;
    font-family: var(--font-heading);
    font-weight: 600;
    color: var(--primary-accent);
  }

  .social-icons {
    display: flex;
    gap: 1.5rem;
  }

  .social-icons a, .email-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .social-icons img {
    width: 32px;
    height: 32px;
    transition: transform 0.3s ease;
  }

  .social-icons img:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
    }

    .social-icons {
      gap: 1rem;
    }
  }
</style>