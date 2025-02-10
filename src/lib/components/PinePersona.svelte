<script lang="ts">
  import LazyImage from "./LazyImage.svelte";
  
  export let persona = {
    name: "Alex Zhang",
    age: 21,
    education: "Nutrition Science",
    hobbies: ["Cooking", "Blogging"],
    occupation: "Student and Blogger",
    location: "Austin, Texas",
    bio: "Alex Zhang is an energetic and health-conscious Gen Z food enthusiast who runs a part-time blog featuring healthy recipes and restaurant reviews. As a nutrition science major, Alex has a strong interest in the relationship between food and well-being. Despite being red/green colorblind, Alex has a vibrant personality and uses his unique perspective to create content that is accessible to all.",
    mustDo: [
      "Use clear and contrasting colors in food presentation and app design.",
      "Ensure recipes and restaurant menus are easy to read and understand."
    ],
    mustNever: [
      "Overlook accessibility features in the app, especially for color vision deficiencies.",
      "Compromise on the nutrition of the dishes featured."
    ],
    technology: [
      { name: "Instagram and TikTok", years: 5 },
      { name: "Notion", years: 3 },
      { name: "Adobe Premiere Pro", years: 2 }
    ],
    personalityTraits: ["Friendly", "Health Conscious", "Adventurist", "Tech-savvy"],
    apps: [
      { name: "YouTube", icon: "youtube.svg" },
      { name: "TikTok", icon: "tiktok.svg" },
      { name: "Notion", icon: "notion.svg" },
      { name: "Instagram", icon: "instagram.svg" },
      { name: "Adobe Premiere", icon: "premiere.svg" }
    ],
    userGoals: [
      "Find Healthy Options: He prioritizes finding dishes that are both delicious and good for you.",
      "Accessibility: The apps he uses must cater to his colorblindness, allowing him to use them without difficulty.",
      "Social Sharing: He wants to be able to share his culinary discoveries with his audience easily.",
      "Community: He wants to interact with other food lovers."
    ],
    devices: ["Smartphone - iOS (his everyday device)", "Laptop - Windows (his workhorse)"],
    references: [
      "Gordon Ramsay: Admires his passion for culinary arts and dedication.",
      "Adam Ragusea: Influential YouTuber who advocates for accessibility and inclusivity while focusing on the science behind cooking."
    ],
    quote: "Food is not just about taste, it’s about the experience. An inclusive app helps everyone enjoy the beauty of food, regardless of dietary needs or physical challenges."
  };
</script>

<!-- Persona Container -->
<div class="outer-persona-container">
  <div class="persona-container">
    <!-- Left Column: Persona Info -->
    <div class="persona-info">
      <LazyImage src="/images/pine/PersonaHeadshot.png" alt="Alex Zhang" aspectRatio="1 / 1" />
      <h2 class="persona-name">{persona.name}</h2>
      <p><strong>Age:</strong> {persona.age}</p>
      <p><strong>Education:</strong> {persona.education}</p>
      <p><strong>Hobbies:</strong> {persona.hobbies.join(", ")}</p>
      <p><strong>Occupation:</strong> {persona.occupation}</p>
      <p><strong>Location:</strong> {persona.location}</p>
      <p class="bio">{persona.bio}</p>
    </div>

    <!-- Right Column: Additional Details -->
    <div class="persona-details">
      <div class="section">
        <h3>Must Do</h3>
        <ul>{#each persona.mustDo as item}<li>{item}</li>{/each}</ul>
      </div>

      <div class="section">
        <h3>Must Never</h3>
        <ul>{#each persona.mustNever as item}<li>{item}</li>{/each}</ul>
      </div>

      <div class="section">
        <h3>Technology</h3>
        <ul class="tech-list">
          {#each persona.technology as tech}
            <li><strong>{tech.name}:</strong> {tech.years} years used</li>
          {/each}
        </ul>
      </div>

      <div class="section">
        <h3>Apps and Software</h3>
        <div class="app-icons">
          {#each persona.apps as app}
            <li class="trait">{app.name}</li>
          {/each}
        </div>
      </div>

      <div class="section">
        <h3>User Experiences / Goals</h3>
        <ul>{#each persona.userGoals as goal}<li>{goal}</li>{/each}</ul>
      </div>

      <div class="section">
        <h3>Devices and Platforms</h3>
        <ul>{#each persona.devices as device}<li>{device}</li>{/each}</ul>
      </div>

      <div class="section">
        <h3>Personality</h3>
        <div class="traits">
          {#each persona.personalityTraits as trait}
            <span class="trait">{trait}</span>
          {/each}
        </div>
      </div>

      <div class="section">
        <h3>References + Influences</h3>
        <ul>{#each persona.references as ref}<li>{ref}</li>{/each}</ul>
      </div>

      <div class="section">
        <h3>Quote</h3>
        <blockquote>{persona.quote}</blockquote>
      </div>
    </div>
  </div>
</div>

<style>
  .outer-persona-container {
    grid-column: span 12;
  }
  
  .persona-container {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 0rem;
    padding: 2rem;
    gap: 1rem;
    background: var(--card-bg);
    color: var(--text-color);
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    margin: auto;
    max-width: 100%;
    box-shadow: var(--shadow-lg);
  }

  .persona-info {
    background: var(--chip-bg);
    padding: 1.5rem;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    text-align: left;
    overflow: hidden;
  }

  .persona-name {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--primary-accent);
  }

  .persona-details {
    display: grid;
    gap: 1rem;
    overflow: hidden;
    max-width: 100%;
  }

  .section {
    background: var(--chip-bg);
    padding: 1.5rem;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;

  }

  .tech-list {
    list-style-type: none;
    padding: 0;
  }

  .tech-list li {
    padding: 0.5rem 0;

  }

  .app-icons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .traits {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .trait {
    display: flex;
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: var(--card-bg);
    color: var(--primary-accent);
    border-bottom-left-radius: 12px;
    border-top-right-radius: 12px;
    text-align: center;
    white-space: nowrap;
  }

  blockquote {
    font-style: italic;
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    .persona-container {
      grid-template-columns: 1fr;
      padding: 0.85rem;
    }
  }
</style>