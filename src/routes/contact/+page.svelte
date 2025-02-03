<script lang="ts">
  import GeneralButton from "$lib/components/GeneralButton.svelte";

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

    <GeneralButton text="Send Message" width=100% onClick={handleSubmit} />
  </form>
</div>

<style>
  .contact-page {
    margin: 0 auto;
    width: 600px;
    text-align: center;
    display: grid;
    grid-column: span 12;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: bold;
    text-align: left;
    margin-bottom: 0.5rem;
  }

  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--primary-accent);
    background-color: var(--background);
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 1024px) {
    .contact-page {
      width: 500px;
      padding: 0 1rem;
    }
  }

  @media (max-width: 768px) {
    .contact-page {
      width: 100%;
    }
  }
</style>