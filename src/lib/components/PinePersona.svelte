<script lang="ts">
  import LazyImage from "./LazyImage.svelte";
</script>

<!-- Persona Container -->
<div class="outer-persona-container">
  <div class="persona-container">
    <!-- Left Column: Persona Info -->
    <div class="persona-info">
      <LazyImage src="/images/pine/PersonaHeadshot.png" alt="Alex Zhang" aspectRatio="1 / 1" />
      <h2 class="persona-name">Alex Zhang</h2>
      <p><strong>Age:</strong> 21</p>
      <p><strong>Education:</strong> Nutrition Science</p>
      <p><strong>Hobbies:</strong> Cooking, Blogging</p>
      <p><strong>Occupation:</strong> Student and Blogger</p>
      <p><strong>Location:</strong> Austin, Texas</p>
      <p class="bio">
        Alex Zhang is an energetic and health-conscious Gen Z food enthusiast who runs a part-time blog featuring 
        healthy recipes and restaurant reviews. As a nutrition science major, Alex has a strong interest in the 
        relationship between food and well-being. Despite being red/green colorblind, Alex has a vibrant personality 
        and uses his unique perspective to create content that is accessible to all.
      </p>
    </div>

    <!-- Right Column: Additional Details -->
    <div class="persona-details">
      <div class="section">
        <h3>Must Do</h3>
        <ul>
          <li>Use clear and contrasting colors in food presentation and app design.</li>
          <li>Ensure recipes and restaurant menus are easy to read and understand.</li>
        </ul>
      </div>

      <div class="section">
        <h3>Must Never</h3>
        <ul>
          <li>Overlook accessibility features in the app, especially for color vision deficiencies.</li>
          <li>Compromise on the nutrition of the dishes featured.</li>
        </ul>
      </div>

      <div class="section">
        <h3>Technology</h3>
        <ul class="tech-list">
          <li><strong>Instagram and TikTok:</strong> 5 years used</li>
          <li><strong>Notion:</strong> 3 years used</li>
          <li><strong>Adobe Premiere Pro:</strong> 2 years used</li>
        </ul>
      </div>

      <div class="section">
        <h3>Apps and Software</h3>
        <div class="app-icons">
          <span class="trait">YouTube</span>
          <span class="trait">TikTok</span>
          <span class="trait">Notion</span>
          <span class="trait">Instagram</span>
          <span class="trait">Adobe Premiere</span>
        </div>
      </div>

      <div class="section">
        <h3>User Experiences / Goals</h3>
        <ul>
          <li>Find Healthy Options: He prioritizes finding dishes that are both delicious and good for you.</li>
          <li>Accessibility: The apps he uses must cater to his colorblindness, allowing him to use them without difficulty.</li>
          <li>Social Sharing: He wants to be able to share his culinary discoveries with his audience easily.</li>
          <li>Community: He wants to interact with other food lovers.</li>
        </ul>
      </div>

      <div class="section">
        <h3>Devices and Platforms</h3>
        <ul>
          <li>Smartphone - iOS (his everyday device)</li>
          <li>Laptop - Windows (his workhorse)</li>
        </ul>
      </div>

      <div class="section">
        <h3>Personality</h3>
        <div class="traits">
          <span class="trait">Friendly</span>
          <span class="trait">Health Conscious</span>
          <span class="trait">Adventurist</span>
          <span class="trait">Tech-savvy</span>
        </div>
      </div>

      <div class="section">
        <h3>References + Influences</h3>
        <ul>
          <li>Gordon Ramsay: Admires his passion for culinary arts and dedication.</li>
          <li>Adam Ragusea: Influential YouTuber who advocates for accessibility and inclusivity while focusing on the science behind cooking.</li>
        </ul>
      </div>

      <div class="section">
        <h3>Quote</h3>
        <blockquote>"Food is not just about taste, it’s about the experience. An inclusive app helps everyone enjoy the beauty of food, regardless of dietary needs or physical challenges."</blockquote>
      </div>
    </div>
  </div>
</div>

<!-- Styles -->
<style>
  .outer-persona-container {
    grid-column: span 12;
  }
  
  .persona-container {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 1rem;
    padding: 2rem;
    background: var(--card-bg);
    color: var(--text-color);
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    margin: auto;
    max-width: 100%;
    box-shadow: var(--shadow-lg);
  }

  .persona-info {
    padding: 1.5rem;
    border-bottom-left-radius: 30px;
    border-top-right-radius: 30px;
    text-align: left;
    overflow: hidden;
  }

  ul, li, p {
    font-size: 1rem;
  }

  .persona-info p {
    margin-bottom: 0.75rem;
  }

  .persona-name {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--primary-accent);
  }

  .persona-details {
    display: grid;
    gap: 1.75rem;
    overflow: hidden;
    max-width: 100%;
    padding: 1.5rem 0;
    text-align: left;
  }

  .section {
    padding: 0rem 1.5rem;
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
    background-color: var(--background);
    color: var(--primary-accent);
    border-bottom-left-radius: 12px;
    border-top-right-radius: 12px;
    text-align: center;
    white-space: nowrap;
  }

  blockquote {
    font-style: italic;
    margin-top: 10px;
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 768px) {
    .persona-container {
      grid-template-columns: 1fr;
      padding: 0.85rem;
      gap: 0;
    }
  }
</style>