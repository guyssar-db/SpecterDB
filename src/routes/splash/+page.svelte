<script lang="ts">
	import { onMount } from 'svelte';
	import { check } from '@tauri-apps/plugin-updater';
	import { relaunch } from '@tauri-apps/plugin-process';

	let status = $state('INITIALIZING TELEMETRY SYSTEM...');
	let progress = $state(0);
	
	const steps = [
		'VERIFYING LOCAL BINARY CHECK...',
		'ESTABLISHING ENCRYPTED CONNECTION...',
		'CONTACTING SPECTER_DB HOST...',
		'CHECKING FOR NEW RELEASES...',
		'COMPARING LOCAL CONFIG: v3.0.0... UP-TO-DATE',
		'LOADING EVIDENCE DATA SOURCES...',
		'INTEGRITY VERIFICATION COMPLETE',
		'BOOTING CENTRAL CORE INTERFACE...'
	];

	onMount(() => {
		// Simulate update checks and resources loading
		const totalDuration = 3000; // 3 seconds loader
		const tickMs = 30;
		const increment = 100 / (totalDuration / tickMs);
		let hasCheckedUpdate = false;
		let checkingUpdate = false;

		const interval = setInterval(async () => {
			if (checkingUpdate) return;

			if (progress < 100) {
				const currentStep = Math.min(
					Math.floor((progress / 100) * steps.length),
					steps.length - 1
				);

				// Hook: When we reach checking for updates, do a real check in Tauri
				if (currentStep === 3 && !hasCheckedUpdate) {
					hasCheckedUpdate = true;
					if (typeof window !== 'undefined' && (window as any).__TAURI_INTERNALS__) {
						checkingUpdate = true;
						status = 'CHECKING FOR NEW RELEASES (REAL-TIME)...';
						try {
							const update = await check();
							if (update) {
								status = `NEW RELEASE v${update.version} FOUND. DOWNLOADING...`;
								await update.downloadAndInstall((event) => {
									if (event.event === 'Started') {
										status = `DOWNLOADING UPDATE: STARTED`;
									} else if (event.event === 'Progress') {
										status = `DOWNLOADING NEW UPDATE CHUNKS...`;
									} else if (event.event === 'Finished') {
										status = 'INSTALLING UPDATE...';
									}
								});
								status = 'APPLYING PATCHES. RELAUNCHING...';
								await relaunch();
								return;
							} else {
								status = 'COMPARING LOCAL CONFIG... UP-TO-DATE';
								await new Promise((resolve) => setTimeout(resolve, 800));
							}
						} catch (err) {
							console.error('Update check failed:', err);
							status = `ERROR: ${err}. CONTINUING...`;
							await new Promise((resolve) => setTimeout(resolve, 3000));
						}
						checkingUpdate = false;
					}
				}

				progress = Math.min(progress + increment, 100);
				if (currentStep !== 3) {
					status = steps[currentStep];
				}
			} else {
				clearInterval(interval);
				finishBoot();
			}
		}, tickMs);

		async function finishBoot() {
			status = 'LAUNCHING TERMINAL.EXE...';
			setTimeout(async () => {
				if (typeof window !== 'undefined' && (window as any).__TAURI_INTERNALS__) {
					try {
						const { invoke } = await import('@tauri-apps/api/core');
						await invoke('close_splashscreen');
					} catch (e) {
						console.error('Failed to close splashscreen via Tauri:', e);
					}
				} else {
					console.log('Boot sequence complete (Running in Web Preview Mode).');
					status = 'BOOT SUCCESS. REDIRECTING IN WEB MODE...';
					setTimeout(() => {
						window.location.href = '/';
					}, 1000);
				}
			}, 400);
		}
	});

	// Helper to draw retro-styled block progress bar
	function getProgressBar(prog: number) {
		const totalBlocks = 20;
		const filledBlocks = Math.floor((prog / 100) * totalBlocks);
		return '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks);
	}
</script>

<div class="h-[350px] w-[450px] bg-[#030712] border-2 border-emerald-500/80 text-emerald-400 p-6 flex flex-col justify-between relative overflow-hidden font-mono select-none crt-screen rounded-lg shadow-[0_0_40px_rgba(16,185,129,0.25)]">
	<!-- Background grid overlay -->
	<div class="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

	<!-- Flickering radar circle indicator -->
	<div class="absolute -right-12 -top-12 w-48 h-48 border border-emerald-500/20 rounded-full flex items-center justify-center pointer-events-none">
		<div class="w-36 h-36 border border-emerald-500/10 rounded-full flex items-center justify-center animate-ping" style="animation-duration: 3s">
			<div class="w-24 h-24 border border-emerald-500/5 rounded-full"></div>
		</div>
		<span class="absolute text-[8px] opacity-30 right-16 top-16">SCAN_RADAR_ACTIVE</span>
	</div>

	<!-- Top Header -->
	<div class="relative z-10 flex items-center justify-between border-b border-emerald-500/30 pb-2">
		<div class="flex items-center gap-2">
			<div class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
			<span class="text-xs font-bold tracking-widest uppercase">SPECTER_DB BOOTLOADER</span>
		</div>
		<span class="text-[9px] bg-emerald-950 px-2 py-0.5 border border-emerald-800 text-emerald-300">v3.0.0</span>
	</div>

	<!-- Terminal Output logs -->
	<div class="relative z-10 my-4 flex-1 flex flex-col justify-center space-y-3">
		<div class="text-[10px] text-emerald-500/70 space-y-1">
			<p>CORE_SYS INIT [OK]</p>
			<p>LOCAL_NET PORT [43391] BIND_SUCCESS</p>
			<p>ONLINE DATABASE SYNC INSTRUCTIONS LOADED</p>
		</div>
		
		<!-- Current active log message with simulated typing glow -->
		<div class="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded">
			<div class="text-[11px] font-bold tracking-wide flex items-center gap-1.5 min-h-[16px]">
				<span class="animate-pulse">></span>
				<span>{status}</span>
			</div>
		</div>
	</div>

	<!-- Bottom Progress info -->
	<div class="relative z-10 border-t border-emerald-500/30 pt-3 space-y-2">
		<div class="flex justify-between text-[11px] font-bold">
			<span>{getProgressBar(progress)}</span>
			<span>{Math.round(progress)}%</span>
		</div>
		
		<div class="flex justify-between text-[9px] text-emerald-500/60 uppercase">
			<span>Telemetry Loader v2.11</span>
			<span>Status: ACTIVE_BOOT</span>
		</div>
	</div>
</div>

<style>
	/* Specific layout reset to prevent any margin leaks on Tauri borderless transparent window */
	:global(body) {
		background: transparent !important;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		overflow: hidden;
	}

	.crt-screen::after {
		border-radius: 8px; /* match container */
	}
</style>
