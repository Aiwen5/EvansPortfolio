<script>
  export let label = '';
</script>

<div class="chip">
  {label}
</div>

<style>
  .chip {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: var(--primary-accent-light);
    color: var(--primary-accent);
    border-radius: 9999px;
    text-align: center;
    white-space: nowrap;
  }

</style>