<script lang="ts">
  import { onMount } from 'svelte';

  let isMenuOpen = false;
  
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
    const navItems = document.querySelectorAll('nav a');
    navItems.forEach(item => {
      item.setAttribute('tabindex', '0');
    });
  });
</script>

<nav 
  aria-label="Main navigation"
  class="flex flex-wrap gap-5 justify-between items-center py-5 pr-20 pl-4 w-full rounded-none bg-teal-950 bg-opacity-10 max-md:pr-5 max-md:max-w-full"
>
  <div 
    class="flex gap-4 self-stretch text-2xl"
    role="banner"
  >
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/476bc41acd8d8f8d062f7ec5b2068b977f6892e48270f5e3497e7eaec5a10829?placeholderIfAbsent=true&apiKey=60a4f8d4994c49adb19fe749d66675dc"
      alt=""
      class="object-contain shrink-0 aspect-[0.81] w-[33px]"
    />
    <div class="my-auto basis-auto">Evan Schatz</div>
  </div>

  <div 
    class="flex gap-8 self-stretch my-auto text-xl whitespace-nowrap"
    role="menubar"
  >
    {#each navigationItems as item}
      <a
        href={item.href}
        class="grow"
        role="menuitem"
        on:keydown={handleKeyPress}
      >
        {item.text}
      </a>
    {/each}
  </div>

  <button
    type="button"
    aria-label="Toggle theme"
    class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
    on:keydown={handleKeyPress}
  >
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/6474fb1dc463461d82ee0b8b3f466c9e3b91144b1b9e42982ed02dfeffec2bcc?placeholderIfAbsent=true&apiKey=60a4f8d4994c49adb19fe749d66675dc"
      alt=""
      class="object-contain shrink-0 self-stretch my-auto w-9 aspect-square"
    />
  </button>
</nav>