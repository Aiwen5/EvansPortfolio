<script>
  export let params;
  import projects from '$lib/data/projects.json';

  const project = projects.find(p => p.slug === params.slug);
  console.log(project);
</script>

{#if project}
  <h1>{project.title}</h1>
  <img src={project.image} alt={project.title} />
{:else}
  <p>Project not found</p>
{/if}