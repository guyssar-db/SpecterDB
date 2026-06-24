// src/lib/data/ghostData.ts
export interface GhostCategory {
	list: string[];
	description: string;
}

export const ghostData: Record<string, GhostCategory> = {
	Flicker: {
		list: ['Demon', 'Jinn', 'Mare', 'Revenant', 'Spirit', 'Wisp'],
		description: 'ผีจะหายตัวไปชั่วขณะระหว่างการล่า และบางครั้งอาจปรากฏตัวขณะเดินเตร่'
	},
	Imitator: {
		list: ['Blair', 'Mimic', 'Myling', 'O Tokata', 'Shade', 'Wraith'],
		description: 'ผีเหล่านี้สามารถเลียนแบบผู้เล่นในแชทและสร้างเสียงฝีเท้าปลอมได้'
	},
	Leech: {
		list: ['Aswang', 'Bhuta', 'Bogey', 'Phantom', 'Preta', 'Upyr'],
		description: 'ผีจะกินร่างของผู้เล่นที่ตายแล้ว สติจะหมดเร็วขึ้นทุกครั้ง'
	},
	Tormentor: {
		list: ['Afarit', 'Banshee', 'Haint', 'Oni', 'Wendigo', 'Yurei'],
		description: 'ผีสามารถทำลายแสงไฟ ฟังเสียงกระจกแตกได้ การมองพวกมันทำให้ทุกอย่างมืดลง'
	},
	Trickster: {
		list: ['Douen', 'Duppy', 'Egui', 'Poltergeist', 'Thaye', 'Yokai'],
		description:
			'สามารถโยนอุปกรณ์ที่เหลือลงบนพื้น และปิดการใช้งานอุปกรณ์อิเล็กทรอนิกส์บริเวณใกล้เคียงชั่วคราว'
	}
};
