<script lang="ts">
	import { ghostData } from '$lib/data/ghostData';
	import { ghostEvidence } from '$lib/data/ghostEvidence';
	
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

	let search = $state('');
</script>

<div class="p-6 text-white bg-gray-900 min-h-screen font-sans">
	<h1 class="text-3xl font-bold mb-6">👻 Ghost Encyclopedia</h1>

	<input
		bind:value={search}
		placeholder="ค้นหาชื่อผี..."
		class="w-full p-2 mb-4 text-black rounded"
	/>

	{#each Object.entries(ghostData) as [category, info]}
		<div class="mb-6 border border-gray-700 rounded-lg p-4">
			<h2 class="text-xl font-semibold mb-2">{category}</h2>
			<p class="text-gray-400 mb-3">{info.description}</p>

			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
				{#each info.list.filter(name => name.toLowerCase().includes(search.toLowerCase())) as name}
					{#if ghostEvidence[name]}
						<div class="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
							<h3 class="font-bold text-lg mb-2">{name}</h3>
							<div class="flex flex-wrap gap-2 mb-2">
								{#each ghostEvidence[name].evidence as ev}
									<span class={`text-xs px-2 py-1 rounded ${solidColors[ev]}`}>{ev}</span>
								{/each}
							</div>
							<p class="text-sm text-gray-300 my-3">{ghostEvidence[name].description}</p>
							<div class="p-3 bg-gray-600">
								<p class="text-sm text-gray-300">{ghostEvidence[name].ability}</p>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	input::placeholder {
		color: #555;
	}
</style>
