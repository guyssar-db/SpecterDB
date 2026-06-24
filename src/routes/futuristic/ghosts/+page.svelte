<script lang="ts">
	import { ghostData } from '$lib/data/ghostData';
	import { ghostEvidence } from '$lib/data/ghostEvidence';

	// Futuristic Category styles
	const categoryStyles: Record<string, { badge: string; text: string; bg: string; border: string }> = {
		Flicker: {
			badge: 'bg-purple-950/30 text-purple-400 border-purple-900/40',
			text: 'text-purple-450',
			bg: 'bg-[#0b1220]/45',
			border: 'border-purple-950/60'
		},
		Imitator: {
			badge: 'bg-blue-950/30 text-blue-400 border-blue-900/40',
			text: 'text-blue-450',
			bg: 'bg-[#0b1220]/45',
			border: 'border-blue-950/60'
		},
		Leech: {
			badge: 'bg-rose-950/30 text-rose-400 border-rose-900/40',
			text: 'text-rose-450',
			bg: 'bg-[#0b1220]/45',
			border: 'border-rose-950/60'
		},
		Tormentor: {
			badge: 'bg-orange-950/30 text-orange-400 border-orange-900/40',
			text: 'text-orange-450',
			bg: 'bg-[#0b1220]/45',
			border: 'border-orange-950/60'
		},
		Trickster: {
			badge: 'bg-amber-950/30 text-amber-400 border-amber-900/40',
			text: 'text-amber-450',
			bg: 'bg-[#0b1220]/45',
			border: 'border-amber-950/60'
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

<div class="space-y-6">
	<!-- Database Header -->
	<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#0b1220]/50 border border-cyan-950 p-5 rounded-none shadow-[0_0_25px_rgba(6,182,212,0.02)] relative">
		<span class="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-500"></span>
		<span class="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyan-500"></span>

		<div class="space-y-1">
			<h1 class="text-lg sm:text-xl font-bold tracking-widest text-white uppercase flex items-center gap-2.5">
				<svg class="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
				</svg> 
				DATABASE_QUERY_PANEL
			</h1>
			<p class="text-[9px] text-cyan-600 tracking-wider uppercase font-mono">
				SYSTEM DOSSIERS // FULL SPECIES REGISTRY
			</p>
		</div>
		
		<!-- Search Field -->
		<div class="relative w-full md:w-80">
			<input
				bind:value={search}
				placeholder="SEARCH SPECIES..."
				class="w-full bg-[#050811] border border-cyan-950 text-white rounded-none pl-10 pr-4 py-2 font-mono text-xs placeholder:text-cyan-900 focus:outline-none focus:border-cyan-500 transition-colors uppercase"
			/>
			<svg class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
		</div>
	</div>

	<!-- Stats Indicator -->
	<div class="flex items-center gap-2 font-mono text-[10px] text-cyan-700 bg-[#0b1220]/20 px-3 py-1.5 rounded-none border border-cyan-950/60 relative">
		<span class="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-700"></span>
		<span class="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
		<span>GHOST_DENSITY: {totalShowing} / 30 TELEMETRIES_ACTIVE</span>
	</div>

	<!-- Categories -->
	{#each filteredCategories as { category, description, list }}
		{#if list.length > 0}
			{@const catStyle = categoryStyles[category]}
			
			<div class="border border-cyan-950 bg-[#070b13]/60 p-4 sm:p-5 space-y-4 rounded-none relative">
				<span class="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></span>
				<span class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></span>

				<!-- Header -->
				<div class="flex flex-col sm:flex-row sm:items-baseline gap-2 pb-2 border-b border-cyan-950/40">
					<h2 class={`text-xs sm:text-sm font-bold tracking-widest uppercase ${catStyle.text}`}>
						{category.toUpperCase()}
					</h2>
					<span class="hidden sm:inline text-cyan-950">//</span>
					<p class="text-xs text-slate-500 font-mono font-bold">
						{description}
					</p>
				</div>

				<!-- Grid -->
				<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					{#each list as name}
						{@const ghost = ghostEvidence[name]}
						{#if ghost}
							<div class="bg-[#0b1220]/50 border border-slate-900 p-4 flex flex-col justify-between hover:border-cyan-500 transition-all duration-150 rounded-none relative group hover:shadow-[0_0_15px_rgba(6,182,212,0.06)]">
								<div class="space-y-4">
									<!-- Card Header -->
									<div class="flex items-center justify-between gap-3">
										<h3 class="font-bold text-sm sm:text-base tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase">
											{ghost.name}
										</h3>
										<span class={`text-[8px] px-2 py-0.5 border font-semibold tracking-wider uppercase scale-90 origin-right ${catStyle.badge}`}>
											{category}
										</span>
									</div>

									<!-- Evidences Required -->
									<div class="flex flex-wrap gap-1.5 font-mono">
										{#each ghost.evidence as ev}
											<span class="text-[9px] px-1.5 py-0.5 border select-none {
												ev === 'EMF 5' ? 'bg-blue-950/20 border-blue-900 text-blue-400' :
												ev === 'Spirit Box' ? 'bg-purple-950/20 border-purple-900 text-purple-400' :
												ev === 'Ghost Orbs' ? 'bg-amber-950/20 border-amber-900 text-amber-400' :
												ev === 'Ghost Writing' ? 'bg-pink-950/20 border-pink-900 text-pink-400' :
												ev === 'Freezing' ? 'bg-cyan-950/20 border-cyan-900 text-cyan-400' :
												ev === 'Fingerprints' ? 'bg-emerald-950/20 border-emerald-900 text-emerald-400' :
												'bg-rose-950/20 border-rose-900 text-rose-400'
											}">
												{ev}
											</span>
										{/each}
									</div>

									<!-- Description -->
									{#if ghost.description}
										<p class="text-xs text-slate-400 italic leading-relaxed border-l-2 border-cyan-950/40 pl-2.5 font-mono">
											"{ghost.description}"
										</p>
									{/if}
								</div>

								<!-- Abilities Box -->
								<div class="mt-4 pt-4 border-t border-cyan-950/60 space-y-3">
									<!-- Thai ability -->
									<div class="p-2.5 bg-[#050811] border border-cyan-900/60 rounded-none space-y-1 relative">
										<span class="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400"></span>
										<span class="text-[9px] font-bold text-cyan-400 uppercase tracking-widest block font-sans">ความสามารถพิเศษ (TH)</span>
										<p class="text-xs text-slate-200 leading-relaxed font-sans">
											{ghost.ability}
										</p>
									</div>

									<!-- English ability -->
									{#if ghost.abilityEn}
										<div class="p-2.5 bg-[#050811] border border-slate-900 rounded-none space-y-1 relative">
											<span class="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-slate-700"></span>
											<span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">TELEMETRY STATS (EN)</span>
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
