<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="relative min-h-dvh flex flex-col">
	{@render children?.()}
</div>
