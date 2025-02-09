<script lang="ts">
  export let figmaUrl: string;
</script>

<iframe 
  title="Figma Embed"
  style="border: 1px solid #ccc; width: 100%; height: 500px;" 
  src={`https://www.figma.com/embed?embed_host=share&url=${figmaUrl}`} 
  allowfullscreen>
</iframe>