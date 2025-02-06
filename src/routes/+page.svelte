<script lang="ts">
  import { onMount } from 'svelte';
  import projects from '$lib/data/projects.json' assert { type: 'json' };
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import LazyImage from '$lib/components/LazyImage.svelte';
  import LazyVideo from '$lib/components/LazyVideo.svelte';

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

  $: videoSrc = isDarkMode ? '/video/role-halo-darkmode.mp4' : '/video/role-halo.mp4';
</script>

<div class="projects-grid">
  <div class="hero-section">
    <div class="headings">
      <h1 class="page-title">I'm Evan</h1>
      <p class="page-description">A Digital Problem Solver</p>
    </div>
    <div class="hero">
      <LazyVideo src={videoSrc} alt="Evan Schatz Peeking" width="60%" aspectRatio="5 / 1" />
      <LazyImage src="/images/extras/EvanPeeking.png" alt="Evan Schatz Peeking" aspectRatio="256 / 175" />
    </div>
  </div>
  <h2 class="projects-subtitle">Check out my latest projects</h2>
  {#each projects as project}
    <ProjectCard {project} />
  {/each}
</div>

<style lang="css">
  .projects-grid {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    grid-column: span 12;
  }

  .hero-section {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    align-items: center;
    width: 100%;
  }

  .headings {
    display: flex;
    flex-direction: column;
    text-align: right;
  }
  
  .projects-subtitle {
    font-size: 3.5rem;
    text-align: center;
  }

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .page-title {
    line-height: 1;
  }

  .page-description {
    color: var(--primary-accent-dark);
  }

  @media (max-width: 1442px) {
    .page-title {
      font-size: 4rem;
    }

    .page-description {
      font-size: 1.15rem;
    }

    .projects-subtitle {
      font-size: 3rem;
    }
  }
  @media (max-width: 768px) {
    .projects-grid {
      gap: 1.5rem;
    }

    .hero-section {
      grid-template-columns: 1fr;
    }

    .hero {
      order: 1;
    }

    .headings {
      text-align: center;
    }

    .projects-subtitle {
      font-size: 2.5rem;
    }
  }
</style>