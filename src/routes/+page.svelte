<script lang="ts">
  import projects from '$lib/data/projects.json';
</script>

<h1>My Portfolio</h1>
<div>
  {#each projects as project}
      <a href={`/projects/${project.slug}`}>
          <div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
          </div>
      </a>
  {/each}
</div>