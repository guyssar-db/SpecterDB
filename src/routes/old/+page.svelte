<script lang="ts">
	import { selectedTypes, includeEvidence, excludeEvidence, hiddenGhosts } from '$lib/stores/ghost';
	import { ghostData } from '$lib/data/ghostData';
	import { ghostEvidence } from '$lib/data/ghostEvidence';
	import { evidenceIcons, evidences } from '$lib/data/evidenceColors';
	import { onMount } from 'svelte';

	const solidColors: Record<string, string> = {
		'EMF 5': 'bg-blue-500 text-white',
		'Spirit Box': 'bg-purple-500 text-white',
		'Ghost Orbs': 'bg-yellow-500 text-white',
		'Ghost Writing': 'bg-pink-500 text-white',
		'Freezing': 'bg-cyan-500 text-white',
		'Fingerprints': 'bg-green-500 text-white',
		'Paranormal Motion': 'bg-red-500 text-white',
		'Rising Flames': 'bg-orange-500 text-white'
	};

	function toggleGhostType(type: string) {
		selectedTypes.update((curr) =>
			curr.includes(type) ? curr.filter((t) => t !== type) : [...curr, type]
		);
	}

	function toggleEvidence(ev: string, rightClick = false) {
		if (!rightClick) {
			includeEvidence.update((curr) => {
				const next = new Set(curr);
				excludeEvidence.update((ex) => (ex.delete(ev) ? ex : ex));
				if (next.has(ev)) next.delete(ev);
				else next.add(ev);
				return next;
			});
		} else {
			excludeEvidence.update((curr) => {
				const next = new Set(curr);
				includeEvidence.update((inc) => (inc.delete(ev) ? inc : inc));
				if (next.has(ev)) next.delete(ev);
				else next.add(ev);
				return next;
			});
		}
	}

	function resetAll() {
		selectedTypes.set(Object.keys(ghostData));
		includeEvidence.set(new Set());
		excludeEvidence.set(new Set());
		hiddenGhosts.set(new Set());
	}

	// Svelte 5 runes compatibility or reactive statement
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

	onMount(() => {
		selectedTypes.set(Object.keys(ghostData));
	});
</script>

<section class="grid grid-cols-7 px-5 py-3 gap-3 text-slate-100 font-sans">
	<div class="col-span-7 lg:col-span-3">
		<!-- Ghost Type -->
		<div class="mb-6 grid grid-cols-3 gap-2 text-white">
			{#each Object.keys(ghostData) as type}
				<button
					class="rounded bg-gray-600 p-3 transition hover:bg-gray-500 truncate"
					class:ring-2={$selectedTypes.includes(type)}
					class:ring-yellow-400={$selectedTypes.includes(type)}
					onclick={() => toggleGhostType(type)}
				>
					{type}
				</button>
			{/each}
		</div>
		
		<!-- Evidence -->
		<div class="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
			{#each evidences as ev}
				<button
					class={`relative flex items-center justify-center gap-2 rounded px-2 py-1 transition ${solidColors[ev]} hover:opacity-80`}
					class:opacity-40={$excludeEvidence.has(ev)}
					class:ring-2={$includeEvidence.has(ev)}
					class:ring-white={$includeEvidence.has(ev)}
					onclick={() => toggleEvidence(ev)}
					oncontextmenu={(e) => { e.preventDefault(); toggleEvidence(ev, true); }}
				>
					<div class="flex flex-col justify-center items-center">
						<img
							src={`/${evidenceIcons[ev] ?? `${ev}.webp`}`}
							alt={ev}
							class="h-10 w-10 object-contain"
						/>
						<div>
							<span>{ev}</span>
							<span class="ml-auto">
								{#if $includeEvidence.has(ev)}✔{/if}
								{#if $excludeEvidence.has(ev)}❌{/if}
							</span>
						</div>
					</div>
				</button>
			{/each}
			<button class="rounded bg-orange-600 px-2 py-1 text-white hover:bg-orange-500" onclick={resetAll}>
				Reset
			</button>
		</div>
	</div>
	
	<!-- Render Ghosts -->
	<div class="col-span-7 lg:col-span-4 lg:h-[calc(100vh-100px)] h-auto lg:overflow-y-auto rounded-md">
		<div class=" space-y-4">
			{#each renderedGhosts as { type, data, list }}
				<div class="rounded-lg bg-gray-700 p-4">
					<h2 class="mb-1 text-xl font-semibold text-white">{type}</h2>
					<p class="mb-2 text-sm text-gray-300">{data.description}</p>
			
					{#if list.length === 0}
						<p class="text-red-400">❌ No ghosts match selected evidence</p>
					{:else}
						<div class="ml-4 space-y-1">
							{#each list as ghost}
								{#if ghostEvidence[ghost]}
									<div class="space-y-1 rounded bg-gray-600 p-2">
										<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
											<span class="font-semibold text-white">{ghost}</span>
											<div class="flex flex-wrap gap-1">
												{#each ghostEvidence[ghost].evidence as ev}
													<span class={`rounded px-2 py-1 text-xs ${solidColors[ev]}`}>{ev}</span>
												{/each}
											</div>
										</div>
										<p class="text-sm text-gray-405">ความสามารถ : <span class="text-green-300">{ghostEvidence[ghost].ability}</span></p>
									</div>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
