<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();
	let version = $state('');

	onMount(async () => {
		if (typeof window !== 'undefined' && (window as any).__TAURI_INTERNALS__) {
			try {
				const { getVersion } = await import('@tauri-apps/api/app');
				version = await getVersion();
			} catch (e) {
				console.error('Failed to get app version:', e);
			}
		}
	});
</script>

<svelte:head>
	<title>SpecterDB{version ? ` v${version}` : ''}</title>
</svelte:head>

<div class="relative min-h-dvh flex flex-col">
	{@render children?.()}
</div>
