<script lang="ts">
	import { selectedTypes, includeEvidence, excludeEvidence, hiddenGhosts } from '$lib/stores/ghost';
	import { ghostData } from '$lib/data/ghostData';
	import { ghostEvidence } from '$lib/data/ghostEvidence';
	import { evidenceIcons, evidences } from '$lib/data/evidenceColors';
	import { onMount } from 'svelte';

	// Modern Category Badges (Dark Mode Variants)
	const categoryColors: Record<string, { badge: string; text: string }> = {
		Flicker: { badge: 'bg-purple-950/40 text-purple-400 border-purple-900/40', text: 'text-purple-400' },
		Imitator: { badge: 'bg-blue-950/40 text-blue-400 border-blue-900/40', text: 'text-blue-400' },
		Leech: { badge: 'bg-rose-950/40 text-rose-400 border-rose-900/40', text: 'text-rose-400' },
		Tormentor: { badge: 'bg-orange-950/40 text-orange-400 border-orange-900/40', text: 'text-orange-400' },
		Trickster: { badge: 'bg-amber-950/40 text-amber-400 border-amber-900/40', text: 'text-amber-400' }
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

<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-slate-350">
	<!-- Left: Controls -->
	<div class="lg:col-span-5 space-y-4">
		<!-- Analyzer Box -->
		<div class="bg-[#0c1322] border border-slate-800/80 p-5 rounded-2xl shadow-md space-y-4">
			<!-- Header -->
			<div class="flex items-center justify-between border-b border-slate-800/50 pb-3">
				<h2 class="text-base font-bold tracking-tight text-white flex items-center gap-2">
					<svg class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
					</svg>
					Evidence Analyzer
				</h2>
				
				<button 
					onclick={resetAll}
					class="px-4 py-2 bg-slate-800/60 hover:bg-slate-700/80 text-slate-200 text-sm font-semibold rounded-lg transition-colors active:scale-95 flex items-center gap-1.5 flex-shrink-0"
				>
					<svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
					</svg>
					Reset
				</button>
			</div>

			<!-- Evidences Grid -->
			<div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
				{#each evidences as ev}
					{@const isIncluded = $includeEvidence.has(ev)}
					{@const isExcluded = $excludeEvidence.has(ev)}
					
					<button
						class="relative flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all duration-150 select-none text-center {
							isIncluded 
								? 'bg-indigo-950/40 border-indigo-500 text-indigo-400 shadow-sm' 
								: isExcluded 
									? 'bg-slate-900/60 border-slate-800/40 text-slate-500 opacity-50' 
									: 'bg-[#080d16] border-slate-800/85 text-slate-400 hover:border-slate-700 hover:bg-[#0c1322]/80'
						}"
						onclick={() => toggleEvidence(ev)}
						oncontextmenu={(e) => { e.preventDefault(); toggleEvidence(ev, true); }}
					>
						<!-- Clean status indicator -->
						{#if isIncluded}
							<div class="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-550"></div>
						{:else if isExcluded}
							<div class="absolute top-2 right-2 h-2 w-2 rounded-full bg-slate-500"></div>
						{/if}

						<img
							src={`/${evidenceIcons[ev] ?? `${ev}.webp`}`}
							alt={ev}
							class="h-10 w-10 object-contain mb-1.5 transition-opacity duration-150 {isIncluded ? 'opacity-100' : isExcluded ? 'opacity-20' : 'opacity-60'}"
						/>
						<span class="text-xs sm:text-sm font-semibold tracking-tight uppercase leading-none truncate max-w-full font-sans" class:line-through={isExcluded}>
							{ev}
						</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Categories filter -->
		<div class="bg-[#0c1322] border border-slate-800/80 p-5 rounded-2xl shadow-md space-y-4">
			<div class="flex items-center justify-between border-b border-slate-800/50 pb-3">
				<h2 class="text-base font-bold tracking-tight text-white">
					Categories Filter
				</h2>
				<div class="flex gap-2 text-sm font-semibold">
					<button onclick={selectAllCategories} class="text-indigo-400 hover:text-indigo-300 transition">Select All</button>
					<span class="text-slate-700">|</span>
					<button onclick={clearAllCategories} class="text-slate-500 hover:text-slate-400 transition">Clear</button>
				</div>
			</div>

			<div class="flex flex-wrap gap-2">
				{#each Object.keys(ghostData) as type}
					{@const isSelected = $selectedTypes.includes(type)}
					<button
						onclick={() => toggleGhostType(type)}
						class="px-4 py-2 rounded-full text-sm font-semibold border transition-all {
							isSelected 
								? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
								: 'bg-[#080d16] border-slate-800 text-slate-400 hover:border-slate-700'
						}"
					>
						{type}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Right: Results -->
	<div class="lg:col-span-7 space-y-4">
		<!-- Log status bar -->
		<div class="flex items-center justify-between bg-[#0c1322] border border-slate-800/80 p-4 rounded-2xl shadow-md">
			<div class="flex items-center gap-2">
				<span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Results:</span>
				<span class="text-sm font-bold text-indigo-400 bg-indigo-950/40 border border-indigo-900/50 px-2.5 py-1 rounded-lg">
					{activeGhostsCount} Eligible Species
				</span>
			</div>
			<span class="text-sm font-medium text-emerald-400 bg-emerald-950/30 px-2.5 py-1 rounded-lg border border-emerald-900/50 flex items-center gap-1.5">
				<span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
				Live Sync
			</span>
		</div>

		<!-- Dossiers list -->
		<div class="space-y-3 max-h-[720px] overflow-y-auto pr-1">
			{#if activeGhostsCount === 0}
				<div class="flex flex-col items-center justify-center p-12 text-center border border-slate-800/80 bg-[#0c1322] rounded-2xl shadow-md space-y-2">
					<svg class="h-10 w-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<h3 class="text-base font-bold text-slate-300 tracking-tight">No Matching Species</h3>
					<p class="text-sm text-slate-550 max-w-xs leading-relaxed">กรุณาปรับแต่งเบาะแสหลักฐานเพื่อให้สอดคล้องกับพฤติกรรมของผี</p>
				</div>
			{:else}
				{#each renderedGhosts as { type, data, list }}
					{#each list as ghostKey}
						{@const ghost = ghostEvidence[ghostKey]}
						{#if ghost}
							{@const isExpanded = expandedGhosts.has(ghostKey)}
							{@const catStyle = categoryColors[type]}
							
							<div class="bg-[#0c1322] border border-slate-800/80 transition-all rounded-2xl shadow-md overflow-hidden {
								isExpanded ? 'ring-1 ring-indigo-500/20 border-indigo-500/40' : ''
							}">
								<!-- Header Row -->
								<div class="flex items-center justify-between p-4 gap-3">
									<button 
										onclick={() => toggleExpand(ghostKey)}
										class="flex-grow flex items-center justify-between gap-4 text-left"
									>
										<div class="flex items-center gap-2.5 truncate font-sans">
											<span class="font-bold text-lg tracking-tight text-white group-hover:text-indigo-400 transition-colors uppercase">
												{ghost.name}
											</span>
											<span class="text-xs px-2.5 py-1 rounded-md border font-semibold uppercase tracking-wider {catStyle.badge}">
												{type}
											</span>
										</div>

										<!-- Evidence tags -->
										<div class="hidden sm:flex items-center gap-1.5 font-sans">
											{#each ghost.evidence as ev}
												{@const inc = $includeEvidence.has(ev)}
												{@const ex = $excludeEvidence.has(ev)}
												<span class="text-xs px-2.5 py-1 rounded-md border transition-colors select-none font-semibold {
													inc 
														? 'bg-indigo-950/40 border-indigo-905 text-indigo-400 font-bold' 
														: ex 
															? 'bg-slate-900/30 border-slate-800/50 text-slate-650 line-through font-normal' 
															: 'bg-[#080d16] border-slate-800/80 text-slate-500'
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
														inc ? 'bg-indigo-500' : ex ? 'bg-slate-600' : 'bg-slate-800'
													}"></span>
												{/each}
											</div>
										{/if}

										<button
											onclick={() => toggleHideGhost(ghostKey)}
											title="Eliminate from list"
											class="p-1 h-7 w-7 rounded-lg border border-slate-800 bg-[#080d16] hover:bg-rose-950/30 hover:border-rose-900/50 text-slate-550 hover:text-rose-450 flex items-center justify-center transition-all active:scale-95"
										>
											<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
												<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
								</div>

								<!-- Accordion Details -->
								{#if isExpanded}
									<div class="px-5 pb-5 pt-2 border-t border-slate-800/60 bg-[#080d16]/30 space-y-4 animate-fadeIn">
										<div class="flex sm:hidden flex-wrap gap-1 py-1 border-b border-slate-800/50">
											{#each ghost.evidence as ev}
												{@const inc = $includeEvidence.has(ev)}
												{@const ex = $excludeEvidence.has(ev)}
												<span class="text-xs px-2.5 py-1 rounded-md border font-semibold {
													inc 
														? 'bg-indigo-950/40 border-indigo-900 text-indigo-400' 
														: ex 
															? 'bg-slate-900/30 border-slate-800/55 text-slate-600 line-through' 
															: 'bg-[#080d16] border-slate-850 text-slate-500'
												}">
													{ev}
												</span>
											{/each}
										</div>

										{#if ghost.description}
											<div class="space-y-1">
												<span class="text-xs font-bold text-slate-500 tracking-wider uppercase block">Species Lore</span>
												<p class="text-sm sm:text-base text-slate-400 leading-relaxed italic border-l-3 border-slate-800 pl-3">
													"{ghost.description}"
												</p>
											</div>
										{/if}

										<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
											<!-- Thai ability -->
											<div class="p-3.5 bg-emerald-950/20 border border-emerald-900/50 rounded-xl space-y-1">
												<span class="text-xs font-bold text-emerald-400 uppercase tracking-wider block font-sans">ความสามารถพิเศษ (TH)</span>
												<p class="text-sm sm:text-base text-emerald-355 leading-relaxed font-semibold font-sans font-medium">
													{ghost.ability || 'ไม่มีข้อมูลความสามารถเพิ่มเติม'}
												</p>
											</div>

											<!-- English specifications -->
											{#if ghost.abilityEn}
												<div class="p-3.5 bg-[#080d16] border border-slate-800/80 rounded-xl space-y-1">
													<span class="text-xs font-bold text-slate-500 uppercase tracking-wider block font-sans">Technical Ability (EN)</span>
													<p class="text-sm sm:text-base text-slate-400 leading-relaxed font-mono">
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
			<div class="bg-[#0c1322] border border-slate-800/80 rounded-2xl overflow-hidden shadow-md">
				<button 
					onclick={() => showEliminatedSection = !showEliminatedSection}
					class="w-full p-4 flex items-center justify-between text-left hover:bg-slate-850/20 transition-colors"
				>
					<div class="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
						<span>Eliminated Species ({eliminatedGhosts.length})</span>
					</div>
					<svg class="h-4 w-4 text-slate-500 transition-transform duration-300" class:rotate-180={showEliminatedSection} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{#if showEliminatedSection}
					<div class="p-4 pt-0 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fadeIn bg-[#080d16]/30">
						{#each eliminatedGhosts as ghost}
							<div class="flex items-center justify-between p-3 rounded-xl bg-[#0c1322] border border-slate-800">
								<span class="text-xs font-bold text-slate-500 line-through truncate max-w-[65%]">{ghost.name}</span>
								<button
									onclick={() => toggleHideGhost(ghost.key)}
									class="text-[10px] font-bold px-3 py-1.5 bg-slate-900 hover:bg-indigo-950 hover:text-indigo-400 rounded-lg border border-slate-800 hover:border-indigo-900 transition-all duration-150"
								>
									Restore
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
