// src/lib/data/ghostEvidence.ts
export interface GhostInfo {
	name: string;
	evidence: string[];
	description: string;
	ability: string;
	abilityEn: string;
}

export const ghostEvidence: Record<string, GhostInfo> = {
	'Afarit': {
		name: 'Afarit',
		evidence: ['Paranormal Motion', 'Ghost Orbs', 'Freezing'],
		description: 'Afarit originate in Islamic folklore, being compared to Jinn in religious texts. Looking at a hunting Afarit will cause it to speed up significantly.',
		ability: 'การมองไปที่ Afarit โดยตรงจะทำให้มันเคลื่อนที่เร็วขึ้นมาก',
		abilityEn: 'Looking at an Afarit directly will cause it to speed up significantly.'
	},
	'Aswang': {
		name: 'Aswang',
		evidence: ['EMF 5', 'Fingerprints', 'Spirit Box'],
		description: 'Aswang are spirits from the folklore of the Philippines. They prey on the weak, targeting those with the lowest sanity.',
		ability: 'เลือกโจมตีผู้เล่นที่มีสติ (Sanity) ต่ำที่สุด',
		abilityEn: 'Targets the player with the lowest sanity.'
	},
	'Banshee': {
		name: 'Banshee',
		evidence: ['EMF 5', 'Freezing', 'Fingerprints'],
		description: 'The Banshee is a dangerous ghost that will hunt its prey one at a time. Banshees are said to mourn the death of a family member, and some say they can be heard weeping. They are more likely to make noises than other ghosts.',
		ability: 'จะเลือกโจมตีผู้เล่นเพียงคนเดียว แม้จะมีคนอื่นอยู่ใกล้กว่า และมักจะส่งเสียงบ่อยกว่าผีอื่น',
		abilityEn: 'Targets one player, even if others are closer. More likely to make noises than other ghosts.'
	},
	'Bhuta': {
		name: 'Bhuta',
		evidence: ['Paranormal Motion', 'Ghost Writing', 'Freezing'],
		description: 'The Bhuta is attracted to movement and electricity. If you are being chased, try standing still at a safe distance and don\'t equip any electronic equipment, including the headlight. In a few seconds it will stop targeting you, as long as there are other targets.',
		ability: 'หากผู้เล่นไม่มีอุปกรณ์อิเล็กทรอนิกส์เป็นเวลาเกิน 5 วินาที และมีผู้เล่นมากกว่าหนึ่งคนในแมทช์ ผีจะเปลี่ยนเป้าหมายไปหาคนที่มีอุปกรณ์อิเล็กทรอนิกส์',
		abilityEn: 'If the player has no electronic equipment on them for more than 5 seconds, they will swap targets if more than one person is in a match.'
	},
	'Blair': {
		name: 'Blair',
		evidence: ['EMF 5', 'Freezing', 'Spirit Box'],
		description: 'The Blair prefers to stay in the shadows, attempting to avoid rooms with the lights turned on, unless the alternative is too costly or impossible. They are more likely to turn off the fusebox than other ghosts.',
		ability: 'กลัวไฟ และชอบปิดฟิวส์บ็อกซ์บ่อยกว่าผีตัวอื่น',
		abilityEn: ''
	},
	'Bogey': {
		name: 'Bogey',
		evidence: ['Rising Flames', 'Fingerprints', 'Paranormal Motion'],
		description: 'The Bogey thrives on fear and picks on the weak. It will target the weakest player, punishing them for their inadequacy, but alt speeds up the stronger their target is. Weak players are determined by a combination of prestige/level (max total level 100) and sanity.',
		ability: 'มักจะเล็งเป้าหมายไปที่ผู้เล่นที่อ่อนแอที่สุด แต่ความเร็วในการโจมตีจะเพิ่มขึ้นตามความแข็งแกร่งของเป้าหมาย',
		abilityEn: 'The Bogey will speed up according to the strength (Level + Sanity) of its target.'
	},
	'Demon': {
		name: 'Demon',
		evidence: ['Rising Flames', 'Spirit Box', 'Ghost Writing'],
		description: 'The Demon is a violent ghost. They are known to attack more frequently than other types of ghosts, so keeping your sanity high is an important protection.',
		ability: 'ทำให้สติลดเร็วขึ้น 5% และสามารถล่าได้บ่อยขึ้น',
		abilityEn: 'Drains your sanity 5% faster, and hunts more frequently.'
	},
	'Douen': {
		name: 'Douen',
		evidence: ['Rising Flames', 'Ghost Writing', 'Fingerprints'],
		description: 'Douen are mischevious ghosts known to play pranks on people. They are also said to lead children into the forest until they are lost. Douen are more likely to interact with doors, especially slamming them during hunts.',
		ability: 'สามารถโต้ตอบกับประตูจากระยะไกล และมักจะปิดหรือกระแทกประตูบ่อยกว่า',
		abilityEn: 'They can interact with doors from a farther distance, and closes them more often. A Douen may slam a door shut temporarily.'
	},
	'Duppy': {
		name: 'Duppy',
		evidence: ['Spirit Box', 'Rising Flames', 'Ghost Orbs'],
		description: 'The Duppy is a Caribbean ghost that creates a less reactive but visually identical clone of itself during the first hunt. Clones are able to see hiding players. If they catch a player they will disappear and give them a permanent speed debuff without killing them.',
		ability: 'สามารถเห็นผู้เล่นที่ซ่อนอยู่ และในครั้งแรกที่ล่า มันจะสร้างร่างโคลน',
		abilityEn: 'During the first hunt, it creates an identical clone of itself and if the clone catches the player, a permanent slowness effect is applied without killing them.'
	},
	'Egui': {
		name: 'Egui',
		evidence: ['Ghost Orbs', 'Spirit Box', 'Ghost Writing'],
		description: 'Egui (餓鬼) has a literal translation of "hungry ghost". They will hunt for people who have a specific item in their inventory, seemingly random, even if their distance is farther than others.',
		ability: 'หากผู้เล่นมีของที่เป็นของโปรดของผี มันจะเร็วขึ้นและล็อคเป้าผู้เล่นคนนั้น',
		abilityEn: 'If a player has the Spirit Box, Book or Ghost Goggles, it becomes faster and starts targeting them. If none of the items are present in an inventory, the Egui will become slower and target the closest player.'
	},
	'Haint': {
		name: 'Haint',
		evidence: ['Paranormal Motion', 'Rising Flames', 'Ghost Orbs'],
		description: 'Haints are a ghost from the Southern United States. If you spot one don\'t be fooled by its slow speed, looking away will make it become significantly faster.',
		ability: 'วิ่งเร็ว แต่ถ้าผู้เล่นมองมันมันจะวิ่งช้าลง',
		abilityEn: 'They move at high speed by default however, they slow down significantly when a player is looking at them.'
	},
	'Jinn': {
		name: 'Jinn',
		evidence: ['EMF 5', 'Paranormal Motion', 'Ghost Orbs'],
		description: 'A Jinn is a territorial ghost that will attack when threatened. It has also been known to travel at their maximum speed when the fusebox is turned off.',
		ability: 'เมื่อไฟฟ้าถูกปิด ผีจะเร็วขึ้น',
		abilityEn: 'They become faster when the fuse box is off.'
	},
	'Mare': {
		name: 'Mare',
		evidence: ['Freezing', 'Spirit Box', 'Ghost Orbs'],
		description: 'The Mare is the source of all nightmares, making it fast when hunting in the dark. Making sure the fuse box stays on is important to surviving mare hunts.',
		ability: 'ผีจะเร็วขึ้นเมื่อไฟฟ้าถูกปิด',
		abilityEn: 'They become faster when the fuse box is turned off.'
	},
	'Mimic': {
		name: 'Mimic',
		evidence: ['Spirit Box', 'Ghost Writing', 'EMF 5'],
		description: 'Be careful to not immediately assume the ghost type from the ability, or you may be tricked. The Mimic is able to imitate the abilities of any other ghost after 2 minutes. It will not stop imitating that ghost once chosen. It does not mimic evidence.',
		ability: 'หลังจากผ่านไป 2 นาที ผีสามารถลอกเลียนความสามารถของผีตัวอื่นได้',
		abilityEn: 'After two minutes have passed, they can copy the abilities of one of the other twenty-seven ghosts.'
	},
	'Myling': {
		name: 'Myling',
		evidence: ['Paranormal Motion', 'EMF 5', 'Rising Flames'],
		description: 'The Myling is a Scandinavian spirit. They are said to be ghosts of unwanted children. They will only hunt one person if the fusebox is turned off, but will also become faster. When the fusebox is on, Mylings will target anyone nearby',
		ability: 'จะล่าคนเพียงคนเดียวหากกล่องฟิวส์ถูกปิด',
		abilityEn: 'They speed up and will target one player only when the fuse box is off.'
	},
	'O Tokata': {
		name: 'O Tokata',
		evidence: ['EMF 5', 'Ghost Orbs', 'Fingerprints'],
		description: 'O Tokata are malevolent spirits in parts of traditional Indonesian mythology. Talking nearby a wandering O Tokata may cause it to hunt.',
		ability: 'ถ้ามีการพิมพ์แชทใกล้ๆ ขณะผีกำลังเดิน มันสามารถเริ่มการล่าได้',
		abilityEn: 'Talking in the chat near the O Tokata, during its wandering state may cause it to begin a hunt.'
	},
	'Oni': {
		name: 'Oni',
		evidence: ['Paranormal Motion', 'Rising Flames', 'Spirit Box'],
		description: 'Oni love to scare their victims as much as possible before attacking by creating more evidence and paranormal events. Traditional folklore suggests they are often seen in their physical form, guarding their place of death.',
		ability: 'ให้หลักฐานเร็วขึ้น 30%',
		abilityEn: 'Gives evidence 30% faster, but causes non-evidence paranormal activity 30% less.'
	},
	'Phantom': {
		name: 'Phantom',
		evidence: ['Freezing', 'EMF 5', 'Ghost Orbs'],
		description: 'A Phantom is a ghost that can possess the living, inducing fear into those around it. They are most commonly summoned from Ouija Boards. Looking at a Phantom during a hunt will rapidly drain your sanity.',
		ability: 'การมองตรงๆ จะทำให้สติของผู้เล่นลดลงเร็วขึ้น',
		abilityEn: 'Looking directly at Phantoms will drain your sanity significantly faster.'
	},
	'Poltergeist': {
		name: 'Poltergeist',
		evidence: ['Spirit Box', 'Fingerprints', 'Ghost Orbs'],
		description: 'One of the most famous ghosts is the Poltergeist. Known to throw objects more often to spread fear into its victims.',
		ability: 'สามารถโยนของได้ 3 ชิ้นพร้อมกัน',
		abilityEn: 'Farther range to interact with doors and objects. It is able to throw up to 3 objects at once, instead of the normal 2.'
	},
	'Preta': {
		name: 'Preta',
		evidence: ['Rising Flames', 'Fingerprints', 'EMF 5'],
		description: 'Pretas are supernatural beings who cannot be put to rest. They suffer miserably and feed on the suffering of others. A preta will become slower the more of your team is dead.',
		ability: 'ผีจะเร็วขึ้นเมื่อมีผู้เล่นมากกว่า 1 คนยังมีชีวิตอยู่',
		abilityEn: 'Speeds up the more players are alive and gets slower after killing a player.'
	},
	'Revenant': {
		name: 'Revenant',
		evidence: ['EMF 5', 'Ghost Writing', 'Fingerprints'],
		description: 'Revenants are violent ghosts that will attack indiscriminately. If a Revenant can see you while hunting, they can move incredibly fast.',
		ability: 'จะเร็วขึ้นเมื่อเจอผู้เล่นในสายตา',
		abilityEn: 'Becomes faster when you get in their line of sight.'
	},
	'Shade': {
		name: 'Shade',
		evidence: ['EMF 5', 'Ghost Writing', 'Rising Flames'],
		description: 'The Shade is known to be very shy. There is evidence to suggest that a Shade will stop creating any evidence if anyone is close by. Shades also hunt less than other ghosts.',
		ability: 'ไม่มีความสามารถพิเศษ (ไม่สร้างหลักฐานใกล้ผู้เล่น)',
		abilityEn: 'Does not create any evidence if a player is nearby.'
	},
	'Spirit': {
		name: 'Spirit',
		evidence: ['Fingerprints', 'Spirit Box', 'Ghost Writing'],
		description: 'Spirits are basic ghosts. They do not have any unique abilities than can help with their detection.',
		ability: 'ไม่มีความสามารถพิเศษเพิ่มเติม',
		abilityEn: 'Has no special abilities; does nothing.'
	},
	'Thaye': {
		name: 'Thayé',
		evidence: ['Freezing', 'Fingerprints', 'Ghost Orbs'],
		description: 'Often said to take on a tall and lanky form, Thayé are intimidating but generally inactive ghosts. Their activity decreases over time, but their speed grows, so discovering evidence early is crucial.',
		ability: 'จะเร็วขึ้นและให้หลักฐานน้อยลงตามเวลาที่ผ่านไป',
		abilityEn: 'They become faster and give less evidence the longer the round goes on.'
	},
	'Upyr': {
		name: 'Upyr',
		evidence: ['EMF 5', 'Freezing', 'Paranormal Motion'],
		description: 'The Upyr is documented in Slavic folklore, with the most modern comparison being a Vampire. Upyr rise from the grave if their soul has not been redeemed from their sins. They seek the blood of victims, and become faster and more emboldened to hunt with each kill.',
		ability: 'เร็วขึ้นทุกครั้งที่ฆ่า',
		abilityEn: 'They become faster and more likely to hunt with each kill.'
	},
	'Wendigo': {
		name: 'Wendigo',
		evidence: ['Paranormal Motion', 'Spirit Box', 'Freezing'],
		description: 'The Wendigo is an evil spirit, documented in native folklore in North America. They\'re said to cause those under their influence to have an insatiable greed and hunger, sometimes for human lives. Wendigo become faster as your sanity drops.',
		ability: 'เร็วขึ้นตามจำนวนผู้เล่นที่ตาย/ตามสติที่ลดลง',
		abilityEn: 'Becomes faster the lower the average team sanity is.'
	},
	'Wisp': {
		name: 'Wisp',
		evidence: ['Ghost Orbs', 'Ghost Writing', 'Rising Flames'],
		description: 'The Wisp gets faster when hunting targets in rooms with the lights on, and will turns on lights more frequently than other types of ghosts. They have been said to lure travellers away from their path during the night.',
		ability: 'เร็วขึ้นเมื่อห้องมีไฟเปิด',
		abilityEn: 'Becomes faster in lit areas and turns on lights more frequently.'
	},
	'Wraith': {
		name: 'Wraith',
		evidence: ['Ghost Writing', 'Paranormal Motion', 'Rising Flames'],
		description: 'Wraith are very dangerous ghosts due to their ability to teleport freely. Wraith that chase one player for too long may teleport nearby another to hunt them instead.',
		ability: 'สามารถเคลื่อนที่ไปใกล้ผู้เล่นอื่นได้แบบสุ่ม',
		abilityEn: 'Can teleport nearby another player and target them instead at random if their current target is too far away.'
	},
	'Yokai': {
		name: 'Yōkai',
		evidence: ['Fingerprints', 'Freezing', 'Paranormal Motion'],
		description: 'Yōkai are common Japanese spirits that can be found haunting nearly any location. Sensitive to electricity, they become agressive based on how much equipment is turned on.',
		ability: 'ยิ่งใช้อุปกรมากเท่าไหร่ จะเร็วขึ้น',
		abilityEn: 'They become faster and more likely to hunt the more electronic equipment is turned on.'
	},
	'Yurei': {
		name: 'Yurei',
		evidence: ['Freezing', 'Ghost Writing', 'Ghost Orbs'],
		description: 'A Yurei is a ghost that has returned to the physical world, usually for the purpose of acting out revenge, or a deep hatred. They drain sanity faster than other ghosts.',
		ability: 'ทำให้สติของผู้เล่นลดลง 25% เร็วกว่าปกติ',
		abilityEn: 'Drains sanity 25% faster.'
	}
};
