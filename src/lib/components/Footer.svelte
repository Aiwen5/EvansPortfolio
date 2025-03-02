<script lang="ts">
  import { onMount } from 'svelte';

  let isDarkMode = false;
  const email = 'schatzdesigns7@gmail.com';
  let currentTime = new Date().toLocaleTimeString("en-US");

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      isDarkMode = true;
    }

    const interval = setInterval(() => {
      currentTime = new Date().toLocaleTimeString("en-US");
    }, 1000);

    const observer = new MutationObserver(() => {
      isDarkMode = document.documentElement.classList.contains('dark-mode');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      clearInterval(interval);
    }
  });

  $: logoIconSrc = isDarkMode 
    ? '../LogoDarkMode.svg' 
    : '../Logo.svg';

  $: linkedinIcon = isDarkMode 
    ? '/images/icons/linkedin-logo-bold-darkmode.svg' 
    : '/images/icons/linkedin-logo-bold.svg';

  $: githubIcon = isDarkMode 
    ? '/images/icons/github-logo-bold-darkmode.svg' 
    : '/images/icons/github-logo-bold.svg';

  $: instagramIcon = isDarkMode 
    ? '/images/icons/instagram-logo-bold-darkmode.svg' 
    : '/images/icons/instagram-logo-bold.svg';

  $: envelopeIcon = isDarkMode 
    ? '/images/icons/envelope-bold-darkmode.svg' 
    : '/images/icons/envelope-bold.svg';

  // const copyEmailToClipboard = () => {
  //   navigator.clipboard.writeText(email)
  //     .then(() => {
  //       alert('Email copied to clipboard!');
  //     })
  //     .catch(err => {
  //       console.error('Failed to copy email:', err);
  //     });
  // };
</script>

<footer class="footer">
  <div class="footer-content">
    <a href="/" class="logo-link">
      <div class="logo-container">
        <img src={logoIconSrc} alt="Evan Schatz Logo" class="logo" />
        <span class="logo-text">Evan Schatz</span>
      </div>
    </a>

    <div class="year">2025 © Evan Schatz | {currentTime}</div>

    <div class="social-icons">
      <a href="https://www.linkedin.com/in/evan-schatz/" target="_blank" rel="noopener noreferrer">
        <img src={linkedinIcon} alt="LinkedIn" />
      </a>
      <a href="https://github.com/Aiwen5" target="_blank" rel="noopener noreferrer">
        <img src={githubIcon} alt="GitHub" />
      </a>
      <a href="https://www.instagram.com/schatzdesigns7/" target="_blank" rel="noopener noreferrer">
        <img src={instagramIcon} alt="Instagram" />
      </a>
      <a href={`mailto:${email}?subject=Hello%20Evan&body=I%20wanted%20to%20reach%20out%20regarding...`} class="email-button" aria-label="Send email">
        <img src={envelopeIcon} alt="Email" />
      </a>
      <!-- <button class="email-button" on:click={copyEmailToClipboard} aria-label="Copy email to clipboard">
        <img src={envelopeIcon} alt="Email" />
      </button> -->
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
    margin-bottom: 1rem;
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

  /* Logo Hover Effect with Smooth Tilt Bounce */
  .logo-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    transition: transform 0.4s ease-out;
  }

  .logo {
    width: 33px;
    height: auto;
    object-fit: contain;
    transition: transform 0.4s ease-out;
  }

  /* Hover Effect - Tilting Bounce */
  .logo-link:hover .logo {
    animation: tiltBounce 0.5s ease-in-out;
  }

  @keyframes tiltBounce {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-10deg);
    }
    50% {
      transform: rotate(10deg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  .logo-text {
    font-size: 1.5rem;
    font-family: var(--font-heading);
    font-weight: 600;
    color: var(--primary-accent);
    position: relative;
    top: 2.3px;
  }

  .year {
    font-size: 1.2rem;
    font-family: var(--font-heading);
    font-weight: 600;
    color: var(--primary-accent);
  }

  .social-icons {
    display: flex;
    gap: 2.5rem;
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
    will-change: transform;
  }

  .social-icons img:hover {
    transform: scale(1.2);
  }

  @media (max-width: 1024px) {
    .logo-text {
      font-size: 1.15rem;
    }

    .year {
      font-size: 1rem;
    }

    .logo {
      width: 28px;
    }

    .social-icons img {
      width: 32px;
      height: 32px;
    }

    .social-icons {
      gap: 2rem;
    }
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      text-align: center;
      gap: 2rem;
    }

    .social-icons {
      gap: 1.75rem;
    }
  }
</style>