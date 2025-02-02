<script lang="ts">
  import { onMount } from 'svelte';

  let isMenuOpen = false;
  let currentPath = '';
  let isDarkMode = false;

  const toggleTheme = () => {
    isDarkMode = !isDarkMode;
    console.log('Theme toggled:', isDarkMode);  // Debugging log
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  };

  $: iconSrc = isDarkMode 
    ? '../images/icons/sun-bold-darkmode.svg' 
    : '../images/icons/moon-bold.svg';

  $: menuIconSrc = isDarkMode 
    ? '../images/icons/list-bold-darkmode.svg' 
    : '../images/icons/list-bold.svg';

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

  let desktopButton: HTMLButtonElement; // Reference to desktop theme button

  onMount(() => {
    console.log('Desktop theme button mounted:', desktopButton);  // Debugging log
    
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      isDarkMode = true;
      document.documentElement.classList.add('dark-mode');
    }

    currentPath = window.location.pathname;
    if (currentPath === '' || currentPath === '/' || currentPath === '/index.html') {
      currentPath = '/';
    }
  });
</script>

<nav aria-label="Main navigation" class="navbar {isMenuOpen ? 'menu-open' : ''}">
  <!-- Logo -->
  <a href="/" class="logo-link">
    <div class="logo-container" role="banner">
      <img src="/Logo.svg" alt="Evan Schatz Logo" class="logo" />
      <div class="logo-text">Evan Schatz</div>
    </div>
  </a>

  <!-- Navigation Links -->
  <div class="nav-links stroke {isMenuOpen ? 'open' : ''}" role="menubar">
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

  <!-- Hamburger Icon -->
  <button class="menu-toggle" aria-label="Toggle menu" on:click={() => isMenuOpen = !isMenuOpen}>
    <img src={menuIconSrc} alt="Menu Icon" class="menu-icon" />
  </button>

  <!-- Mobile Menu -->
  <div class="nav-links-mobile {isMenuOpen ? 'open' : ''}" role="menubar">
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

    <button
      type="button"
      aria-label="Toggle theme"
      class="theme-toggle"
      on:keydown={handleKeyPress}
      on:click={toggleTheme}
      bind:this={desktopButton}
    >
    <!-- Come back to later-->
    <!-- on:click={toggleTheme} is not appearing in browser sources??? Causing desktop theme toggle button to not work -->
      <img
        loading="lazy"
        src={iconSrc}
        alt="Toggle Theme"
        class="theme-icon"
      />
    </button>
    <button
      type="button"
      aria-label="Toggle theme"
      class="theme-toggle-mobile"
      on:keydown={handleKeyPress}
      on:click={toggleTheme}
    >
      <img
        loading="lazy"
        src={iconSrc}
        alt="Toggle Theme"
        class="theme-icon"
      />
    </button>
  </div>
</nav>

<style>
/* Nav Bar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25em 5em 1.25em 1.25em;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  width: 100%;
  background: var(--card-bg);
  position: relative;
  z-index: 10;
  transition: border-radius 0.3s ease;
}

.navbar.menu-open {
  border-bottom-left-radius: 0px;
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
  font-family: var(--font-heading);
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 40px;
  transition: max-height 0.3s ease-in-out;
}

.nav-item {
  font-family: var(--font-heading);
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--hover-accent);
  position: relative;
  transition: color 0.3s ease;
}

/* Underline Stroke Effect */
.nav-item:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 0%;
  height: 2px;
  background: var(--primary-accent);
  transition: width 0.4s ease;
}

.nav-item:hover:after {
  width: 100%;
}

.nav-item.active {
  color: var(--primary-accent);
}

.nav-item:hover, .nav-item:focus {
  color: var(--primary-accent);
}

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

/* Hamburger Menu */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

/* Mobile Menu */
.nav-links-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 70px;
  left: 0;
  background: var(--card-bg);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
  z-index: 9;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 0;
}

.nav-links-mobile.open {
  max-height: 400px;
  padding: 1rem 0;
}

.nav-links-mobile .nav-item {
  margin: 0.5rem 0;
}

/* Theme Toggle in Mobile Menu */
.theme-toggle-mobile {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}

.theme-toggle-mobile .theme-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-links {
    display: none; /* Hide desktop links */
  }

  .menu-toggle {
    display: block; /* Show hamburger icon */
  }

  .theme-toggle {
    display: none;
  }

  .navbar {
    padding-right: 1.25em;
  }
}
</style>