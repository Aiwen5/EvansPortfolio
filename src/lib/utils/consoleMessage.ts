import { onMount } from 'svelte';

export function logStyledMessage() {
  onMount(async () => {
    try {
      const response = await fetch('/ascii/ascii-art.txt');

      if (!response.ok) {
        console.warn('Failed to fetch ASCII art:', response.statusText);
        return;
      }

      const asciiArt = await response.text();

      console.log(
        "%cHello, Developer! 👋\n%cThanks for checking out my portfolio. Let me know if you have any questions or feedback.\n\n" + asciiArt,
        "font-size: 16px; font-weight: bold;",
        "font-size: 14px;"
      );
    } catch (error) {
      console.error('Error fetching ASCII art:', error);
    }
  });
}