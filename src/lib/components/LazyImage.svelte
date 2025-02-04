<script lang="ts">
  import { onMount } from 'svelte';

  export let src: string;
  export let alt: string = '';
  export let dieline: boolean = false;
  export let normal: boolean = false;
  export let aspectRatio: string = '16 / 9';

  let isLoaded = false;
  let hasError = false;
  let imgElement: HTMLImageElement;

  // Reset loading state when src changes
  $: if (src) {
    isLoaded = false;
    hasError = false;
  }

  const handleLoad = () => {
    isLoaded = true;
  };

  const handleError = () => {
    hasError = true;
  };

  onMount(() => {
    if (imgElement && imgElement.complete) {
      if (imgElement.naturalWidth !== 0) {
        handleLoad();
      } else {
        handleError();
      }
    }
  });
</script>

<div class="image-wrapper" style="aspect-ratio: {aspectRatio};">
  {#if !isLoaded && !hasError}
    <div class="placeholder"></div>
  {/if}
  
  {#if hasError}
    <div class="error-placeholder">Image failed to load</div>
  {/if}
  
  <img 
    bind:this={imgElement}
    src={src} 
    alt={alt} 
    on:load={handleLoad} 
    on:error={handleError} 
    class:is-visible={isLoaded}
    class:dieline-style={dieline}
    class:normal-style={normal}
  />
</div>

<style>
  .image-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    margin-bottom: 2.5rem;
  }

  .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    background: var(--card-bg);
    animation: pulse 0.7s ease-in-out infinite alternate;
  }

  .error-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    background: var(--error-bg);
    color: var(--error-text);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  img.is-visible {
    opacity: 1;
  }

  /* Styles for dieline images */
  img.dieline-style {
    height: auto;
    object-fit: contain;
    border-radius: 0;
  }

  img.normal-style {
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    margin-bottom: 1.5rem;
  }

  @keyframes pulse {
    from {
      background: var(--card-bg);
    }
    to {
      background: var(--background);
    }
  }
</style>