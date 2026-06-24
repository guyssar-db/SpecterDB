<script lang="ts">
	import { onMount } from 'svelte';

	let { children } = $props();
	let activePath = $state('/pixel');

	onMount(() => {
		activePath = window.location.pathname;
		document.addEventListener('dragstart', (e) => e.preventDefault());
	});
</script>

<div class="relative min-h-dvh bg-black text-white flex flex-col selection:bg-green-500/30 selection:text-green-200 crt-screen font-['VT323']">
	<!-- CRT flickering container wrapper -->
	<div class="flex-grow flex flex-col">
		<!-- Top Nav Bar: Retro Double Border -->
		<header class="bg-black border-b-4 border-double border-white sticky top-0 z-50">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				<!-- Logo -->
				<a href="/" class="flex items-center gap-3 group" aria-label="home">
					<span class="relative flex h-2.5 w-2.5 shrink-0">
						<span class="animate-ping absolute inline-flex h-full w-full rounded bg-red-500 opacity-75"></span>
						<span class="relative inline-flex rounded bg-red-600 h-2.5 w-2.5"></span>
					</span>
					<div class="flex flex-col">
						<span class="text-sm sm:text-base font-bold tracking-wider text-white font-['Press_Start_2P'] uppercase">
							SPECTER<span class="text-red-500">DB</span>
						</span>
						<span class="text-xs font-mono tracking-widest text-slate-500 uppercase -mt-0.5">
							GHOST TRACKER v2.15 [PIXEL]
						</span>
					</div>
				</a>

				<!-- Navigation Links -->
				<nav class="flex items-center gap-1 sm:gap-2">
					<a 
						href="/" 
						class="px-2.5 py-1.5 text-xs sm:text-sm font-['Press_Start_2P'] transition-all border-2 border-red-700 bg-red-950/20 text-red-500 hover:bg-red-600 hover:text-white mr-3 uppercase animate-pulse"
					>
						EXIT
					</a>
					<a 
						href="/pixel" 
						class="px-2.5 py-1.5 text-xs sm:text-sm font-['Press_Start_2P'] transition-all border-2 uppercase {activePath === '/pixel' ? 'bg-white text-black border-white' : 'border-transparent text-slate-400 hover:text-white'}"
						onclick={() => activePath = '/pixel'}
					>
						JOURNAL
					</a>
					<a 
						href="/pixel/ghosts" 
						class="px-2.5 py-1.5 text-xs sm:text-sm font-['Press_Start_2P'] transition-all border-2 uppercase {activePath === '/pixel/ghosts' ? 'bg-white text-black border-white' : 'border-transparent text-slate-400 hover:text-white'}"
						onclick={() => activePath = '/pixel/ghosts'}
					>
						INDEX
					</a>
				</nav>
			</div>
		</header>

		<!-- Main Content Area -->
		<main class="flex-grow flex flex-col relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
			{@render children?.()}
		</main>

		<!-- Footer -->
		<footer class="border-t-4 border-double border-white bg-black py-4 text-center text-[10px] sm:text-xs font-['Press_Start_2P'] text-slate-500">
			<div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
				<p>SPECTER_DB // RETRO SYS 1998</p>
				<p>SECURE TERMINAL // CRT DISPLAY</p>
			</div>
		</footer>
	</div>
</div>
