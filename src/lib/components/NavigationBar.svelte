<script lang="ts">
  import { onMount } from 'svelte';

  let isMenuOpen = false;
  let currentPath = '';

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      isMenuOpen = !isMenuOpen;
    }
  };

  const navigationItems = [
    { text: 'Home', href: '/' },
    { text: 'Projects', href: '/projects' },
    { text: 'About', href: '/about' },
    { text: 'Contact', href: '/contact' }
  ];

  onMount(() => {
    currentPath = window.location.pathname;


    if (currentPath === '' || currentPath === '/' || currentPath === '/index.html') {
      currentPath = '/';
    }

    const navItems = document.querySelectorAll('nav a');
    navItems.forEach(item => {
      item.setAttribute('tabindex', '0');
    });
  });
</script>

<nav aria-label="Main navigation" class="navbar">
  <a href="/" class="logo-link">
    <div class="logo-container" role="banner">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/476bc41acd8d8f8d062f7ec5b2068b977f6892e48270f5e3497e7eaec5a10829?placeholderIfAbsent=true&apiKey=60a4f8d4994c49adb19fe749d66675dc"
        alt="Evan Schatz Logo"
        class="logo"
      />
      <div class="logo-text">Evan Schatz</div>
    </div>
  </a>

  <div class="nav-links" role="menubar">
    {#each navigationItems as item}
      <a
        href={item.href}
        class="nav-item {currentPath === item.href ? 'active' : ''}"
        role="menuitem"
        on:keydown={handleKeyPress}
      >
        {item.text}
      </a>
    {/each}
  </div>

  <button type="button" aria-label="Toggle theme" class="theme-toggle" on:keydown={handleKeyPress}>
    <img loading="lazy" src="../images/icons/moon-bold.svg" alt="Toggle Theme" class="theme-icon" />
  </button>
</nav>

<style>
  /* Nav Bar */
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25em;
    padding-right: 5em;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    width: 100%;
    background: var(--card-bg);
  }

  /* Logo Section */
  .logo-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo {
    width: 33px;
    height: auto;
    object-fit: contain;
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 600;
  }

  /* Navigation Links */

  .nav-item,
  .logo-text {
    font-family: var(--font-heading);
  }
  .nav-links {
    display: flex;
    gap: 40px;

  }
  .nav-item.active {
    color: var(--primary-accent);
  }

  .nav-item {
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 1000;
    color: var(--hover-accent);
    transition: color 0.3s ease;
  }

  .nav-item:hover,
  .nav-item:focus {
    color: var(--primary-accent);
  }

  /* Theme Toggle Button */
  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 5px;
  }

  .theme-icon {
    width: 36px;
    height: 36px;
    object-fit: contain;
  }

  /* Querys */
  @media (max-width: 1024px) {
    .nav-links {
      gap: 20px;
    }
  }

  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      gap: 15px;
      padding: 15px;
    }

    .nav-links {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  }
</style>