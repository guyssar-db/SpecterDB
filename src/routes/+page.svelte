<script lang="ts">
</script>

<div class="min-h-screen bg-[#070b13] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans select-none">
	<!-- Cyber grid background -->
	<div class="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.2)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
	
	<!-- Glow effects -->
	<div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
	<div class="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none"></div>
	
	<div class="max-w-7xl w-full relative z-10 flex flex-col items-center text-center space-y-12">
		<!-- Main Header -->
		<div class="space-y-4 max-w-2xl">
			<div class="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-mono tracking-widest uppercase">
				<span class="h-2 w-2 rounded-full bg-cyan-500 animate-ping"></span>
				SPECTER_DB CENTRAL INTERFACE
			</div>
			
			<h1 class="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-['Outfit']">
				SELECT <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">TERMINAL</span> THEME
			</h1>
			
			<p class="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
				Choose your preferred telemetry interface style to analyze ghost evidences. Each console theme provides a different aesthetic layout for in-field research.
			</p>

			<a
				href="/updates"
				class="inline-flex items-center gap-3 border border-orange-800/60 bg-orange-950/20 px-4 py-2 font-mono text-xs tracking-wider text-orange-300 transition-all hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-100"
			>
				<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400"></span>
				อ่านสรุป RELEASE NOTES 3.0.0 →
			</a>
		</div>

		<!-- Theme Cards Grid (4 Columns) -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
			<!-- Pixel Horror Theme Card -->
			<div class="bg-black border-2 border-slate-800 hover:border-red-500 transition-all duration-300 flex flex-col justify-between p-5 group relative overflow-hidden">
				<!-- CRT Scanline simulation within card header -->
				<div class="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
				
				<div class="space-y-6 relative z-10">
					<!-- Preview box -->
					<div class="h-32 bg-black border-4 border-double border-white rounded-none flex items-center justify-center relative overflow-hidden p-2">
						<!-- Scanlines simulation -->
						<div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] pointer-events-none"></div>
						<div class="text-center font-['Press_Start_2P'] text-[9px] text-green-400 space-y-1 scale-90">
							<p class="font-bold border border-green-500 p-1 animate-pulse">SPECTER_DB.EXE</p>
							<p class="text-slate-500 text-[6px]">RETRO SYS 1998</p>
						</div>
					</div>

					<div class="text-left space-y-2">
						<h3 class="text-base font-bold font-['Press_Start_2P'] text-white flex items-center gap-2">
							PIXEL HORROR
						</h3>
						<p class="text-xs text-slate-400 leading-relaxed font-mono">
							สัมผัสบรรยากาศเกมผีคลาสสิก 8-Bit จำลองหน้าจอ CRT ยุค 90 ขอบหยักพิกเซลคมชัด และกรอบสนทนาแบบคู่คลาสสิก
						</p>
					</div>
				</div>

				<a 
					href="/pixel" 
					class="mt-8 w-full py-3 bg-red-950/20 hover:bg-red-700 text-red-400 hover:text-white border border-red-900 hover:border-red-500 font-['Press_Start_2P'] text-[9px] uppercase tracking-wider text-center transition-all duration-200"
				>
					BOOT PIXEL_SYS
				</a>
			</div>

			<!-- Futuristic HUD Theme Card -->
			<div class="bg-[#0b1220]/60 border border-slate-800 hover:border-cyan-500 transition-all duration-300 flex flex-col justify-between p-5 group relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.01)] hover:shadow-[0_0_35px_rgba(6,182,212,0.05)]">
				<div class="space-y-6">
					<!-- Preview box -->
					<div class="h-32 bg-[#030712] border border-cyan-950 rounded flex flex-col justify-between relative overflow-hidden p-3 shadow-inner">
						<div class="flex items-center justify-between">
							<span class="h-1.5 w-8 bg-cyan-500/80 rounded-full animate-pulse"></span>
							<span class="text-[8px] font-mono text-cyan-500/50">SYS_HUD_v4</span>
						</div>
						<div class="h-12 border-l-2 border-cyan-500/30 pl-2 flex flex-col justify-center">
							<span class="text-[9px] font-mono text-slate-500">GHOST IDENTIFIED</span>
							<span class="text-xs font-mono text-cyan-400 font-bold tracking-wider">REVENANT.DAT</span>
						</div>
						<div class="h-1 bg-cyan-950 w-full rounded-full overflow-hidden">
							<div class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-3/4 animate-pulse"></div>
						</div>
					</div>

					<div class="text-left space-y-2">
						<h3 class="text-base font-bold font-['Outfit'] text-white flex items-center gap- tracking-wide uppercase">
							DARK FUTURISTIC
						</h3>
						<p class="text-xs text-slate-400 leading-relaxed font-sans">
							อินเทอร์เฟซแผงควบคุมยุคอวกาศ โทนสีเข้มตัดแสงนีออนฟ้า-เขียว ระบบจัดเก็บข้อมูลไซเบอร์เนติกส์แบบเรดาร์ตรวจจับ
						</p>
					</div>
				</div>

				<a 
					href="/futuristic" 
					class="mt-8 w-full py-3 bg-cyan-950/40 hover:bg-cyan-500 hover:text-black border border-cyan-800/60 hover:border-cyan-400 font-mono text-xs font-bold uppercase tracking-widest text-center transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.05)] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
				>
					INITIALIZE HUD
				</a>
			</div>

			<!-- Modern Clean Theme Card -->
			<div class="bg-[#0b1220]/60 border border-slate-800 hover:border-indigo-500 transition-all duration-300 flex flex-col justify-between p-5 group relative overflow-hidden shadow-sm hover:shadow-lg">
				<div class="space-y-6">
					<!-- Preview box -->
					<div class="h-32 bg-[#0c1322] border border-slate-850 rounded flex flex-col justify-between relative overflow-hidden p-3 shadow-inner">
						<div class="flex items-center justify-between">
							<span class="h-2.5 w-12 bg-indigo-500/20 rounded"></span>
							<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
						</div>
						<div class="space-y-1">
							<div class="h-3 bg-slate-800 rounded w-full"></div>
							<div class="h-3 bg-slate-800 rounded w-5/6"></div>
						</div>
						<div class="flex gap-1">
							<span class="h-4 w-8 bg-indigo-950 text-indigo-400 border border-indigo-900/40 rounded text-center text-[8px] flex items-center justify-center">INPUT</span>
							<span class="h-4 w-8 bg-[#080d16] border border-slate-850 rounded"></span>
						</div>
					</div>

					<div class="text-left space-y-2">
						<h3 class="text-base font-bold font-['Outfit'] text-white flex items-center gap-2 tracking-wide uppercase">
							MODERN CLEAN
						</h3>
						<p class="text-xs text-slate-400 leading-relaxed font-sans">
							ดีไซน์สะอาดตาเรียบหรูสไตล์สถาบันวิจัยวิทยาศาสตร์รูปแบบใหม่ ใช้งานในโทนสีกรมท่าเข้ม คอนทราสต์อ่านง่ายสบายตา
						</p>
					</div>
				</div>

				<a 
					href="/modern" 
					class="mt-8 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs font-bold uppercase tracking-widest text-center transition-all duration-200 shadow-md hover:shadow-indigo-500/30"
				>
					LAUNCH PORTAL
				</a>
			</div>

			<!-- Old Tactical HUD Card -->
			<div class="bg-[#0b1220]/60 border border-slate-800 hover:border-cyan-500 transition-all duration-300 flex flex-col justify-between p-5 group relative overflow-hidden shadow-sm hover:shadow-lg">
				<div class="space-y-6">
					<!-- Preview box -->
					<div class="h-32 bg-[#02070f] border border-slate-800 rounded-xl flex flex-col justify-between relative overflow-hidden p-3 shadow-inner" style="background-image: radial-gradient(circle at center, rgba(6,182,212,0.04) 0%, transparent 80%), linear-gradient(rgba(6,182,212,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.015) 1px, transparent 1px); background-size: 100% 100%, 10px 10px, 10px 10px;">
						<div class="flex items-center justify-between">
							<span class="h-2 w-8 bg-cyan-500/20 rounded-full border border-cyan-500/30"></span>
							<span class="text-[8px] font-mono text-cyan-400">OLD_SYS</span>
						</div>
						<div class="space-y-1">
							<div class="h-2 bg-slate-800 rounded w-full"></div>
							<div class="h-2 bg-slate-800 rounded w-5/6"></div>
						</div>
						<div class="flex gap-1.5">
							<span class="h-3.5 w-10 bg-green-500/10 border border-green-500/30 text-[8px] text-green-455 font-mono rounded text-center flex items-center justify-center">✔ EMF 5</span>
							<span class="h-3.5 w-10 bg-red-500/10 border border-red-500/30 text-[8px] text-red-455 font-mono rounded text-center flex items-center justify-center line-through">❌ Orbs</span>
						</div>
					</div>

					<div class="text-left space-y-2">
						<h3 class="text-base font-bold font-['Outfit'] text-white flex items-center gap-2 tracking-wide uppercase">
							OLD HUD
						</h3>
						<p class="text-xs text-slate-400 leading-relaxed font-sans">
							อินเทอร์เฟซแบบดั้งเดิมสไตล์ดั้งเดิม
						</p>
					</div>
				</div>

				<a 
					href="/old" 
					class="mt-8 w-full py-3 bg-cyan-950/40 hover:bg-cyan-500 hover:text-black border border-cyan-800/60 hover:border-cyan-400 font-mono text-xs font-bold uppercase tracking-widest text-center transition-all duration-200 shadow-sm"
				>
					LAUNCH OLD
				</a>
			</div>
		</div>

		<!-- System footer -->
		<div class="pt-6 border-t border-slate-900 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
			<p>SPECTERDB CONSOLE SWITCHER v3.0</p>
			<p>ACTIVE INTERFACES: 4 // ALL SYS READY</p>
		</div>
	</div>
</div>
