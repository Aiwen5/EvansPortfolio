<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';

  let isMenuOpen = false;
  let currentPath = '';
  let isDarkMode = false;
  let isAnimating = false;

  const navigationItems = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Projects' },
    { href: '/contact', text: 'Contact' }
  ];

  let menuContainer: HTMLElement | null = null;
  let menuToggleButton: HTMLElement | null = null;

	const toggleTheme = () => {
		isDarkMode = !isDarkMode;
		isAnimating = true;
		
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark-mode', isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

		setTimeout(() => {
			isAnimating = false;
		}, 600);
	};

	$: iconSrc = isDarkMode 
		? '../images/icons/sun-bold-darkmode.svg' 
		: '../images/icons/moon-bold.svg';

	$: menuIconSrc = isDarkMode 
		? '../images/icons/list-bold-darkmode.svg' 
		: '../images/icons/list-bold.svg';

	$: logoIconSrc = isDarkMode 
		? '../LogoDarkMode.svg' 
		: '../Logo.svg';

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			isMenuOpen = !isMenuOpen;
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			isMenuOpen &&
      !(menuContainer && menuContainer.contains(event.target as Node)) &&
      !(menuToggleButton && menuToggleButton.contains(event.target as Node))
		) {
			isMenuOpen = false;
		}
	};

	onMount(() => {
    if (typeof document !== 'undefined') {
      menuContainer = document.querySelector('.nav-links-mobile');
      menuToggleButton = document.querySelector('.menu-toggle');
      document.addEventListener('click', handleClickOutside);

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
    }
	});

	afterNavigate(() => {
		if (typeof window !== 'undefined') {
			currentPath = window.location.pathname;
		}
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<nav aria-label="Main navigation" class="navbar {isMenuOpen ? 'menu-open' : ''}">
  <!-- Logo -->
  <a href="/" class="logo-link">
    <div class="logo-container" role="banner">
      <img src={logoIconSrc} alt="Evan Schatz Logo" class="logo" />
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

  <button type="button" aria-label="Toggle theme" class="theme-toggle" on:click={toggleTheme} on:keydown={handleKeyPress}>
    <img
      loading="lazy"
      src={iconSrc}
      alt="Toggle Theme"
      class="theme-icon {isAnimating ? 'animating' : ''}"
    />
  </button>

  <!-- Hamburger Icon -->
  <button 
  class="menu-toggle" 
  aria-label="Toggle menu" 
  on:click={() => isMenuOpen = !isMenuOpen} 
  bind:this={menuToggleButton}
  >
  <img src={menuIconSrc} alt="Menu Icon" class="menu-icon" />
  </button>

  <!-- Mobile Menu -->
  <div 
  class="nav-links-mobile {isMenuOpen ? 'open' : ''}" 
  role="menubar" 
  bind:this={menuContainer}
  >
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
    class="theme-toggle-mobile"
    on:keydown={handleKeyPress}
    on:click={toggleTheme}
  >
    <img
      loading="lazy"
      src={iconSrc}
      alt="Toggle Theme"
      class="theme-icon {isAnimating ? 'animating' : ''}"
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

.logo-text {
  font-size: 1.5rem;
  font-weight: 600;
  font-family: var(--font-heading);
  position: relative;
  top: 2.3px;
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

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 40px;
  transition: max-height 0.2s ease-in-out;
}

.nav-item {
  font-family: var(--font-heading);
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--hover-accent);
  position: relative;
  transition: color 0.2s ease;
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
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.theme-icon.animating {
  animation: tiltFade 0.4s cubic-bezier(0.40, 0, 0.60, 1);
}

@keyframes tiltFade {
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  40% {
    transform: rotate(-20deg);
    opacity: 0.4;
  }
  60% {
    transform: rotate(20deg);
    opacity: 0.4;
  }
  100% {
    transform: rotate(0deg);
    opacity: 1;
  }
}
/* Hamburger Menu */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-icon {
  width: 32px;
  height: 32px;
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

@media (max-width: 1024px) {
  .nav-item {
    font-size: 1rem;
  }

  .logo-text {
    font-size: 1.15rem;
  }

  .logo {
    width: 28px;
  }

  .navbar {
    padding: 1.2em 3em 1.2em 1.25em;
  }

  .nav-links {
    gap: 30px;
  }

  .theme-icon {
    width: 32px;
    height: 32px;
  }

  .theme-toggle-mobile .theme-icon {
    width: 32px;
    height: 32px;
  }

}

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