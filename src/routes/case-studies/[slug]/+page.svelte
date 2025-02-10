<script lang="ts">
  import CaseStudyLayout from '$lib/components/CaseStudyLayout.svelte';

  // Ensure you properly receive `data` from the load function
  export let data;

  if (!data.project) {
    throw new Error('Case study not found');
  }

  let project = data.project;
  let nextProject = data.nextProject;
</script>
<CaseStudyLayout {project} {nextProject} />