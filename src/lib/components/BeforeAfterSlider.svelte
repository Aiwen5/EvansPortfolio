<script lang="ts">
  export let before: string;
  export let after: string;

  let sliderPosition = 50; // Initial % position of the slider
  let isDragging = false;

  function updatePosition(event: MouseEvent | TouchEvent) {
    const container = document.querySelector(".before-after-container");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const offsetX =
      event instanceof TouchEvent
        ? event.touches[0].clientX - rect.left
        : event.clientX - rect.left;

    sliderPosition = Math.max(0, Math.min((offsetX / rect.width) * 100, 100));
  }

  function startDrag(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    isDragging = true;

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("touchmove", updatePosition, { passive: false });
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);
  }

  function stopDrag() {
    isDragging = false;
    document.removeEventListener("mousemove", updatePosition);
    document.removeEventListener("touchmove", updatePosition);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchend", stopDrag);
  }

  $: clipPathStyle = `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`;
</script>

<div class="before-after-container">
  <!-- Before Image (Above After Image) -->
  <div class="before-image" style="clip-path: {clipPathStyle};">
    <img src={before} alt="Before">
  </div>

  <!-- After Image (Below Before Image) -->
  <div class="after-image">
    <img src={after} alt="After">
  </div>

  <!-- Slider Handle -->
  <div
    class="slider"
    style="left: {sliderPosition}%"
    role="slider"
    tabindex="0"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow={sliderPosition}
    on:mousedown={startDrag}
    on:touchstart={startDrag}
  >
    <div class="slider-handle"></div>
  </div>
</div>

<style>
  .before-after-container {
    position: relative;
    width: 100%;
    height: 40rem;
    overflow: hidden;
    user-select: none;
  }

  .before-image,
  .after-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .before-image {
    z-index: 2;
  }

  .after-image {
    z-index: 1;
  }

  .before-image img,
  .after-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .slider {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 5px;
    background: #e5e1e6;
    cursor: grab;
    transform: translateX(-50%);
    z-index: 3;
  }

  .slider-handle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 25px;
    height: 25px;
    background: #e5e1e6;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
    transform: translate(-50%, -50%);
    border: 1px solid #10312b;
  }

  @media (max-width: 1024px) {
    .before-after-container {
      height: 30rem;
    }
  }

  @media (max-width: 768px) {
    .before-after-container {
      height: 20rem;
    }

    .slider-handle {
      width: 20px;
      height: 20px;
    }
  }
</style>