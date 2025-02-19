<script lang="ts">
  export let before: string;
  export let after: string;

  let sliderPosition = 50; // Initial % position of the slider
  let isDragging = false;

  function updatePosition(event: MouseEvent | TouchEvent) {
    const container = document.querySelector(".before-after-container");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    let offsetX = 0;

    const isTouchEvent = typeof TouchEvent !== "undefined" && event instanceof TouchEvent;
    
    if (isTouchEvent) {
      offsetX = event.touches[0].clientX - rect.left;
    } else {
      offsetX = (event as MouseEvent).clientX - rect.left;
    }

    sliderPosition = Math.max(0, Math.min((offsetX / rect.width) * 100, 100));
  }

  function startDrag(event: MouseEvent | TouchEvent) {
    event.preventDefault(); // Prevents image dragging and text selection
    updatePosition(event); // Move slider to click location
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

  $: clipPathStyle = `inset(0 ${100 - sliderPosition}% 0 0)`;
</script>

<div
  class="before-after-container"
  role="slider"
  aria-valuenow={sliderPosition}
  aria-valuemin="0"
  aria-valuemax="100"
  tabindex="0"
  on:mousedown={startDrag}
  on:touchstart={startDrag}
>
  <!-- Before Image -->
  <div class="before-image" style="clip-path: {clipPathStyle};">
    <img src={before} alt="Before" draggable="false" />
  </div>

  <!-- After Image -->
  <div class="after-image">
    <img src={after} alt="After" draggable="false" />
  </div>

  <!-- Slider Handle -->
  <div class="slider" style="left: {sliderPosition}%;">
    <div class="handle"></div>
  </div>
</div>

<style>
  .before-after-container {
    position: relative;
    width: 100%;
    height: 40rem;
    overflow: hidden;
    user-select: none;
    cursor: grab;
  }

  .before-image,
  .after-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
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
    width: 4px;
    background: #e5e1e6;
    transform: translateX(-50%);
    cursor: ew-resize;
    z-index: 3;
  }

  .handle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 25px;
    height: 25px;
    background: #e5e1e6;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border: 2px solid #10312b;
    transform: translate(-50%, -50%);
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

  }
</style>