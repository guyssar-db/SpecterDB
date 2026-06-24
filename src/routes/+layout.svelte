<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import '../app.css';

	let { children } = $props();
	let version = $state('');

	const currentTheme = $derived(
		page.url.pathname.startsWith('/futuristic') ? 'Futuristic' :
		page.url.pathname.startsWith('/pixel') ? 'Pixel' :
		page.url.pathname.startsWith('/modern') ? 'Modern' :
		page.url.pathname.startsWith('/old') ? 'Old' : ''
	);

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
	<title>SpecterDB{version ? ` v${version}` : ''}{currentTheme ? ` - ${currentTheme}` : ''}</title>
</svelte:head>

<div class="relative min-h-dvh flex flex-col">
	{@render children?.()}
</div>
