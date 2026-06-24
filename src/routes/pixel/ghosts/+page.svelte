<script lang="ts">
	import { ghostData } from '$lib/data/ghostData';
	import { ghostEvidence } from '$lib/data/ghostEvidence';

	// Category specific color styles (pixel retro palette)
	const categoryStyles: Record<string, { badge: string; border: string; bg: string; text: string }> = {
		Flicker: {
			badge: 'bg-purple-950/40 text-purple-400 border-purple-800/40',
			border: 'border-purple-850',
			bg: 'bg-black',
			text: 'text-purple-400'
		},
		Imitator: {
			badge: 'bg-blue-950/40 text-blue-400 border-blue-800/40',
			border: 'border-blue-850',
			bg: 'bg-black',
			text: 'text-blue-400'
		},
		Leech: {
			badge: 'bg-rose-950/40 text-rose-400 border-rose-800/40',
			border: 'border-rose-850',
			bg: 'bg-black',
			text: 'text-rose-400'
		},
		Tormentor: {
			badge: 'bg-orange-950/40 text-orange-400 border-orange-800/40',
			border: 'border-orange-850',
			bg: 'bg-black',
			text: 'text-orange-400'
		},
		Trickster: {
			badge: 'bg-amber-950/40 text-amber-400 border-amber-800/40',
			border: 'border-amber-850',
			bg: 'bg-black',
			text: 'text-amber-400'
		}
	};

	let search = $state('');

	// Reactive filtering
	let filteredCategories = $derived(
		Object.entries(ghostData).map(([category, info]) => {
			const list = info.list.filter((name) => {
				const ev = ghostEvidence[name];
				const matchName = name.toLowerCase().includes(search.toLowerCase());
				const matchThai = ev ? ev.name.toLowerCase().includes(search.toLowerCase()) : false;
				const matchAbility = ev ? ev.ability.toLowerCase().includes(search.toLowerCase()) : false;
				const matchAbilityEn = ev && ev.abilityEn ? ev.abilityEn.toLowerCase().includes(search.toLowerCase()) : false;
				return matchName || matchThai || matchAbility || matchAbilityEn;
			});
			return { category, description: info.description, list };
		})
	);

	let totalShowing = $derived(
		filteredCategories.reduce((sum, cat) => sum + cat.list.length, 0)
	);
</script>

<div class="space-y-6 font-['VT323']">
	<!-- Database Header (Pixel Retro Style) -->
	<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-black border-4 border-double border-white p-5 rounded-none shadow-md">
		<div class="space-y-1.5">
			<h1 class="text-xl sm:text-2xl font-bold tracking-wider text-white font-['Press_Start_2P'] uppercase flex items-center gap-3">
				<svg class="h-6 w-6 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
				</svg> 
				GHOST INDEX
			</h1>
			<p class="text-[9px] sm:text-[10px] text-slate-500 font-mono tracking-wide uppercase">
				COMPREHENSIVE DOSSIERS OF ALL IDENTIFIED GHOST SPECIES.
			</p>
		</div>
		
		<!-- Search Field (Pixelated input) -->
		<div class="relative w-full md:w-80">
			<input
				bind:value={search}
				placeholder="SEARCH / ค้นหา..."
				class="w-full bg-black border-2 border-white text-white rounded-none pl-10 pr-4 py-2 font-mono text-xs placeholder:text-slate-600 focus:outline-none focus:border-green-500 transition-colors uppercase"
			/>
			<svg class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
		</div>
	</div>

	<!-- Results Stats -->
	<div class="flex items-center gap-2 font-mono text-[10px] text-slate-500 bg-black px-3 py-1.5 rounded-none border-2 border-slate-800">
		<span class="h-1.5 w-1.5 rounded-none bg-green-500 animate-pulse"></span>
		<span>DATABASE QUERY RESULTS: {totalShowing} / 30 GHOSTS</span>
	</div>

	<!-- Categories Loop -->
	{#each filteredCategories as { category, description, list }}
		{#if list.length > 0}
			{@const catStyle = categoryStyles[category]}
			
			<div class="border-4 border-double border-white bg-black p-4 sm:p-5 space-y-4 rounded-none shadow-md">
				<!-- Category Info -->
				<div class="flex flex-col sm:flex-row sm:items-baseline gap-2 pb-2.5 border-b-2 border-dashed border-slate-850">
					<h2 class={`text-xs sm:text-sm font-bold font-['Press_Start_2P'] tracking-wider ${catStyle.text}`}>
						{category.toUpperCase()}
					</h2>
					<span class="hidden sm:inline text-slate-700">//</span>
					<p class="text-xs text-slate-400 font-mono">
						{description}
					</p>
				</div>

				<!-- Grid of Ghost Cards in Category -->
				<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					{#each list as name}
						{@const ghost = ghostEvidence[name]}
						{#if ghost}
							<div class="bg-black border-2 border-slate-800 p-4 flex flex-col justify-between hover:border-white transition-colors duration-150 rounded-none group">
								<div class="space-y-4">
									<!-- Card Header -->
									<div class="flex items-center justify-between gap-3">
										<h3 class="font-bold text-sm sm:text-base tracking-wide text-white font-['Press_Start_2P'] group-hover:text-green-400 transition-colors">
											{ghost.name}
										</h3>
										<span class={`text-[8px] px-1.5 py-0.5 border-2 font-bold font-['Press_Start_2P'] tracking-wider uppercase scale-90 origin-right ${catStyle.badge}`}>
											{category}
										</span>
									</div>

									<!-- Evidences Required -->
									<div class="flex flex-wrap gap-1.5 font-mono">
										{#each ghost.evidence as ev}
											<span class="text-[9px] px-1.5 py-0.5 border-2 select-none {
												ev === 'EMF 5' ? 'bg-blue-950/45 border-blue-900 text-blue-400' :
												ev === 'Spirit Box' ? 'bg-purple-950/45 border-purple-900 text-purple-400' :
												ev === 'Ghost Orbs' ? 'bg-amber-950/45 border-amber-900 text-amber-400' :
												ev === 'Ghost Writing' ? 'bg-pink-950/45 border-pink-900 text-pink-400' :
												ev === 'Freezing' ? 'bg-cyan-950/45 border-cyan-900 text-cyan-400' :
												ev === 'Fingerprints' ? 'bg-emerald-950/45 border-emerald-900 text-emerald-400' :
												'bg-rose-950/45 border-rose-900 text-rose-400'
											}">
												{ev}
											</span>
										{/each}
									</div>

									<!-- Description from wiki -->
									{#if ghost.description}
										<p class="text-xs text-slate-400 italic leading-relaxed border-l-2 border-slate-800 pl-2.5 font-mono">
											"{ghost.description}"
										</p>
									{/if}
								</div>

								<!-- Abilities Box (Boxed) -->
								<div class="mt-4 pt-4 border-t-2 border-dashed border-slate-900 space-y-3">
									<!-- Thai ability -->
									<div class="p-2.5 bg-black border-2 border-green-500 rounded-none space-y-1">
										<span class="text-[9px] font-bold font-['Press_Start_2P'] text-green-400 uppercase scale-90 origin-left block">ความสามารถ (TH)</span>
										<p class="text-xs text-slate-200 leading-relaxed font-semibold">
											{ghost.ability}
										</p>
									</div>

									<!-- English ability from wiki -->
									{#if ghost.abilityEn}
										<div class="p-2.5 bg-black border-2 border-slate-850 rounded-none space-y-1">
											<span class="text-[9px] font-bold font-['Press_Start_2P'] text-slate-500 uppercase scale-90 origin-left block">WIKI SPEC (EN)</span>
											<p class="text-xs text-slate-400 leading-relaxed font-mono">
												{ghost.abilityEn}
											</p>
										</div>
									{/if}
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
	{/each}
</div>
