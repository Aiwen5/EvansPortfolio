<script lang="ts">
  import CategoryChip from './CategoryChip.svelte';
  import LazyImage from './LazyImage.svelte';
  import ExternalLinkButton from './ExternalLinkButton.svelte';
  import { marked } from 'marked';
  import ProjectCard from './ProjectCard.svelte';
  export let project;
  export let nextProject;
</script>

{#if project}
  <div class="project-container">
    <!-- Project Title -->
    <h1 class="project-title">{project.title}</h1>

    <!-- Categories -->
    <div class="categories">
      {#each project.categories as category}
        <CategoryChip label={category} />
      {/each}
    </div>

    <!-- Thumbnail Image -->
    <div class="image-container">
      <LazyImage src={project.image} alt={`${project.title} Image`} />
    </div>

    <!-- Project Details Grid -->
    <div class="details-grid">
      <div class="overview">
        <h2>My Process</h2>
        <!-- Ensure the correct class name is used here -->
        <div class="structured-content">{@html marked(project.overview)}</div>
      </div>
      <div class="year">
        <h2>Year</h2>
        <p>{project.year}</p>
      </div>
    </div>

    {#if project.externalLinks}
      <!-- External Links Section -->
      <div class="external-links">
        {#each project.externalLinks as link}
          <ExternalLinkButton link={link.href} text={link.text} />
        {/each}
      </div>
    {/if}

    <!-- Tools -->
    <div class="tools">
      <div class="tools-header">
        <h2>Tools</h2>
      </div>

      <div class="tool-chips">
        {#each project.tools as tool}
          <CategoryChip label={tool} />
        {/each}
      </div>
    </div>


    <!-- Additional Images Section -->
    <div class="additional-images">
      {#if project.images}
        <div class="dieline-images">
          {#each project.images.filter((image: { type: string; src: string }) => image.type === 'dieline') as image}
            <LazyImage src={image.src} alt={`${project.title} Image`} dieline={true} /> 
          {/each}
        </div>

        <div class="normal-images">
          {#each project.images.filter((image: { type: string; src: string }) => image.type === 'normal') as image}
            <LazyImage src={image.src} alt={`${project.title} Image`} normal={true} /> 
          {/each}
        </div>
        
        <div class="can-images">
          {#each project.images.filter((image: { type: string; src: string }) => image.type === 'can') as image}
          <LazyImage src={image.src} alt={`${project.title} Image`} aspectRatio="9 / 16" />
          {/each}
        </div>
      {/if}
    </div>

    <!-- Up Next Section -->
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

  :global(.structured-content h3) {
    font-size: 1.4rem;
    margin-top: 1.5rem;
    font-weight: bold;
    color: var(--primary-accent);
  }

  :global(.structured-content p) {
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  :global(.structured-content ul) {
    margin-left: 1.5rem;
    list-style-type: disc;
  }

  :global(.structured-content li) {
    margin-bottom: 0.5rem;
  }

  .year {
    grid-column: span 4;
    text-align: right;
  }

  .external-links {
    margin-left: 3rem;
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
    justify-content: left;
    grid-column: span 12;
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

@media (max-width: 768px) {
  .details-grid {
    grid-template-columns: repeat(4, 1fr);
    margin: 2rem 0;
  }

  .project-container {
    display: block;
  }

  .tools {
    margin: 0;
    margin: 2rem 0;
  }

  .external-links {
    margin-left: 0;
    flex-wrap: wrap;
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