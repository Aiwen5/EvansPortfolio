<script>
  import CategoryChip from '$lib/components/CategoryChip.svelte';
  export let project;
</script>

<div class="card">
  <img src={project.image} alt={project.title} class="card-image" />
  <div class="card-content">
    <h2>{project.title}</h2>
    <div class="chip-container">
      {#each project.categories as category}
        <CategoryChip label={category} />
      {/each}
    </div>
  </div>
</div>

<style>
  .card {
    display: flex;
    background: var(--card-bg);
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
    height: 312px;
  }

  .card-image {
    width: 300px;
    height: 100%;
    margin-right: 2.5rem;
    object-fit: cover;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    max-width: 100%;
  }

  .card-content {
    flex: 1;
  }

  .chip-container {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
</style>