<script lang="ts">
  import projects from '$lib/data/projects.json';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<div class="projects-grid">
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

  @media (max-width: 768px) {
    .projects-grid {
      gap: 1.5rem;
    }
  }
</style>