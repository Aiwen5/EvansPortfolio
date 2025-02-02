<script lang="ts">
  let name = '';
  let email = '';
  let message = '';

  const handleSubmit = async () => {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      alert(`Thank you, ${name}! Your message has been sent.`);
      name = '';
      email = '';
      message = '';
    } else {
      alert('Failed to send your message. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while sending the message.');
  }
};
</script>

<div class="contact-page">
  <h1>Contact Me</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="name">Name:</label>
    <input id="name" type="text" bind:value={name} required />

    <label for="email">Email:</label>
    <input id="email" type="email" bind:value={email} required />

    <label for="message">Message:</label>
    <textarea id="message" rows="5" bind:value={message} required></textarea>

    <button type="submit">Send Message</button>
  </form>
</div>

<style>
  .contact-page {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    display: grid;
    gap: 1rem;
    grid-column: span 12;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    font-weight: bold;
    text-align: left;
  }

  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--primary-accent);
    background-color: var(--background);
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  button {
    color: var(--primary-accent);
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--primary-accent);
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: var(--hover-accent);
  }
</style>