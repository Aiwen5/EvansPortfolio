<script lang="ts">
  import '../app.css';
  import NavigationBar from '$lib/components/NavigationBar.svelte';
  import ScrollToTop from '$lib/components/ScrollToTop.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { injectAnalytics } from '@vercel/analytics/sveltekit'
  import { logStyledMessage } from '../lib/utils/consoleMessage.ts';
  
  logStyledMessage();
</script>

<div class="layout-grid">
  <div class="nav-wrapper">
    <NavigationBar />
  </div>
  <slot />
  <ScrollToTop />
  <Footer />
</div>

<style>
  .layout-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
  }

  .nav-wrapper {
    position: relative;
    top: 0;
    z-index: 1000;
    margin-bottom: 3rem;
  }

  @media (max-width: 768px) {
    .nav-wrapper {
      margin-bottom: 1rem;
    }
  }
</style>