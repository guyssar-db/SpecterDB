<script lang="ts">
	import { onMount } from 'svelte';

	let { children } = $props();
	let activePath = $state('/modern');

	onMount(() => {
		activePath = window.location.pathname;
	});
</script>

<div class="relative min-h-dvh bg-[#090d16] text-slate-200 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200 font-['Outfit'] antialiased">
	<!-- Top Modern Clean Header -->
	<header class="bg-[#0c1322] border-b border-slate-800/80 sticky top-0 z-50 shadow-md">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3 group" aria-label="home">
				<div class="relative flex h-2.5 w-2.5 shrink-0">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
					<span class="relative inline-flex rounded-full bg-indigo-500 h-2.5 w-2.5"></span>
				</div>
				<div class="flex flex-col">
					<span class="text-base font-bold tracking-tight text-white">
						Specter<span class="text-indigo-400">DB</span>
					</span>
					<span class="text-xs font-mono tracking-wider text-slate-500 uppercase -mt-0.5">
						Research Portal v2.15
					</span>
				</div>
			</a>

			<!-- Navigation Links -->
			<nav class="flex items-center gap-2">
				<a 
					href="/" 
					class="px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 mr-2 flex items-center gap-1.5"
				>
					<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					Change Theme
				</a>
				<a 
					href="/modern" 
					class="px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all uppercase tracking-wider {activePath === '/modern' ? 'bg-indigo-950/40 text-indigo-400 font-bold border border-indigo-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'}"
					onclick={() => activePath = '/modern'}
				>
					Tracker
				</a>
				<a 
					href="/modern/ghosts" 
					class="px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all uppercase tracking-wider {activePath === '/modern/ghosts' ? 'bg-indigo-950/40 text-indigo-400 font-bold border border-indigo-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'}"
					onclick={() => activePath = '/modern/ghosts'}
				>
					Encyclopedia
				</a>
			</nav>
		</div>
	</header>

	<!-- Main Clean Content Area -->
	<main class="flex-grow flex flex-col relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
		{@render children?.()}
	</main>

	<!-- Footer -->
	<footer class="border-t border-slate-800/80 bg-[#0c1322] py-6 text-center text-xs text-slate-500 font-medium">
		<div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
			<p>© 2026 Specter Research Hub. All rights reserved.</p>
			<p class="font-mono text-[10px] text-slate-600">Secure Portal // Protocol v2.15</p>
		</div>
	</footer>
</div>
