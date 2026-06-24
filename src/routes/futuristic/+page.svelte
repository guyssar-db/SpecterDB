<script lang="ts">
	import { selectedTypes, includeEvidence, excludeEvidence, hiddenGhosts } from '$lib/stores/ghost';
	import { ghostData } from '$lib/data/ghostData';
	import { ghostEvidence } from '$lib/data/ghostEvidence';
	import { evidenceIcons, evidences } from '$lib/data/evidenceColors';
	import { onMount } from 'svelte';

	// Futuristic Category Colors
	const categoryColors: Record<string, { badge: string; text: string; glow: string }> = {
		Flicker: { badge: 'bg-purple-950/30 text-purple-400 border-purple-900/40', text: 'text-purple-400', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)]' },
		Imitator: { badge: 'bg-blue-950/30 text-blue-400 border-blue-900/40', text: 'text-blue-400', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]' },
		Leech: { badge: 'bg-rose-950/30 text-rose-400 border-rose-900/40', text: 'text-rose-400', glow: 'shadow-[0_0_15px_rgba(244,63,94,0.15)]' },
		Tormentor: { badge: 'bg-orange-950/30 text-orange-400 border-orange-900/40', text: 'text-orange-400', glow: 'shadow-[0_0_15px_rgba(249,115,22,0.15)]' },
		Trickster: { badge: 'bg-amber-950/30 text-amber-400 border-amber-900/40', text: 'text-amber-400', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]' }
	};

	let expandedGhosts = $state<Set<string>>(new Set());
	let showEliminatedSection = $state(false);

	function toggleGhostType(type: string) {
		selectedTypes.update((curr) =>
			curr.includes(type) ? curr.filter((t) => t !== type) : [...curr, type]
		);
	}

	function selectAllCategories() {
		selectedTypes.set(Object.keys(ghostData));
	}

	function clearAllCategories() {
		selectedTypes.set([]);
	}

	function toggleEvidence(ev: string, rightClick = false) {
		if (rightClick) {
			excludeEvidence.update((ex) => {
				const nextEx = new Set(ex);
				includeEvidence.update((inc) => {
					const nextInc = new Set(inc);
					nextInc.delete(ev);
					return nextInc;
				});
				if (nextEx.has(ev)) nextEx.delete(ev);
				else nextEx.add(ev);
				return nextEx;
			});
		} else {
			includeEvidence.update((inc) => {
				excludeEvidence.update((ex) => {
					if (!inc.has(ev) && !ex.has(ev)) {
						inc.add(ev);
					} else if (inc.has(ev)) {
						inc.delete(ev);
						ex.add(ev);
					} else {
						ex.delete(ev);
					}
					return new Set(ex);
				});
				return new Set(inc);
			});
		}
	}

	function toggleHideGhost(ghostKey: string) {
		hiddenGhosts.update((curr) => {
			const next = new Set(curr);
			if (next.has(ghostKey)) next.delete(ghostKey);
			else next.add(ghostKey);
			return next;
		});
	}

	function resetAll() {
		selectedTypes.set(Object.keys(ghostData));
		includeEvidence.set(new Set());
		excludeEvidence.set(new Set());
		hiddenGhosts.set(new Set());
		expandedGhosts = new Set();
	}

	function toggleExpand(ghostKey: string) {
		if (expandedGhosts.has(ghostKey)) {
			expandedGhosts.delete(ghostKey);
		} else {
			expandedGhosts.add(ghostKey);
		}
		expandedGhosts = new Set(expandedGhosts);
	}

	let renderedGhosts = $derived(
		$selectedTypes.map((type) => {
			const data = ghostData[type];
			const filteredList = data.list.filter((g) => {
				if ($hiddenGhosts.has(g)) return false;
				const ev = ghostEvidence[g]?.evidence || [];
				if (![...$includeEvidence].every((e) => ev.includes(e))) return false;
				if ([...$excludeEvidence].some((e) => ev.includes(e))) return false;
				return true;
			});
			return { type, data, list: filteredList };
		})
	);

	let activeGhostsCount = $derived(
		renderedGhosts.reduce((sum, item) => sum + item.list.length, 0)
	);

	let eliminatedGhosts = $derived(
		Object.entries(ghostEvidence)
			.filter(([key]) => $hiddenGhosts.has(key))
			.map(([key, value]) => ({ key, ...value }))
	);

	onMount(() => {
		if ($selectedTypes.length === 0) {
			selectedTypes.set(Object.keys(ghostData));
		}
	});
</script>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
	<!-- Left: Controls -->
	<div class="lg:col-span-5 space-y-4">
		<!-- Analyzer Box -->
		<div class="bg-[#0b1220]/50 border border-cyan-950 p-4 rounded-none space-y-4 shadow-[0_0_20px_rgba(6,182,212,0.02)] relative overflow-hidden">
			<!-- Corner tech indicators -->
			<span class="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-500"></span>
			<span class="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyan-500"></span>

			<!-- Header -->
			<div class="flex items-center justify-between border-b border-cyan-950 pb-2">
				<h2 class="text-sm font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-2">
					<span class="h-1.5 w-1.5 bg-cyan-500 animate-pulse"></span>
					ANALYSIS_UNIT_01
				</h2>
				
				<button 
					onclick={resetAll}
					class="px-4 py-1.5 border border-cyan-600 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-500 hover:text-black text-xs font-bold uppercase tracking-wider transition-all duration-150 active:scale-95 rounded-none"
				>
					RESET_SYS
				</button>
			</div>

			<!-- Evidences Grid -->
			<div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
				{#each evidences as ev}
					{@const isIncluded = $includeEvidence.has(ev)}
					{@const isExcluded = $excludeEvidence.has(ev)}
					
					<button
						class="relative flex flex-col items-center justify-center p-3.5 rounded-none border transition-all duration-150 select-none text-center {
							isIncluded 
								? 'bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]' 
								: isExcluded 
									? 'bg-rose-950/25 border-rose-600 text-rose-500 opacity-50' 
									: 'bg-[#060b13]/80 border-slate-900 text-slate-550 hover:border-cyan-800/60 hover:text-slate-300'
						}"
						onclick={() => toggleEvidence(ev)}
						oncontextmenu={(e) => { e.preventDefault(); toggleEvidence(ev, true); }}
					>
						<!-- Cyber glow dot -->
						<div class="absolute top-2 right-2 h-1.5 w-1.5 {
							isIncluded ? 'bg-cyan-400' : isExcluded ? 'bg-rose-500' : 'bg-transparent'
						}"></div>

						<img
							src={`/${evidenceIcons[ev] ?? `${ev}.webp`}`}
							alt={ev}
							class="h-10 w-10 object-contain mb-1.5 transition-opacity duration-150 {isIncluded ? 'opacity-100 brightness-125' : isExcluded ? 'opacity-20' : 'opacity-55'}"
						/>
						<span class="text-xs font-bold tracking-tight uppercase leading-none truncate max-w-full" class:line-through={isExcluded}>
							{ev}
						</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Categories filter -->
		<div class="bg-[#0b1220]/50 border border-cyan-950 p-4 rounded-none space-y-3 shadow-[0_0_20px_rgba(6,182,212,0.02)] relative">
			<!-- Corner tech indicators -->
			<span class="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-500"></span>
			<span class="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyan-500"></span>

			<div class="flex items-center justify-between border-b border-cyan-950 pb-2">
				<h2 class="text-sm font-bold tracking-widest text-cyan-400 uppercase">
					SECTOR_FILTER
				</h2>
				<div class="flex gap-2 text-xs">
					<button onclick={selectAllCategories} class="text-cyan-400 hover:text-cyan-300 transition">[ALL]</button>
					<span class="text-cyan-950">|</span>
					<button onclick={clearAllCategories} class="text-slate-500 hover:text-slate-400 transition">[NONE]</button>
				</div>
			</div>

			<div class="flex flex-wrap gap-2">
				{#each Object.keys(ghostData) as type}
					{@const isSelected = $selectedTypes.includes(type)}
					<button
						onclick={() => toggleGhostType(type)}
						class="px-3.5 py-1.5 rounded-none text-xs font-bold border transition-colors {
							isSelected 
								? 'bg-cyan-950/40 border-cyan-500 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.15)]' 
								: 'bg-[#060b13]/85 border-slate-900 text-slate-500 hover:border-slate-800 hover:text-slate-350'
						}"
					>
						{type.toUpperCase()}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Right: Results -->
	<div class="lg:col-span-7 space-y-4 font-mono">
		<!-- Log status bar -->
		<div class="flex items-center justify-between bg-[#0b1220]/50 border border-cyan-950 p-3 px-4 rounded-none relative">
			<span class="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></span>
			<span class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></span>
			
			<div class="flex items-center gap-2">
				<span class="text-sm text-slate-500 uppercase tracking-widest">FEED_STREAM:</span>
				<span class="text-sm font-bold text-cyan-400 bg-cyan-950/30 px-2.5 py-1 border border-cyan-900/50">
					{activeGhostsCount} TELEMETRIES_FOUND
				</span>
			</div>
			<span class="text-xs text-cyan-700/60 uppercase">CONN_SECURE</span>
		</div>

		<!-- Dossiers list -->
		<div class="space-y-2 max-h-[720px] overflow-y-auto pr-1">
			{#if activeGhostsCount === 0}
				<div class="flex flex-col items-center justify-center p-12 text-center border border-cyan-950 bg-[#0b1220]/20 relative">
					<span class="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></span>
					<span class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></span>
					<svg class="h-8 w-8 text-rose-500 mb-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
					<h3 class="text-sm font-bold text-slate-350 tracking-widest">NO TELEMETRY MATCH</h3>
					<p class="text-xs text-slate-500 max-w-xs leading-relaxed mt-1">ข้อมูลวิจัยไม่พบความเชื่อมโยงกับผีตัวใดในฐานระบบ กรุณาตรวจสอบหลักฐานอีกครั้ง</p>
				</div>
			{:else}
				{#each renderedGhosts as { type, data, list }}
					{#each list as ghostKey}
						{@const ghost = ghostEvidence[ghostKey]}
						{#if ghost}
							{@const isExpanded = expandedGhosts.has(ghostKey)}
							{@const catStyle = categoryColors[type]}
							
							<div class="border transition-all duration-150 rounded-none relative {
								isExpanded 
									? 'bg-[#0f172a]/80 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
									: 'bg-[#0b1220]/40 border-slate-900 hover:border-slate-800'
							}">
								<!-- Corner light details for expanded -->
								{#if isExpanded}
									<span class="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400"></span>
									<span class="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400"></span>
								{/if}

								<!-- Header -->
								<div class="flex items-center justify-between p-3 gap-2">
									<button 
										onclick={() => toggleExpand(ghostKey)}
										class="flex-grow flex items-center justify-between gap-4 text-left"
									>
										<div class="flex items-center gap-3 truncate">
											<span class="font-bold text-base sm:text-lg tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase">
												{ghost.name}
											</span>
											<span class="text-xs px-2 py-0.5 border font-semibold tracking-wider uppercase {catStyle.badge}">
												{type}
											</span>
										</div>

										<!-- Evidence tags -->
										<div class="hidden sm:flex items-center gap-1.5">
											{#each ghost.evidence as ev}
												{@const inc = $includeEvidence.has(ev)}
												{@const ex = $excludeEvidence.has(ev)}
												<span class="text-xs px-2 py-0.5 border transition-colors select-none {
													inc 
														? 'bg-cyan-950/40 border-cyan-500 text-cyan-400 font-bold' 
														: ex 
															? 'bg-rose-950/20 border-rose-900/40 text-rose-500/40 line-through' 
															: 'bg-[#060b13]/60 border-slate-900 text-slate-500'
												}">
													{ev}
												</span>
											{/each}
										</div>
									</button>

									<div class="flex items-center gap-2 shrink-0">
										{#if !isExpanded}
											<div class="flex sm:hidden gap-1 scale-90 pr-1">
												{#each ghost.evidence as ev}
													{@const inc = $includeEvidence.has(ev)}
													{@const ex = $excludeEvidence.has(ev)}
													<span class="h-1.5 w-1.5 rounded-full {
														inc ? 'bg-cyan-400' : ex ? 'bg-rose-500' : 'bg-slate-800'
													}"></span>
												{/each}
											</div>
										{/if}

										<button
											onclick={() => toggleHideGhost(ghostKey)}
											title="Eliminate from tracker"
											class="p-1.5 h-8 w-8 rounded-none border border-slate-900 bg-[#060b13]/80 hover:bg-rose-950/30 hover:border-rose-600 text-slate-500 hover:text-rose-400 flex items-center justify-center transition-all active:scale-95"
										>
											<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
												<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
								</div>

								<!-- Accordion Details -->
								{#if isExpanded}
									<div class="px-4 pb-4 pt-2 border-t border-cyan-950/60 space-y-3.5 animate-fadeIn">
										<div class="flex sm:hidden flex-wrap gap-1 py-1 border-b border-cyan-950/40">
											{#each ghost.evidence as ev}
												{@const inc = $includeEvidence.has(ev)}
												{@const ex = $excludeEvidence.has(ev)}
												<span class="text-xs px-2 py-0.5 border {
													inc 
														? 'bg-cyan-950/40 border-cyan-500 text-cyan-400 font-bold' 
														: ex 
															? 'bg-rose-950/20 border-rose-900/40 text-rose-500/40 line-through' 
															: 'bg-[#060b13]/60 border-slate-900 text-slate-500'
												}">
													{ev}
												</span>
											{/each}
										</div>

										{#if ghost.description}
											<div class="space-y-0.5">
												<span class="text-xs font-bold text-slate-550 tracking-wider uppercase block">FILE DESCRIPTION</span>
												<p class="text-sm sm:text-base text-slate-400 leading-relaxed italic border-l-2 border-cyan-950 pl-2.5">
													"{ghost.description}"
												</p>
											</div>
										{/if}

										<div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
											<!-- Thai ability -->
											<div class="p-3.5 bg-[#050811] border border-cyan-800/50 rounded-none space-y-1 relative">
												<span class="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400"></span>
												<span class="text-xs font-bold text-cyan-400 uppercase tracking-widest block font-sans">ความสามารถพิเศษ (TH)</span>
												<p class="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
													{ghost.ability || 'ไม่มีข้อมูลความสามารถเพิ่มเติม'}
												</p>
											</div>

											<!-- English specifications -->
											{#if ghost.abilityEn}
												<div class="p-3.5 bg-[#050811] border border-slate-900 rounded-none space-y-1 relative">
													<span class="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-slate-650"></span>
													<span class="text-xs font-bold text-slate-500 uppercase tracking-widest block">TELEMETRY STATS (EN)</span>
													<p class="text-sm sm:text-base text-slate-400 leading-relaxed">
														{ghost.abilityEn}
													</p>
												</div>
											{/if}
										</div>
									</div>
								{/if}
							</div>
						{/if}
					{/each}
				{/each}
			{/if}
		</div>

		<!-- Eliminated Drawer -->
		{#if eliminatedGhosts.length > 0}
			<div class="bg-[#0b1220]/50 border border-cyan-950 rounded-none overflow-hidden relative">
				<span class="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></span>
				<span class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></span>
				
				<button 
					onclick={() => showEliminatedSection = !showEliminatedSection}
					class="w-full p-3 flex items-center justify-between text-left hover:bg-cyan-950/10 transition-colors"
				>
					<div class="flex items-center gap-2 text-[10px] text-cyan-500 font-bold uppercase tracking-widest">
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
						<span>ELIMINATED DOSSIERS ({eliminatedGhosts.length})</span>
					</div>
					<svg class="h-3 w-3 text-cyan-500 transition-transform duration-300" class:rotate-180={showEliminatedSection} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{#if showEliminatedSection}
					<div class="p-3 pt-0 border-t border-cyan-950 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fadeIn font-mono">
						{#each eliminatedGhosts as ghost}
							<div class="flex items-center justify-between p-2.5 rounded-none bg-[#050811] border border-slate-900">
								<span class="text-sm font-bold text-slate-500 line-through truncate max-w-[65%] uppercase">{ghost.name}</span>
								<button
									onclick={() => toggleHideGhost(ghost.key)}
									class="text-xs font-bold px-3 py-1.5 bg-[#050811] hover:bg-cyan-500 hover:text-black text-cyan-400 rounded-none border border-cyan-800 transition-all duration-150"
								>
									RESTORE
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-3px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.animate-fadeIn {
		animation: fadeIn 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
</style>
