<script lang="ts">
  import { onMount } from 'svelte';
  import { hover, animate, inView } from 'motion';
  import CategoryChip from '$lib/components/CategoryChip.svelte';
  import LazyImage from '$lib/components/LazyImage.svelte';

  export let project;

  let cardElement: HTMLElement;

  onMount(() => {
    // Scroll-linked animation
    inView(cardElement, (element) => {
      animate(
        element,
        { 
          opacity: [0, 1], 
          translateY: ['50px', '0px']
        },
        {
          duration: 0.6,
          easing: 'ease-out'
        }
      );
    }, {
      margin: '-50px 0px',
    });

    // Hover effect that only affects scale
    hover(cardElement, (element) => {
      animate(
        element,
        { scale: 1.03 },
        { type: 'spring' }
      );
      return () =>
        animate(
          element,
          { scale: 1 },
          { type: 'spring' }
        );
    });
  });
</script>

<a bind:this={cardElement} href={`/projects/${project.slug}`} class="card">
  <img src={project.image} alt={project.title} class="card-image" />
  <div class="card-content">
    <h2 class="project-title">{project.title}</h2>
    <div class="chip-container">
      {#each project.categories as category}
        <CategoryChip label={category} />
      {/each}
    </div>
  </div>
</a>

<style>
  .card {
    display: flex;
    background: var(--card-bg);
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    padding: 3rem 3.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
    height: 22rem;
    align-items: center;
    flex-direction: row;
    transition: transform 0.1s ease;
    opacity: 0;
    transform: translateY(50px) scale(var(--hover-scale, 1));
    will-change: transform, opacity;
  }

  .card-image {
    height: 100%;
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
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
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

    .project-title {
      font-size: 2rem;
    }
  }
</style>