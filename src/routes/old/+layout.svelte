<script lang="ts">
	import { onMount } from 'svelte';
	import '../../app.css';

	let { children } = $props();
	onMount(() => {
		document.addEventListener('contextmenu', (e) => e.preventDefault());
		document.addEventListener('dragstart', (e) => e.preventDefault());
	});
</script>

<div>
	<nav class="h-[70px] bg-gray-950 font-sans">
		<div class="flex h-full justify-between p-2 px-7 items-center text-white">
			<a class="text-xl font-bold" aria-label="home" href="/">specterdb</a>
			<ul class="flex space-x-4 items-center">
				<li><a aria-label="change-theme" href="/" class="text-sm bg-red-800 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors">Change Theme</a></li>
				<li><a aria-label="home" href="/old">Home</a></li>
				<li><a aria-label="ghost" href="/old/ghosts">Ghost</a></li>
			</ul>
		</div>
	</nav>
</div>

<div class="bg-gray-800 min-h-[calc(100vh-70px)] font-sans">
	{@render children?.()}
</div>
