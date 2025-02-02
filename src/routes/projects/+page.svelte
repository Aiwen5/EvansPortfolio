<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import projects from '$lib/data/projects.json' assert { type: 'json' };
</script>

<div class="projects-container">
  <h1 class="page-title">Projects</h1>
  <div class="projects-grid">
    {#each projects as project}
      <ProjectCard {project} />
    {/each}
  </div>
</div>

<style>
  .projects-container {
    max-width: 1200px;
    margin: 0 auto;
    grid-column: span 12;
  }

  .page-title {
    margin-bottom: 2rem;
    text-align: center;
  }

  .projects-grid {
    display: grid;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    .page-title {
      font-size: 2rem;
    }
  }
</style>