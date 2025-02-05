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
    background-color: var(--chip-bg);
    color: var(--primary-accent);
    border-bottom-left-radius: 12px;
    border-top-right-radius: 12px;
    text-align: center;
    white-space: nowrap;
  }

</style>