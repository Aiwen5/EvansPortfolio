<script lang="ts">
  import { onMount } from 'svelte';

  export let src: string;
  export let alt: string = '';
  export let aspectRatio: string = '16 / 9';
  export let width: string = '100%';
  export let blendMode: string = '';  // e.g., 'multiply', 'screen', 'overlay'
  export let filter: string = '';     // e.g., 'grayscale(100%)', 'contrast(150%)'

  let isLoaded = false;
  let hasError = false;
  let videoElement: HTMLVideoElement;

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
    if (videoElement && videoElement.readyState >= 3) {
      handleLoad();
    }
  });
</script>

<div class="video-wrapper" style="aspect-ratio: {aspectRatio}; width: {width};">
  {#if !isLoaded && !hasError}
    <div class="placeholder"></div>
  {/if}

  {#if hasError}
    <div class="error-placeholder">Video failed to load</div>
  {/if}

  <video
    bind:this={videoElement}
    src={src}
    autoplay
    loop
    muted
    playsinline
    on:canplaythrough={handleLoad}
    on:error={handleError}
    class:is-visible={isLoaded}
    style="mix-blend-mode: {blendMode}; filter: {filter};"
  >
    <track kind="descriptions" label={alt} />
  </video>
</div>

<style>
  .video-wrapper {
    position: relative;
    overflow: hidden;
  }

  .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--card-bg);
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    animation: pulse 0.7s ease-in-out infinite alternate;
  }

  .error-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--error-bg);
    color: var(--error-text);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    transition: opacity 0.3s ease-in-out;
  }

  video.is-visible {
    opacity: 1;
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