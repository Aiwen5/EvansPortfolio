<script>
  import CategoryChip from '$lib/components/CategoryChip.svelte';
  export let project;
</script>

<a href={`/projects/${project.slug}`} class="card">
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
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: scale(1.02);
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

  @media (max-width: 480px) {
    .project-title {
      font-size: 1.5rem;
    }
  }
</style>