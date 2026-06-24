<script lang="ts">
	type NoteGroup = { title: string; items: string[] };
	type NoteSection = { id: string; number: string; title: string; kicker: string; groups: NoteGroup[] };

	const sections: NoteSection[] = [
		{
			id: 'gameplay', number: '01', title: 'Gameplay Changes', kicker: 'ระบบหลักถูกออกแบบใหม่',
			groups: [
				{ title: 'Hunt Overhaul', items: ['ผีต้องเห็นผู้เล่นก่อนจึงจะเริ่มไล่ล่า', 'ได้ยินเสียงวิ่ง ประตู และกิจกรรมต่าง ๆ จากระยะไกล', 'ค้นหาบริเวณที่คาดว่าผู้เล่นอยู่เมื่อไม่มีข้อมูลเป้าหมาย', 'เลิกไล่เมื่อไม่เห็นเป้าหมายต่อเนื่อง 4 วินาที', 'ผีแต่ละประเภทมีระบบเลือกเป้าหมายต่างกัน'] },
				{ title: 'Hiding Overhaul', items: ['เพิ่ม Skill Check ระหว่างซ่อนตัว พลาดแล้วยิ่งเสี่ยงถูกพบ', 'Sanity ต่ำทำให้ Skill Check ยากขึ้น', 'เพิ่มระยะกดเข้าที่ซ่อน 12.5%', 'เข้าและออกด้วยคลิกเดียว', 'ที่ซ่อนไม่เรืองแสงสีขาวอีกต่อไป'] }
			]
		},
		{
			id: 'behavior', number: '02', title: 'Ghost Behavior Layers', kicker: 'ผีมีบุคลิกต่างกันในแต่ละรอบ',
			groups: [
				{ title: 'Aggression', items: ['การยั่วผีและ Spam Spirit Box เพิ่มความก้าวร้าว', 'ผีที่ตายอย่างรุนแรงจะดุและล่าบ่อยขึ้น'] },
				{ title: 'Manipulation', items: ['ผีบางตัวทำกิจกรรมหลายอย่างพร้อมกันได้', 'ส่งผลต่อ Sanity และบางตัวลดได้เร็วถึง 2 เท่า'] },
				{ title: 'Timing', items: ['สลับช่วง Active และ Quiet', 'ผีเด็กคาดเดายาก ส่วนผีผู้ใหญ่มีรูปแบบสม่ำเสมอกว่า'] }
			]
		},
		{
			id: 'systems', number: '03', title: 'Systems & Evidence', kicker: 'เครื่องมือและ progression ใหม่',
			groups: [
				{ title: 'Rising Flames', items: ['เปลวไฟ Candle และ Lighter ใหญ่ขึ้น 2 เท่าเมื่อผีอยู่ใกล้', 'มีควันดำ', 'Candle ไหม้เร็วขึ้น 8 เท่าเป็นเวลา 3 วินาที'] },
				{ title: 'Map Progression', items: ['แผนที่ถูกล็อกตามเลเวลและปลดล็อกครบที่เลเวล 100', 'ทุกคนในห้องต้องปลดล็อกก่อนจึงจะโหวตได้', 'ซื้อสิทธิ์ปลดล็อกด้วย Robux ได้'] },
				{ title: 'Spirit Box', items: ['ถามซ้ำเกิน 2 ครั้งใน 5 วินาทีจะไม่ตอบ', 'ค่าความก้าวร้าวยังเพิ่มแม้ผีไม่ตอบ'] }
			]
		},
		{
			id: 'content', number: '04', title: 'New Content', kicker: 'แผนที่ ผี และซีซันใหม่',
			groups: [
				{ title: 'Maps & Event', items: ['Revamped Clinic', 'Revamped Cozy Home Fireside', 'Anniversary Event 2026: สะสมเค้กหลังจบเกมเพื่อปลดล็อกรางวัล'] },
				{ title: 'The Nightmare', items: ['เพิ่มผีใหม่ The Nightmare', 'ชุดหลักฐานและ Trait ยังไม่ถูกระบุใน Wiki จึงยังไม่เพิ่มเข้า Ghost Analyzer'] },
				{ title: 'Equipment & Season', items: ['X-Ray Ghost Goggles มองเห็น Ghost Orbs ทะลุกำแพงในระยะใกล้', 'Season 21 เริ่มแล้ว', 'Season ในอนาคตลดเหลือ 40 Tier'] }
			]
		},
		{
			id: 'features', number: '05', title: 'New Features', kicker: 'ปฏิสัมพันธ์และเครื่องมือผู้เล่น',
			groups: [
				{ title: 'World Interactions', items: ['NPC มีบทสนทนามากกว่า 250 รายการ', 'ผีโต้ตอบกับโทรศัพท์มือถือและอาจมีสายพิเศษ', 'ผู้เล่นทุกคนมี Glowstick ติดตัว'] },
				{ title: 'Vote Kick', items: ['เพิ่มระบบโหวตเตะผู้เล่น', 'ต้องการเสียงเห็นชอบมากกว่า 50%'] },
				{ title: 'Audio Settings', items: ['ปรับระดับเสียง EMF Reader ได้', 'ปรับระดับเสียง Motion Sensor ได้'] }
			]
		},
		{
			id: 'ui', number: '06', title: 'UI Improvements', kicker: 'ค้นหา อ่าน และควบคุมง่ายขึ้น',
			groups: [
				{ title: 'Interface', items: ['เพิ่ม Search Bar สำหรับค้นหาสกิน', 'เพิ่ม Brightness Slider', 'มือถือซูมอุปกรณ์และรถได้', 'ปรับปรุง Home, Shop, Inventory และ Journal'] },
				{ title: 'More Information', items: ['เพิ่มรูปตัวอย่างหลักฐานใน Journal', 'แสดงอัตราดรอปรางวัลอย่างละเอียด', 'แสดงรายละเอียดโบนัส VIP Luck'] }
			]
		},
		{
			id: 'fixes', number: '07', title: 'Important Bug Fixes', kicker: 'แก้ปัญหาหลักในทุกระบบ',
			groups: [
				{ title: 'Gameplay', items: ['ผู้เล่นเข้าเกมช้าและคำตอบ Spirit Box บางรายการ', 'Bogey เลือกเป้าหมายผิด', 'Bhuta เดิน AI ผิดปกติ', 'Wraith เทเลพอร์ตไม่ได้', 'ผีบางตัวสร้างหลักฐานเร็วเกินไป'] },
				{ title: 'Maps', items: ['กระดูกไม่เกิด', 'ผู้เล่นตกแมพ', 'อุปกรณ์ถูกโยนออกนอกแมพ'] },
				{ title: 'UI & Systems', items: ['ตัวละครซ้ำใน Inventory', 'Journal คำนวณหลักฐานผิด', 'Gift บนมือถือ, Crucifix และ Mouse Cursor ระหว่างโหวตแมพ'] }
			]
		}
	];
</script>

<svelte:head>
	<title>Release Notes 3.0.0 | SpecterDB</title>
	<meta name="description" content="สรุปภาษาไทยของ Specter 2 Release Notes 3.0.0" />
</svelte:head>

<main class="min-h-dvh bg-[#060911] text-slate-200">
	<div class="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:56px_56px]"></div>
	<div class="pointer-events-none fixed -top-64 right-[-8rem] h-[38rem] w-[38rem] rounded-full bg-orange-500/10 blur-[150px]"></div>

	<div class="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
		<nav class="mb-12 flex items-center justify-between border-b border-slate-800 pb-5">
			<a href="/" class="font-mono text-xs tracking-[0.22em] text-cyan-400 transition-colors hover:text-cyan-200">← SPECTER_DB</a>
			<span class="font-mono text-[10px] tracking-[0.2em] text-orange-300">RELEASE / 3.0.0</span>
		</nav>

		<header class="mb-14 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end">
			<div>
				<div class="mb-5 flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-orange-400"><span class="h-2 w-2 animate-pulse rounded-full bg-orange-400"></span>MAJOR SYSTEM REVISION</div>
				<h1 class="font-['Outfit'] text-5xl font-black uppercase leading-[0.86] tracking-tight text-white sm:text-7xl lg:text-8xl">
					Release<br /><span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-white">3.0.0</span>
				</h1>
				<p class="mt-7 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">การปรับระบบครั้งใหญ่ของ Specter 2: ระบบล่าและซ่อนตัวใหม่, บุคลิกผีแบบสุ่ม, หลักฐาน Rising Flames, ผี The Nightmare และการปรับปรุงระบบผู้เล่นครั้งสำคัญ</p>
			</div>
			<div class="border-l-2 border-orange-400 bg-orange-400/5 p-6">
				<p class="font-mono text-[10px] tracking-[0.2em] text-orange-300">TL;DR</p>
				<p class="mt-3 font-['Outfit'] text-3xl font-bold uppercase text-white">Ghosts feel alive.</p>
				<p class="mt-3 text-xs leading-5 text-slate-400">ผีฟัง มอง ค้นหา และตัดสินใจตามบุคลิกเฉพาะของแต่ละรอบ</p>
			</div>
		</header>

		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each ['Hunt Overhaul', 'Rising Flames', 'The Nightmare', 'Vote Kick'] as highlight, index}
				<a href={`#${['gameplay', 'systems', 'content', 'features'][index]}`} class="group border border-slate-800 bg-[#0a101b] p-5 transition hover:-translate-y-1 hover:border-orange-700">
					<span class="font-mono text-[9px] text-slate-600">0{index + 1} / HIGHLIGHT</span>
					<p class="mt-3 font-['Outfit'] text-lg font-bold uppercase text-white group-hover:text-orange-300">{highlight}</p>
				</a>
			{/each}
		</div>

		<div class="mt-16 space-y-16">
			{#each sections as section}
				<section id={section.id} class="scroll-mt-8 grid gap-7 border-t border-slate-800 pt-8 lg:grid-cols-[17rem_1fr]">
					<header>
						<p class="font-mono text-xs text-orange-400">{section.number}</p>
						<h2 class="mt-2 font-['Outfit'] text-2xl font-bold uppercase leading-tight text-white sm:text-3xl">{section.title}</h2>
						<p class="mt-3 text-xs leading-5 text-slate-500">{section.kicker}</p>
					</header>
					<div class="grid gap-px overflow-hidden border border-slate-800 bg-slate-800 md:grid-cols-2 xl:grid-cols-3">
						{#each section.groups as group}
							<article class="bg-[#0a101b] p-6">
								<h3 class="font-['Outfit'] text-base font-bold uppercase tracking-wide text-cyan-300">{group.title}</h3>
								<ul class="mt-4 space-y-3 text-xs leading-5 text-slate-400">
									{#each group.items as item}<li class="flex gap-3"><span class="mt-2 h-1 w-1 shrink-0 bg-orange-400"></span><span>{item}</span></li>{/each}
								</ul>
							</article>
						{/each}
					</div>
				</section>
			{/each}
		</div>

		<section class="mt-16 border border-cyan-900/60 bg-cyan-950/10 p-7 sm:p-9">
			<p class="font-mono text-[10px] tracking-[0.2em] text-cyan-400">UPCOMING / NEXT MAJOR UPDATE</p>
			<div class="mt-5 grid gap-5 sm:grid-cols-3">
				{#each [['Cursed Hunts', 'ปรับสมดุลระบบล่าพิเศษ'], ['Cursed Objects', 'ปรับปรุงวัตถุต้องสาปทั้งหมด'], ['Ranked Mode', 'กลับมาหลังระบบหลักสมดุลแล้ว']] as item}
					<div class="border-t border-cyan-900/50 pt-4"><strong class="text-white">{item[0]}</strong><p class="mt-2 text-xs text-slate-400">{item[1]}</p></div>
				{/each}
			</div>
		</section>

		<footer class="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
			<p>สรุปภาษาไทยจาก Release Notes 3.0.0</p>
			<a class="font-mono text-cyan-400 hover:text-cyan-200" href="https://specter2.fandom.com/wiki/Evidences" target="_blank" rel="noreferrer">EVIDENCE REFERENCE ↗</a>
		</footer>
	</div>
</main>
