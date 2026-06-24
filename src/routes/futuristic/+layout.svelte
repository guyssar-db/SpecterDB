<script lang="ts">
	import { onMount } from 'svelte';

	let { children } = $props();
	let activePath = $state('/futuristic');

	onMount(() => {
		activePath = window.location.pathname;
	});
</script>

<div class="relative min-h-dvh bg-[#050811] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 font-['Share_Tech_Mono'] overflow-x-hidden">
	<!-- Cybertech scanning grid line -->
	<div class="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
	
	<!-- Top HUD Header -->
	<header class="border-b border-cyan-950 bg-[#050811]/90 backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
		<!-- Glowing cyber line -->
		<div class="h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full"></div>
		
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3 group" aria-label="home">
				<div class="relative flex h-3 w-3 shrink-0">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
					<span class="relative inline-flex rounded-full bg-cyan-500 h-3 w-3"></span>
				</div>
				<div class="flex flex-col">
					<span class="text-sm font-black tracking-widest text-white uppercase tracking-[0.2em]">
						SPECTER<span class="text-cyan-400">_NET</span>
					</span>
					<span class="text-[9px] tracking-wider text-cyan-600 uppercase -mt-0.5">
						FIELD TERMINAL // SECURE_LINK
					</span>
				</div>
			</a>

			<!-- Navigation Links -->
			<nav class="flex items-center gap-2">
				<a 
					href="/" 
					class="relative px-3 py-1.5 text-xs font-bold transition-all uppercase tracking-widest border border-red-950 bg-red-950/20 text-red-400 hover:text-white hover:border-red-500 hover:bg-red-900/40 mr-3 overflow-hidden group/btn"
				>
					<span class="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-red-400"></span>
					<span class="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-red-400"></span>
					← SELECT STYLE
				</a>
				<a 
					href="/futuristic" 
					class="relative px-3 py-1.5 text-xs font-bold transition-all uppercase tracking-widest border border-cyan-950 overflow-hidden group/btn {activePath === '/futuristic' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'text-slate-400 hover:text-white hover:border-cyan-800'}"
					onclick={() => activePath = '/futuristic'}
				>
					<span class="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400"></span>
					<span class="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400"></span>
					ANALYZE
				</a>
				<a 
					href="/futuristic/ghosts" 
					class="relative px-3 py-1.5 text-xs font-bold transition-all uppercase tracking-widest border border-cyan-950 overflow-hidden group/btn {activePath === '/futuristic/ghosts' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'text-slate-400 hover:text-white hover:border-cyan-800'}"
					onclick={() => activePath = '/futuristic/ghosts'}
				>
					<span class="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400"></span>
					<span class="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400"></span>
					DOSSIERS
				</a>
			</nav>
		</div>
	</header>

	<!-- Main HUD Grid Content -->
	<main class="flex-grow flex flex-col relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
		{@render children?.()}
	</main>

	<!-- Footer -->
	<footer class="border-t border-cyan-950/60 bg-[#04060d] py-4 text-center text-[10px] text-cyan-700/60 uppercase tracking-widest">
		<div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
			<p>LOC_ID: 104.992 // SYS_STATUS: OPERATIONAL</p>
			<p>CORE_CONN // ENC_LEVEL_256</p>
		</div>
	</footer>
</div>
