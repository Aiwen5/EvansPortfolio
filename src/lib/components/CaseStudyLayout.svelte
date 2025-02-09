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
        <div class="structured-content">
          {@html project.overview ? marked(project.overview) : ''}
        </div>
      </div>
      <div class="year">
        <h2>Year</h2>
        <p>{project.year}</p>
      </div>
    </div>

    <!-- Tools -->
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

    <!-- Additional Images Section -->
    <div class="additional-images">
      {#if project.images}
        <div class="dieline-images">
          {#each project.images.filter((image: { type: string }) => image.type === 'dieline') as image}
            <LazyImage src={image.src} alt={`${project.title} Image`} dieline={true} /> 
          {/each}
        </div>

        <div class="normal-images">
          {#each project.images.filter((image: { type: string }) => image.type === 'normal') as image}
            <LazyImage src={image.src} alt={`${project.title} Image`} normal={true} /> 
          {/each}
        </div>
        
        <div class="can-images">
          {#each project.images.filter((image: { type: string }) => image.type === 'can') as image}
            <LazyImage src={image.src} alt={`${project.title} Image`} aspectRatio="9 / 16" />
          {/each}
        </div>
      {/if}
    </div>

    <!-- Case Study Extra Sections -->
    {#if project.caseStudySections}
      <div class="case-study-sections">
        {#each project.caseStudySections as section}
          <div class="case-study-section">
            <h2>{section.heading}</h2>
            <div class="structured-content">{@html marked(section.text)}</div>

            {#if section.image}
              <LazyImage src={section.image} alt={section.heading} />
            {/if}
          </div>
        {/each}
      </div>
    {/if}

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
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    margin: 2rem 0;
  }

  .case-study-sections {
    grid-column: span 12;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 2rem 0;
  }

  .case-study-section {
    grid-column: span 12;
    padding: 1.5rem;
    background: var(--card-bg);
    border-radius: 10px;
  }

  .external-link-desktop {
    display: block;
  }
  .external-link-mobile {
    display: none;
  }

  .case-study-section h2 {
    margin-bottom: 1rem;
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

    .overview {
      grid-column: span 4;
    }

    .year {
      grid-column: span 4;
      text-align: left;
      margin-top: 1rem;
    }

    .external-link-desktop {
      display: none;
    }

    .external-link-mobile {
      display: block;
      margin: 2rem 0;
    }

    .can-images {
      grid-template-columns: 1fr;
    }

    .case-study-section {
      padding: 1rem;
    }

    .next-text {
      font-size: 2.5rem;
    }
  }
</style>