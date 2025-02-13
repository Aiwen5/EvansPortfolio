<script lang="ts">
  import CategoryChip from './CategoryChip.svelte';
  import LazyImage from './LazyImage.svelte';
  import LazyVideo from './LazyVideo.svelte';
  import ExternalLinkButton from './ExternalLinkButton.svelte';
  import { marked } from 'marked';
  import ProjectCard from './ProjectCard.svelte';
  import PinePersona from './PinePersona.svelte';

  export let project;
  export let nextProject;
</script>

{#if project}
  <div class="project-container">
    <!-- Project Title -->
    <h1 class="project-title">{project.title}</h1>

    <!-- Categories -->
    <div class="categories">
      {#each project.categories as category}
        <CategoryChip label={category} />
      {/each}
    </div>

    <!-- Thumbnail Image -->
    <div class="image-container">
      <LazyImage src={project.image} alt={`${project.title} Image`} />
    </div>

    <!-- Project Details Grid -->
    <div class="details-grid">
      <div class="overview">
        <h2>The Project</h2>
        <div class="structured-content">
          {@html project.overview ? marked(project.overview) : ''}
        </div>
      </div>
      <div class="year">
        <h2>Year</h2>
        <p>{project.year}</p>
      </div>
    </div>

    <!-- Tools -->
    <div class="tools">
      <div class="tools-header">
        <h2>Tools</h2>

        {#if project.externalLink}
          <div class="external-link-desktop">
            <ExternalLinkButton link={project.externalLink} />
          </div>
        {/if}
      </div>

      <div class="tool-chips">
        {#each project.tools as tool}
          <CategoryChip label={tool} />
        {/each}
      </div>
    </div>

    {#if project.externalLink}
      <div class="external-link-mobile">
        <ExternalLinkButton link={project.externalLink} />
      </div>
    {/if}

    <!-- Additional Images Section -->
    <div class="additional-images">
      {#if project.images}
        <div class="dieline-images">
          {#each project.images.filter((image: { type: string }) => image.type === 'dieline') as image}
            <LazyImage src={image.src} alt={`${project.title} Image`} normal={true} /> 
          {/each}
        </div>

        <div class="normal-images">
          {#each project.images.filter((image: { type: string }) => image.type === 'normal') as image}
            <LazyImage src={image.src} alt={`${project.title} Image`} normal={true} /> 
          {/each}
        </div>
        
        <div class="can-images">
          {#each project.images.filter((image: { type: string }) => image.type === 'can') as image}
            <LazyImage src={image.src} alt={`${project.title} Image`} aspectRatio="9 / 16" />
          {/each}
        </div>
      {/if}
    </div>

    <!-- Case Study Sections -->
    {#if project.caseStudySections}
      <div class="case-study-sections">
        {#each project.caseStudySections as section}
          <div class="case-study-section">
            <div class="case-study-content">
              <h2>{section.heading}</h2>
              <div class="structured-content">
                {@html marked(section.text)}
              </div>
            </div>

            {#if section.image}
              <LazyImage src={section.image} alt={section.heading} />
            {/if}

            {#if section.figmaEmbedLink}
              <div class="figma-embed">
                <iframe
                  src={"https://www.figma.com/embed?embed_host=share&url=" + encodeURIComponent(section.figmaEmbedLink)}
                  allowfullscreen
                  title={section.heading}
                ></iframe>
              </div>
            {/if}

            {#if section.heading === "Problem & Persona"}
              <PinePersona />
            {/if}

            {#if section.heading === "Branding & Style Guide"}
              {#if project.branding}
                <div class="branding-section">
            
                  <!-- Brand Identity Section (Logo & Animation) -->
                  <div class="branding-row">
                    <h3>Logo & Animation</h3>
                    <div class="brand-identity">
                      <div class="branding-logo">
                        <img src={project.branding.logo} alt="Pine Logo" />
                      </div>
                      <div class="branding-animation">
                        <LazyVideo src={project.branding.animation} alt="Pine Animation" aspectRatio="4 / 3" width="180px" />
                      </div>
                    </div>
                  </div>
            
                  <!-- Fonts Section -->
                  <div class="branding-row">
                    <h3>Fonts</h3>
                    <div class="branding-fonts">
                      {#each project.branding.fonts as font}
                        <div class="font-sample">
                          <div class="font-preview" style="font-family: {font.name}">Aa</div>
                          <p class="font-sample-text" style="font-family: {font.name}">
                            {font.name} – {font.style}
                          </p>
                        </div>
                      {/each}
                    </div>
                  </div>
            
                  <!-- Colors Section -->
                  <div class="branding-row">
                    <h3>Colors</h3>
                    <div class="color-grid">
                      {#each project.branding.colors as color}
                        <div class="color-card">
                          <div class="color-box" style="background-color: {color.hex};"></div>
                          <div class="color-details">
                            <p class="color-name">{color.name}</p>
                            <p class="color-hex">{color.hex}</p>
                            <p class="color-rgb">rgb({color.rgb.join(", ")})</p>
                            <p class="color-hsl">hsl({color.hsl.join(", ")})</p>
                          </div>
                        </div>
                      {/each}
                    </div>
                  </div>
            
                </div>
              {/if}
            {/if}

          </div>
        {/each}
      </div>
    {/if}
    <!-- Up Next Section -->
    <div class="up-next">
      <h2 class="next-text">Up Next</h2>
      {#if nextProject}
        <ProjectCard project={nextProject} />
      {/if}
    </div>
  </div>
{:else}
  <p>Project not found</p>
{/if}


<style>
  .project-container {
    grid-column: span 12;
  }

  .project-title {
    grid-column: span 12;
    text-align: center;
    font-weight: bold;
  }

  .categories {
    grid-column: span 12;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .image-container {
    grid-column: span 12;
    max-height: 40rem;
    display: flex;
    justify-content: center;
  }

  .details-grid {
    grid-column: span 12;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
    margin: 2rem 3rem;
  }

  .overview {
    grid-column: span 8;
  }

  .year {
    grid-column: span 4;
    text-align: right;
  }

  .tools {
    grid-column: span 12;
    margin: 2rem 3rem;
  }

  .tools-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tool-chips {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }

  .additional-images {
    grid-column: span 12;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    margin: 2rem 0;
  }

  .case-study-sections {
    grid-column: span 12;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 2rem 0;
  }

  .case-study-content {
    padding: 0 3rem;
    margin-bottom: 1rem;
  }

  .case-study-section {
    grid-column: span 12;
  }

  .external-link-desktop {
    display: block;
  }
  .external-link-mobile {
    display: none;
  }

  .can-images {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .dieline-images {
    display: grid;
    grid-template-columns: 1fr;
  }

  .up-next {
    grid-column: span 12;
    margin-top: 3rem;
  }

  .next-text {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 4rem;
  }

  .figma-embed {
    margin-top: 1rem;
    margin-bottom: 1rem;
    position: relative;
    width: 100%;
    padding-top: 56.25%;
  }

  .figma-embed iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

/* branding section */
  .branding-section {
    grid-column: span 12;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--card-bg);
    padding: 2rem;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    margin-top: 3rem;
    text-align: center;
    width: 100%;
  }

  .branding-row {
    margin-bottom: 2rem;
  }

  .branding-row h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .brand-identity {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .branding-logo img {
    width: 160px;
  }

  .branding-animation {
    flex: 1;
  }

  /* Fonts Section */
  .branding-fonts {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .font-sample {
    font-size: var(--font-h2-size);
  }

  .branding-fonts {
    display: flex;
    gap: 2rem;
  }

  .font-sample {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .font-preview {
    font-size: 5rem;
    line-height: 4rem;
  }

  .font-sample-text {
    font-size: 1.25rem;
  }

  /* Colors Section */
  .color-grid {
    display: flex;
    gap: 20px;
  }

  .color-card {
    padding: 0.5rem;
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .color-details {
    margin-top: 0.5rem;
  }

  .color-name {
    font-weight: bold;
    font-size: 1rem;
    text-transform: capitalize;
  }

  .color-hex, .color-rgb, .color-hsl {
    font-size: 0.875rem;
    color: var(--primary);
  }

  .color-box {
    width: 100px;
    height: 80px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  @media (max-width: 1024px) {
    .details-grid {
      grid-template-columns: repeat(8, 1fr);
    }

    .overview {
      grid-column: span 8;
    }

    .year {
      grid-column: span 8;
      text-align: left;
      margin-top: 1rem;
    }
  }

  @media (max-width: 768px) {
    .details-grid {
      grid-template-columns: repeat(4, 1fr);
      margin: 2rem 0;
    }

    .project-container {
      display: block;
    }

    .tools {
      margin: 0;
      margin: 2rem 0;
    }

    .overview {
      grid-column: span 4;
    }

    .year {
      grid-column: span 4;
      text-align: left;
      margin-top: 1rem;
    }

    .external-link-desktop {
      display: none;
    }

    .external-link-mobile {
      display: block;
      margin: 2rem 0;
    }

    .can-images {
      grid-template-columns: 1fr;
    }

    .brand-identity {
      flex-direction: column;
    }

    .branding-section {
      padding: 1rem;
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .case-study-content {
      padding: 0;
    }

    .next-text {
      font-size: 2.5rem;
    }
  }
</style>