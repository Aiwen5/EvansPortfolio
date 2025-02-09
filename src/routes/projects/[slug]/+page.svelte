<script lang="ts">
  import { page } from '$app/stores';
  import { onDestroy } from 'svelte';
  import ProjectLayout from '$lib/components/ProjectLayout.svelte';

  export let data;
  let { project, nextProject } = data;

  $: {
    project = data.project;
    nextProject = data.nextProject;
  };

  const unsubscribe = page.subscribe(() => {
    project = data.project;
    nextProject = data.nextProject;
  });

  onDestroy(unsubscribe);
</script>

<ProjectLayout {project} {nextProject} />