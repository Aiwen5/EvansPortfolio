<script lang="ts">
	import '../app.css';
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	let { children } = $props();
</script>
<NavigationBar />
{@render children()}
