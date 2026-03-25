<script lang="ts">
  import LazyImage from "$lib/components/LazyImage.svelte";
  import GeneralButton from "$lib/components/GeneralButton.svelte";
</script>

<div class="about-page">
  <h1>About Me</h1>
  <div class="about-content">
    <div class="portrait">
      <LazyImage src="/images/extras/EvanPortrait.png" alt="Evan Schatz Portrait" aspectRatio="11 / 16" />
    </div>
    <div class="text-and-button">
      <p class="about-text">
        Hi, I'm Evan Schatz, a User Expirence Designer and Front-end Developer focused on innovative web and mobile solutions. Gaining expertise in front end development; user experience and interface design; as well as SEO and marketing through hands-on project leadership and collaboration.
      </p>
      <GeneralButton text="View Resume" width="100%" link="https://indd.adobe.com/view/7340b677-ed79-4a4a-9fe7-b8465333e98f" />
    </div>
  </div>  
</div>

<style>
  .about-page {
    max-width: 60rem;
    margin: 0 auto;
    text-align: center;
    gap: 1rem;
    grid-column: span 12;
  }

  .about-content {
    display: grid;
    gap: 3rem;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    margin-bottom: 3rem;
  }

  .text-and-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .about-text {
    text-align: left;
  }

  .about-page h1 {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    .about-content {
      grid-template-columns: 1fr;
    }

  }
</style>