<script lang="ts">
  import ScrollStack from '$lib/components/ScrollStack.svelte';
  import projects from '$lib/data/projects.json' with { type: 'json' };
</script>

<div class="projects-container">
  <h1 class="page-title">Projects</h1>
  <div class="projects-grid">
    <ScrollStack {projects} />
  </div>
</div>

<style>
  .projects-container {
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
</style>