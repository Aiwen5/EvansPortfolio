<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import ScrollTrigger from 'gsap/ScrollTrigger';
  import CategoryChip from '$lib/components/CategoryChip.svelte';
  import LazyImage from '$lib/components/LazyImage.svelte';

  export let projects: {
    title: string;
    summary: string;
    categories: string[];
    image: string;
    slug: string;
    caseStudy: boolean;
    folderColor: string;
  }[] = [];

  let containerRef: HTMLDivElement;

  onMount(() => {
    if (import.meta.env.SSR) return;
    gsap.registerPlugin(ScrollTrigger);
    const cards = containerRef.querySelectorAll('.card');

    cards.forEach((card, i) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 5%',
          end: '+=100%',
          scrub: true,
          pin: i !== cards.length - 1,
          pinSpacing: false
        },
        yPercent: i !== cards.length - 1 ? -10 * (cards.length - i - 1) : 0,
        ease: 'none'
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  });
</script>

<div bind:this={containerRef} class="stack-container">
  {#each projects as project}
    <a
      href={project.caseStudy ? `/case-studies/${project.slug}` : `/projects/${project.slug}`}
      class="card"
      style="background: {project.folderColor};"
    >
    <div class="card-image">
      <LazyImage src={project.image} alt={project.title} aspectRatio=16/11 />
    </div>
      <div class="card-content">
        <h2 class="project-title">{project.title}</h2>
        <div class="chip-container">
          {#each project.categories as category}
            <CategoryChip label={category} />
          {/each}
        </div>
      </div>
    </a>
  {/each}
</div>

<style>
  .stack-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .card {
    display: flex;
    background: var(--card-bg);
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    padding: 3rem 3.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
    height: 30rem;
    align-items: center;
    flex-direction: row;
    transition: transform 0.1s ease;
    opacity: 1;
    transform: translateY(0);
    will-change: transform, opacity;
  }

  .card-image {
    margin-right: 2.5rem;
    object-fit: cover;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    width: 40%;
  }

  .card-content {
    flex: 1;
    width: 60%;
  }

  .project-title {
    font-size: 3rem;
    font-weight: 600;
  }

  .chip-container {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  @media (max-width: 1024px) {
    .card {
      flex-direction: column;
      height: auto;
      padding: 2rem;
    }

    .card-image {
      width: 100%;
      height: auto;
      margin-right: 0;
      margin-bottom: 1.5rem;
    }

    .card-content {
      width: 100%;
    }

    .chip-container {
      gap: 0.5rem;
    }

    .project-title {
      font-size: 2rem;
    }
  }

</style>