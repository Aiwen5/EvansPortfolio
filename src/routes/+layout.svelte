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

<style>
  .layout-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
  }

  .nav-wrapper {
    position: sticky;
    top: 0;
    z-index: 1000;
  }
</style>