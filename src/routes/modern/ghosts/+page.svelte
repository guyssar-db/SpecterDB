<script lang="ts">
	import { ghostData } from '$lib/data/ghostData';
	import { ghostEvidence } from '$lib/data/ghostEvidence';

	// Modern Category styles (Dark Mode Badges)
	const categoryStyles: Record<string, { badge: string; text: string; bg: string; border: string }> = {
		Flicker: {
			badge: 'bg-purple-950/40 text-purple-400 border-purple-900/40',
			text: 'text-purple-400',
			bg: 'bg-purple-950/10',
			border: 'border-purple-900/40'
		},
		Imitator: {
			badge: 'bg-blue-950/40 text-blue-400 border-blue-900/40',
			text: 'text-blue-400',
			bg: 'bg-blue-950/10',
			border: 'border-blue-900/40'
		},
		Leech: {
			badge: 'bg-rose-950/40 text-rose-400 border-rose-900/40',
			text: 'text-rose-400',
			bg: 'bg-rose-950/10',
			border: 'border-rose-900/40'
		},
		Tormentor: {
			badge: 'bg-orange-950/40 text-orange-400 border-orange-900/40',
			text: 'text-orange-400',
			bg: 'bg-orange-950/10',
			border: 'border-orange-900/40'
		},
		Trickster: {
			badge: 'bg-amber-950/40 text-amber-450 border-amber-900/40',
			text: 'text-amber-400',
			bg: 'bg-amber-950/10',
			border: 'border-amber-900/40'
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

<div class="space-y-6 text-slate-300">
	<!-- Database Header -->
	<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#0c1322] border border-slate-800/80 p-6 rounded-2xl shadow-md">
		<div class="space-y-1">
			<h1 class="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
				<svg class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
				</svg> 
				Ghost Encyclopedia
			</h1>
			<p class="text-sm text-slate-500 font-sans font-medium">
				Comprehensive dossiers of all identified ghost species.
			</p>
		</div>
		
		<!-- Search Field -->
		<div class="relative w-full md:w-80">
			<input
				bind:value={search}
				placeholder="Search name, abilities..."
				class="w-full bg-[#080d16] border border-slate-800/80 text-white rounded-xl pl-10 pr-4 py-2.5 font-sans text-sm placeholder:text-slate-550 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-550 transition-all duration-200"
			/>
			<svg class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
		</div>
	</div>

	<!-- Stats Indicator -->
	<div class="flex items-center gap-2 font-sans text-sm text-slate-400 bg-[#0c1322] px-4 py-2.5 rounded-xl border border-slate-800/80 shadow-md">
		<span class="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
		<span>Database Results: {totalShowing} / 30 Species Displayed</span>
	</div>

	<!-- Categories -->
	{#each filteredCategories as { category, description, list }}
		{#if list.length > 0}
			{@const catStyle = categoryStyles[category]}
			
			<div class="border border-slate-800/80 bg-[#0c1322] p-5 sm:p-6 space-y-4 rounded-2xl shadow-md font-sans">
				<!-- Header -->
				<div class="flex flex-col sm:flex-row sm:items-baseline gap-2 pb-2 border-b border-slate-800/50">
					<h2 class={`text-base sm:text-lg font-bold tracking-tight uppercase ${catStyle.text}`}>
						{category}
					</h2>
					<span class="hidden sm:inline text-slate-700">//</span>
					<p class="text-sm text-slate-500 font-medium font-mono">
						{description}
					</p>
				</div>

				<!-- Grid -->
				<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					{#each list as name}
						{@const ghost = ghostEvidence[name]}
						{#if ghost}
							<div class="bg-[#080d16]/50 border border-slate-800/60 p-5 flex flex-col justify-between hover:border-indigo-500/50 hover:bg-[#0c1322] transition-all duration-200 rounded-xl group shadow-md">
								<div class="space-y-4 font-sans">
									<!-- Card Header -->
									<div class="flex items-center justify-between gap-3">
										<h3 class="font-bold text-lg tracking-tight text-white group-hover:text-indigo-400 transition-colors uppercase">
											{ghost.name}
										</h3>
										<span class={`text-xs px-2.5 py-1 rounded-md border font-semibold tracking-wider uppercase scale-90 origin-right ${catStyle.badge}`}>
											{category}
										</span>
									</div>

									<!-- Evidences Required -->
									<div class="flex flex-wrap gap-1.5 font-sans">
										{#each ghost.evidence as ev}
											<span class="text-xs px-2.5 py-1 rounded-md border select-none font-semibold bg-[#080d16] border-slate-800 text-slate-450">
												{ev}
											</span>
										{/each}
									</div>

									<!-- Description -->
									{#if ghost.description}
										<p class="text-sm text-slate-400 italic leading-relaxed border-l-3 border-slate-800 pl-3">
											"{ghost.description}"
										</p>
									{/if}
								</div>

								<!-- Abilities Box -->
								<div class="mt-4 pt-4 border-t border-slate-800/50 space-y-3">
									<!-- Thai ability -->
									<div class="p-3.5 bg-emerald-950/20 border border-emerald-900/50 rounded-xl space-y-1">
										<span class="text-xs font-bold text-emerald-450 uppercase tracking-wider block font-sans">ความสามารถพิเศษ (TH)</span>
										<p class="text-sm sm:text-base text-emerald-350 leading-relaxed font-semibold font-sans font-medium">
											{ghost.ability}
										</p>
									</div>

									<!-- English ability -->
									{#if ghost.abilityEn}
										<div class="p-3.5 bg-[#080d16] border border-slate-800/80 rounded-xl space-y-1">
											<span class="text-xs font-bold text-slate-500 uppercase tracking-wider block font-sans">Technical specifications (EN)</span>
											<p class="text-sm sm:text-base text-slate-400 leading-relaxed font-mono">
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
