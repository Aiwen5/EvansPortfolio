<script lang="ts">
  import CategoryChip from '$lib/components/CategoryChip.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import ExternalLinkButton from '$lib/components/ExternalLinkButton.svelte';
  import LazyImage from '$lib/components/LazyImage.svelte';

  export let data;
  const { project, nextProject } = data;
</script>

{#if project}
  <div class="project-container">
    <h1 class="project-title">{project.title}</h1>
    <div class="categories">
      {#each project.categories as category}
        <CategoryChip label={category} />
      {/each}
    </div>
    <div class="image-container">
      <LazyImage src={project.image} alt={project.title} />
    </div>

    <div class="details-grid">
      <div class="overview">
        <h2>Overview</h2>
        <p>{project.overview}</p>
      </div>
      <div class="year">
        <h2>Year</h2>
        <p>{project.year}</p>
      </div>
    </div>

    <div class="tools">
      <div class="tools-header">
        <h2>Tools</h2>
        {#if project.externalLink}
          <div class="external-link-desktop">
            <ExternalLinkButton link={project.externalLink} />
          </div>
        {/if}
      </div>

      <div class="tool-chips">
        {#each project.tools as tool}
          <CategoryChip label={tool} />
        {/each}
      </div>
    </div>

    {#if project.externalLink}
      <div class="external-link-mobile">
        <ExternalLinkButton link={project.externalLink} />
      </div>
    {/if}

    <div class="additional-images">
      {#if project.images}
        <div class="dieline-images">
          {#each project.images.filter(image => image.type === 'normal') as image}
            <img src={image.src} alt={`${project.title} Image`} />
          {/each}
        </div>
        
        <div class="can-images">
          {#each project.images.filter(image => image.type === 'can') as image}
            <img src={image.src} alt={`${project.title} Can`} />
          {/each}
        </div>
      {/if}
    </div>

    <div class="up-next">
      <h2 class="next-text">Up Next</h2>
      {#if nextProject}
        <ProjectCard project={nextProject} />
      {/if}
    </div>
  </div>
{:else}
  <p>Project not found</p>
{/if}

<style>
  .project-container {
    display: grid;
    gap: 1rem;
    grid-column: span 12;
  }

  .project-title {
    grid-column: span 12;
    text-align: center;
    font-weight: bold;
  }

  .categories {
    grid-column: span 12;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .image-container {
    grid-column: span 12;
    max-height: 40rem;
    display: flex;
    justify-content: center;
  }


  .details-grid {
    grid-column: span 12;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
    margin: 2rem 3rem;
  }

  .overview {
    grid-column: span 8;
  }

  .year {
    grid-column: span 4;
    text-align: right;
  }

  .tools {
    grid-column: span 12;
    margin: 2rem 3rem;
  }

  .tools-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tool-chips {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }

  .additional-images {
    grid-column: span 12;
    display: grid;
    grid-template-columns: repeat(1, 1fr); /* Default: one image per row */
    gap: 1rem;
    margin: 2rem 0;
  }
  .can-images {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .dieline-images {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .additional-images img {
    width: 100%;
    height: auto;
  }

  .up-next {
    grid-column: span 12;
    margin-top: 3rem;
  }

  .next-text {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 4rem;
  }

@media (max-width: 1024px) {
  .details-grid {
    grid-template-columns: repeat(8, 1fr);
  }

  .overview {
    grid-column: span 8;
  }

  .year {
    grid-column: span 8;
    text-align: left;
    margin-top: 1rem;
  }
}

/* Show on desktop, hide on mobile */
.external-link-desktop {
  display: block;
}

.external-link-mobile {
  display: none;
}

@media (max-width: 768px) {
  .details-grid {
    grid-template-columns: repeat(4, 1fr);
    margin: 0;
  }

  .project-container {
    display: block;
  }

  .tools {
    margin: 0;
    margin: 2rem 0;
  }

   /* Hide on mobile, show below tools */
  .external-link-desktop {
    display: none;
  }

  .external-link-mobile {
    display: block;
    margin: 2rem 0;  /* Add some spacing if needed */
  }

  .overview {
    grid-column: span 4;
  }

  .year {
    grid-column: span 4;
    text-align: left;
    margin-top: 1rem;
  }

  .can-images {
    grid-template-columns: 1fr;
  }

  .next-text {
    font-size: 2.5rem;
  }
}

</style>