<script lang="ts">
	import { selectedTypes, includeEvidence, excludeEvidence, hiddenGhosts } from '$lib/stores/ghost';
	import { ghostData } from '$lib/data/ghostData';
	import { ghostEvidence } from '$lib/data/ghostEvidence';
	import { evidenceIcons, evidences } from '$lib/data/evidenceColors';
	import { onMount } from 'svelte';

	// Compact Category specific color styles
	const categoryColors: Record<string, { badge: string; text: string }> = {
		Flicker: { badge: 'bg-purple-950/40 text-purple-400 border-purple-800/40', text: 'text-purple-400' },
		Imitator: { badge: 'bg-blue-950/40 text-blue-400 border-blue-800/40', text: 'text-blue-400' },
		Leech: { badge: 'bg-rose-950/40 text-rose-400 border-rose-800/40', text: 'text-rose-400' },
		Tormentor: { badge: 'bg-orange-950/40 text-orange-400 border-orange-800/40', text: 'text-orange-400' },
		Trickster: { badge: 'bg-amber-950/40 text-amber-400 border-amber-800/40', text: 'text-amber-400' }
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

	// Reactive derived states
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
	<!-- Left Panel: Analyzer Controls (4 Cols) -->
	<div class="lg:col-span-5 space-y-4 font-['VT323']">
		<!-- Analyzer Box (Retro Double Border & Sharp Corners) -->
		<div class="bg-black border-4 border-double border-white p-4 rounded-none space-y-4 shadow-md">
			<!-- Header -->
			<div class="flex items-center justify-between border-b-2 border-dashed border-slate-800 pb-2">
				<h2 class="text-xs sm:text-sm font-bold font-['Press_Start_2P'] tracking-wider text-slate-350 uppercase flex items-center gap-1.5">
					ANALYZER HUD
				</h2>
				
				<!-- Clean Header Reset Button (Retro border, no rounding) -->
				<button 
					onclick={resetAll}
					class="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 border-2 border-amber-500 bg-black text-amber-500 hover:bg-amber-500 hover:text-black font-['Press_Start_2P'] text-[10px] font-bold uppercase transition active:scale-95 rounded-none"
				>
					<svg class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
					</svg>
					RESET
				</button>
			</div>

			<!-- Grid: 2 Columns Layout on mobile, 4 Columns Layout on large screens -->
			<div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
				{#each evidences as ev}
					{@const isIncluded = $includeEvidence.has(ev)}
					{@const isExcluded = $excludeEvidence.has(ev)}
					
					<button
						class="relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-none border-2 transition-all duration-150 select-none text-center {
							isIncluded 
								? 'bg-green-950/40 border-green-500 text-green-400' 
								: isExcluded 
									? 'bg-red-950/20 border-red-600 text-red-505 opacity-60' 
									: 'bg-black border-slate-800 text-slate-400 hover:border-slate-500 hover:text-white'
						}"
						onclick={() => toggleEvidence(ev)}
						oncontextmenu={(e) => { e.preventDefault(); toggleEvidence(ev, true); }}
					>
						<!-- Corner Dot status (chunky pixel style) -->
						<div class="absolute top-2 right-2 h-2 w-2 rounded-none {
							isIncluded ? 'bg-green-400' : isExcluded ? 'bg-red-500' : 'bg-transparent'
						}"></div>

						<img
							src={`/${evidenceIcons[ev] ?? `${ev}.webp`}`}
							alt={ev}
							class="h-10 w-10 object-contain mb-1.5 pixelated transition-opacity duration-150 {isIncluded ? 'opacity-100' : isExcluded ? 'opacity-30' : 'opacity-65'}"
						/>
						<span class="text-[10px] sm:text-xs font-bold font-['Press_Start_2P'] tracking-tighter leading-none truncate max-w-full" class:line-through={isExcluded}>
							{ev}
						</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Family Filter Box -->
		<div class="bg-black border-4 border-double border-white p-4 rounded-none space-y-3 shadow-md">
			<div class="flex items-center justify-between border-b-2 border-dashed border-slate-800 pb-2">
				<h2 class="text-xs sm:text-sm font-bold font-['Press_Start_2P'] tracking-wider text-slate-350 uppercase flex items-center gap-1.5">
					CATEGORIES
				</h2>
				<div class="flex gap-2 text-[10px] font-['Press_Start_2P']">
					<button onclick={selectAllCategories} class="text-green-400 hover:text-green-300 transition">[ALL]</button>
					<span class="text-slate-700">/</span>
					<button onclick={clearAllCategories} class="text-slate-500 hover:text-slate-400 transition">[NONE]</button>
				</div>
			</div>

			<div class="flex flex-wrap gap-2">
				{#each Object.keys(ghostData) as type}
					{@const isSelected = $selectedTypes.includes(type)}
					<button
						onclick={() => toggleGhostType(type)}
						class="px-3 py-2 rounded-none text-[10px] font-bold font-['Press_Start_2P'] border-2 transition-colors {
							isSelected 
								? 'bg-green-950/40 border-green-500 text-green-400' 
								: 'bg-black border-slate-800 text-slate-500 hover:border-slate-650 hover:text-slate-300'
						}"
					>
						{type.toUpperCase()}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Right Panel: Dossier Rows Stream (7 Cols) -->
	<div class="lg:col-span-7 space-y-4 font-['VT323']">
		<!-- Log Header -->
		<div class="flex items-center justify-between bg-black border-4 border-double border-white p-3 px-4 rounded-none shadow-md">
			<div class="flex items-center gap-2">
				<span class="text-[10px] sm:text-xs font-bold font-['Press_Start_2P'] tracking-widest text-slate-500 uppercase">IDENTIFIED:</span>
				<span class="text-xs sm:text-sm font-bold font-mono text-green-400 bg-green-950/40 px-2.5 py-1 rounded-none border-2 border-green-800">
					{activeGhostsCount} GHOSTS ELIGIBLE
				</span>
			</div>
			<span class="text-[10px] font-['Press_Start_2P'] text-slate-600">SYS_OK</span>
		</div>

		<!-- Dossiers List container -->
		<div class="space-y-1.5 max-h-[720px] overflow-y-auto pr-1">
			{#if activeGhostsCount === 0}
				<div class="flex flex-col items-center justify-center p-10 text-center rounded-none border-4 border-double border-white bg-black space-y-3">
					<svg class="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
					<div class="space-y-0.5">
						<h3 class="text-sm font-bold text-slate-300 font-['Press_Start_2P'] text-[10px]">NO CORRESPONDING FILES</h3>
						<p class="text-xs text-slate-500 max-w-xs leading-relaxed font-mono">ข้อมูลวิจัยไม่พบความเชื่อมโยงกับผีตัวใดในฐานระบบ กรุณาตรวจสอบเบาะแสใหม่อีกครั้ง</p>
					</div>
				</div>
			{:else}
				{#each renderedGhosts as { type, data, list }}
					{#each list as ghostKey}
						{@const ghost = ghostEvidence[ghostKey]}
						{#if ghost}
							{@const isExpanded = expandedGhosts.has(ghostKey)}
							{@const catStyle = categoryColors[type]}
							
							<div class="border-2 rounded-none transition-colors duration-150 {
								isExpanded 
									? 'bg-slate-950 border-white' 
									: 'bg-black border-slate-800 hover:border-slate-600'
							}">
								<!-- Header Row -->
								<div class="flex items-center justify-between p-3 gap-2">
									<button 
										onclick={() => toggleExpand(ghostKey)}
										class="flex-grow flex items-center justify-between gap-4 text-left"
									>
										<!-- Name + Category Badge -->
										<div class="flex items-center gap-2.5 truncate">
											<span class="font-bold text-base sm:text-lg tracking-wide text-white font-['Press_Start_2P'] group-hover:text-green-400 transition-colors">
												{ghost.name}
											</span>
											<span class="text-[10px] px-2 py-0.5 rounded-none border-2 font-['Press_Start_2P'] font-bold uppercase tracking-wider {catStyle.badge}">
												{type}
											</span>
										</div>

										<!-- Evidences required (Desktop inline) -->
										<div class="hidden sm:flex items-center gap-1.5 font-mono">
											{#each ghost.evidence as ev}
												{@const inc = $includeEvidence.has(ev)}
												{@const ex = $excludeEvidence.has(ev)}
												<span class="text-xs px-2 py-0.5 rounded-none border-2 transition-colors select-none {
													inc 
														? 'bg-green-950 border-green-500 text-green-400 font-bold' 
														: ex 
															? 'bg-red-950/40 border-red-800 text-red-500/40 line-through' 
															: 'bg-black border-slate-800 text-slate-500'
												}">
													{ev}
												</span>
											{/each}
										</div>
									</button>

									<div class="flex items-center gap-1.5 shrink-0">
										<!-- Mobile Evidences tag dots (collapsed view) -->
										{#if !isExpanded}
											<div class="flex sm:hidden gap-1 scale-90 pr-1">
												{#each ghost.evidence as ev}
													{@const inc = $includeEvidence.has(ev)}
													{@const ex = $excludeEvidence.has(ev)}
													<span class="h-2 w-2 border {
														inc ? 'bg-green-500 border-green-600' : ex ? 'bg-red-500 border-red-600' : 'bg-slate-900 border-slate-800'
													}"></span>
												{/each}
											</div>
										{/if}

										<!-- Action: Strikeout/Hide button (sharp pixel) -->
										<button
											onclick={() => toggleHideGhost(ghostKey)}
											title="Eliminate from tracker"
											class="p-1.5 h-8 w-8 rounded-none border-2 border-slate-800 bg-black hover:bg-red-950 hover:border-red-600 text-slate-500 hover:text-red-400 flex items-center justify-center transition-all active:scale-90"
										>
											<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
												<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
								</div>

								<!-- Expandable Details Accordion -->
								{#if isExpanded}
									<div class="px-4 pb-4 pt-2 border-t-2 border-dashed border-slate-850 space-y-3.5 animate-fadeIn">
										<!-- Mobile Evidences tags list -->
										<div class="flex sm:hidden flex-wrap gap-1 py-1 border-b-2 border-dashed border-slate-900 font-mono">
											{#each ghost.evidence as ev}
												{@const inc = $includeEvidence.has(ev)}
												{@const ex = $excludeEvidence.has(ev)}
												<span class="text-xs px-2 py-0.5 rounded-none border-2 {
													inc 
														? 'bg-green-950 border-green-500 text-green-400 font-bold' 
														: ex 
															? 'bg-red-950/40 border-red-800 text-red-500/40 line-through' 
															: 'bg-black border-slate-850 text-slate-500'
												}">
													{ev}
												</span>
											{/each}
										</div>

										<!-- Lore/Description from Wiki -->
										{#if ghost.description}
											<div class="space-y-0.5">
												<span class="text-xs font-bold font-mono text-slate-500 tracking-wider uppercase block">FILE DESCRIPTION</span>
												<p class="text-sm sm:text-base text-slate-400 leading-relaxed italic border-l-4 border-slate-800 pl-2.5 font-mono">
													"{ghost.description}"
												</p>
											</div>
										{/if}

										<!-- Ability details side-by-side -->
										<div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
											<!-- Thai ability (Retro box) -->
											<div class="p-3.5 bg-black border-2 border-green-500 rounded-none space-y-1">
												<span class="text-xs font-bold font-['Press_Start_2P'] text-green-400 uppercase block">ความสามารถ (TH)</span>
												<p class="text-sm sm:text-base text-slate-200 leading-relaxed font-semibold">
													{ghost.ability || 'ไม่มีข้อมูลความสามารถเพิ่มเติม'}
												</p>
											</div>

											<!-- English ability specifications from Wiki -->
											{#if ghost.abilityEn}
												<div class="p-3.5 bg-black border-2 border-slate-800 rounded-none space-y-1">
													<span class="text-xs font-bold font-['Press_Start_2P'] text-slate-500 uppercase block">WIKI SPEC (EN)</span>
													<p class="text-sm sm:text-base text-slate-350 leading-relaxed font-mono">
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
			<div class="bg-black border-4 border-double border-white rounded-none overflow-hidden col-span-full">
				<button 
					onclick={() => showEliminatedSection = !showEliminatedSection}
					class="w-full p-3 flex items-center justify-between text-left hover:bg-slate-900/10 transition-colors"
				>
					<div class="flex items-center gap-2 font-mono text-xs text-slate-500">
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
						<span class="font-['Press_Start_2P'] text-[10px]">ELIMINATED DOSSIERS ({eliminatedGhosts.length})</span>
					</div>
					<svg class="h-3 w-3 text-slate-500 transition-transform duration-300" class:rotate-180={showEliminatedSection} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{#if showEliminatedSection}
					<div class="p-3 pt-0 border-t-2 border-dashed border-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fadeIn">
						{#each eliminatedGhosts as ghost}
							<div class="flex items-center justify-between p-2.5 rounded-none bg-black border-2 border-slate-800">
								<span class="font-bold text-slate-500 line-through truncate max-w-[65%] font-['Press_Start_2P'] text-[10px]">{ghost.name}</span>
								<button
									onclick={() => toggleHideGhost(ghost.key)}
									class="text-[10px] font-['Press_Start_2P'] font-bold px-2.5 py-1.5 bg-black hover:bg-white hover:text-black text-green-400 rounded-none border-2 border-slate-800 transition"
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
	/* Animation helper for accordion expansion */
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-3px); }
		to { opacity: 1; transform: translateY(0); }
	}
	.animate-fadeIn {
		animation: fadeIn 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
</style>
