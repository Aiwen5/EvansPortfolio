<script lang="ts">
  import '../app.css';
  import NavigationBar from '$lib/components/NavigationBar.svelte';
</script>

<div class="layout-grid">
  <div class="nav-wrapper">
    <NavigationBar />
  </div>
  <slot />
</div>