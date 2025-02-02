<script lang="ts">
  import CategoryChip from '$lib/components/CategoryChip.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import projects from '$lib/data/projects.json';
  import { page } from '$app/stores'; 

  // Extract slug directly from the page store
  let slug: string;
$: slug = $page.params.slug;

let project;
$: project = projects.find((p: { slug: string }) => p.slug === slug);

let nextProject: { slug: string, title: string, categories: string[], image: string, overview: string, year: number, tools: string[] } | undefined;
$: if (project) {
  const currentIndex = projects.findIndex(p => p.slug === project.slug);
  nextProject = projects[(currentIndex + 1) % projects.length];
}
</script>

{#if project}
  <div class="project-container">
    <!-- Project Title -->
    <h1 class="project-title">{project.title}</h1>

    <!-- Categories using CategoryChip component -->
    <div class="categories">
      {#each project.categories as category}
        <CategoryChip label={category} />
      {/each}
    </div>

    <!-- Project Image -->
    <div class="image-container">
      <img src={project.image} alt={project.title} />
    </div>

    <!-- Project Details Grid -->
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

    <!-- Tools -->
    <div class="tools">
      <h2>Tools</h2>
      <div class="tool-chips">
        {#each project.tools as tool}
          <CategoryChip label={tool} />
        {/each}
      </div>
    </div>

    <!-- Up Next Section -->
    <div class="up-next">
      <h2>Up Next</h2>
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
    padding: 2rem;
  }

  .project-title {
    grid-column: span 12;
    text-align: center;
    font-weight: bold;
  }

  .categories {
    grid-column: span 12;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .image-container {
    grid-column: span 12;
    display: flex;
    justify-content: center;
  }

  .image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
  }

  .details-grid {
    grid-column: span 12;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
    margin: 2rem 0;
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
    margin: 2rem 0;
  }

  .tool-chips {
    display: flex;
    gap: 0.5rem;
  }

  .up-next {
    grid-column: span 12;
    margin-top: 3rem;
  }
</style>