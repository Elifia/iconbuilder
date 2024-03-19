const JOBUPGRADES = {
	0: "job",
	1: "limitBreak",
	2: "relic",
	3: "mastery",
	4: "job",
	5: "ap",
	6: "relic",
	7: "mastery",
	8: "job",
	9: "relic",
	10: "mastery",
	11: "ap",
	12: "mastery",
}

const STATS = {
	vit: "VIT",
	hp: "HP",
	defense: "Defense",
	speed: "Speed",
	fray: "Fray Damage",
	die: "Damage Die",
	basic: "Basic Attack",
}

const CLASSES = {
	"Stalwart": {
		color: "#ED220B",
		traits: [
			{
				name: "Armor 2",
				description: "Reduce all damage taken by 2",
			},
			{
				name: "Fortify",
				description: "Spaces adjacent to you have Rampart. Gain Vigilance +1 at the end of your turn.",
			},
			{
				name: "Rush X",
				description: "Stalwarts can rush as part of their abilities. When you rush, you move X spaces and are unstoppable and immune to all damage during that move.",
			},
		],
		stats: {
			vit: 10,
			hp: 40,
			defense: 6,
			speed: "4 (Dash 2)",
			fray: 4,
			die: "D6",
			basic: "Range 3",
		},
		special: {
			name: "Heroics",
			description: "Stalwarts can push themselves beyond their normal limits, performing heroics and activating any heroic triggered effects of an ability. Each job has different ways of performing heroics.",
		},
		gambit: {
			description: "If you take a Stalwart ability as a non-Stalwart class, you get Heroics, and the ability to trigger a Heroic ability for free once a combat.",
			traits: [],
		},
	},
	"Vagabond": {
		color: "#FDAD00",
		traits: [
			{
				name: "Skirmisher",
				description: "A character with this trait can move diagonally and dash at full speed",
			},
			{
				name: "Dodge",
				description: "Immune to all damage from missed attacks, successful saves, and area effects.",
			},
			{
				name: "Prowl (1 action)",
				description: "Gain stealth. Becomes a free action if no foes are in range 2.",
			},
			{
				name: "Finesse",
				description: "You deal bonus damage to bloodied foes.",
			},
		],
		stats: {
			vit: 7,
			hp: 28,
			defense: 10,
			speed: "4 (Dash 4)",
			fray: 2,
			die: "D10",
			basic: "Range 4",
		},
		special: {
			name: "Finishing Blow",
			description: "Abilities with Finishing Blow triggered effects gain additional, more powerful effects if they target at least one bloodied foe. Effects depend on the action.",
		},
		gambit: {
			description: "If you take a Vagabond Ability as a non-Vagabond class, your vagabond abilities benefit from Finesse.",
			traits: [{
				name: "Finesse",
				description: "Your vagabond abilities deal bonus damage to bloodied foes.",
			}],
		},
	},
	"Mendicant": {
		color: "#60D836",
		traits: [
			{
				name: "Diaga (1 action)",
				description: "Cure a character in range 4. (A character that’s cured gains 4 vigor, or a vigor surge if they are bloodied. Then, they can immediately save agains all statuses, ending them on a success.)",
			},
			{
				name: "Bless (1 action)",
				description: "Grant a blessing token to a character in range 4.",
			},
			{
				name: "Succor",
				description: "Mendicants may use Rescue to bring up a defeated ally at range 4 instead of adjacent.",
			},
		],
		stats: {
			vit: 10,
			hp: 40,
			defense: 8,
			speed: "4 (Dash 2)",
			fray: 3,
			die: "D6",
			basic: "Range 5",
		},
		special: {
			name: "Blessing",
			description: "Certain actions give characters a Blessing token. A character can spend a blessing when making a save to gain +1 boon on that save.<br><br> All Mendicant jobs also have different, alternative ways to spend blessings tokens.<br><br> All blessings are discarded at the end of combat. Blessings are not unique (they don’t ‘belong’ to a character) and as long as a character has blessings from anyone, they can use them for any effects that require blessing tokens, though only one type of blessing at once.",
		},
		gambit: {
			description: "If you take a Mendicant Ability as a non-Mendicant job, you gain this class’ Bless action.",
			traits: [{
				name: "Bless (1 action)",
				description: "Grant a blessing token to a character in range 4.",
			}],
		},
	},
	"Wright": {
		color: "#00A1FF",
		traits: [
			{
				name: "Slip",
				description: "Wright’s movement does not trigger and ignores interrupts, vigilance and rampart.",
			},
			{
				name: "Aetherwall",
				description: "Wrights gain resistance against all abilities from characters that are outside of range 2 from them.",
			},
			{
				name: "Chain Reaction",
				description: "1/round, if a wright damages two or more foes with an ability, they gain 1 Aether after the ability resolves.",
			},
		],
		stats: {
			vit: 8,
			hp: 32,
			defense: 7,
			speed: "4 (Dash 2)",
			fray: 3,
			die: "D8",
			basic: "Range 6",
		},
		special: {
			name: "Aether",
			description: "All Wrights gather Aether during combat, represented by a d6 power die. They passively gain 1 at the start of their turn, starting with 0. Use a d6 to track Aether. Other abilities and Chain Reaction will generate Aether when used. All Aether disperses at the end of combat. <h4>INFUSE X:</h4> Many wright abilities have upgraded versions that can only be cast by Infusing them by spending X Aether as part of the ability. Aether is consumed at the start of the action. Only one infusion can be chosen at once, and only one infuse effect can trigger at at time.<br><br> Infused abilities count as the same ability as the base ability and also benefit from all talents.",
		},
		gambit: {
			description: "If you take a Wright ability as a non-wright class, you get Aether and Chain Reaction.",
			traits: [{
				name: "Chain Reaction",
				description: "1/round, if a wright damages two or more foes with an ability, they gain 1 Aether after the ability resolves.",
			}],
		},
	},
}

const JOBS = {
	// Red Jobs
	"Bastion": {
		class: "Stalwart",
		subtitle: "Unbreakable Knight",
		description: "The Bastions are the shield lords of Arden Eld, larger than life figures that tread the ancient imperial roads with their heads held high and armor gleaming. From town to town they act as errant knights and mercenaries, protecting the weak and vulnerable, and driving back the Blights with hammer-like blows from their greatshields, which they throw like a discus with incredible force. The imperious and mighty presence of a Bastion in town is a stabilizing force and can become an event for a whole village. All Bastions follow an ancient and long-forgotten hero’s code, an old oath to stand against chaos in all its forms.",
		traits: [
			{
				name: "Strive",
				description: "You may cause any ability to trigger its heroic effects when you use it, and increase the distance of any shoves by +1. If you do, after that ability resolves, you can’t use heroics until the end of your next turn, and deal half damage during that turn.",
			},
			{
				name: "Press the Advantage",
				description: "Once a round, when you shove a character, you and an ally of your choice anywhere can each rush 1.",
			},
			{
				name: "Bull’s Strength",
				description: "All your abilities gain collide: deal 2 damage. Characters can’t take this damage more than once a turn.",
			},
			{
				name: "Shieldmaster",
				description: "You have aura 1. If you end your turn with an ally in the aura, gain vigilance +1 and become sturdy until the start of your turn.",
			},
		],
		ultimateTrait: {
			name: "Black Rock Vanguard",
			effect: "You can take any number of interrupts per turn. When you take an interrupt, you may rush 1 after it resolves.",
		},
		limitBreak: {
			name: "Helion",
			resolve: 2,
			action: [
				"1 Action",
			],
			tags: [],
			description: "Your shield becomes the sun: a discus of light and motion, shattering enemy ranks and spurring allies forth.",
			effects: [
				{
					type: "Effect",
					effect: "You hurl your shield, and every character on the battlefield is shoved 1 space in a direction of your choice. You may shove in any order, and may choose different directions for each character. ",
				},
				{
					type: "Effect",
					effect: "Bloodied foes are weakened. Foes at 25% hp or lower are stunned.",
				},
			],
			ultimateName: "Perfect Helion",
			ultimateEffect: "You can repeat this effect once on either allies or enemies.",
		},
		abilities: {
			"Heracule": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
					"Range 3",
				],
				tags: [
					"True Strike",
				],
				description: "Hurl your shield or weapon as a discus with irrepressible force.",
				effects: [
					{
					type: "Attack",
					effect: "On hit: [D] + fray. Miss: fray. ",
					},
					{
						type: "Effect",
						effect: "Attack target is weakened and shoved 1 ",
					},
					{
						type: "Effect",
						effect: "A different foe in range 3 from your target is shoved 1 away from your main target. ",
					},
					{
						type: "Collide or Heroic",
						effect: "Repeat the above effect",
					},
				],
				talents: {
					I: "Heracule’s shoves can be in any direction.",
					II: "Heracule’s second effect triggers +1 more time.",
				},
				mastery: {
					name: "Perfect Heracule",
					effect: "Heracule gains rebound, and its second effect triggers +1 more time.",
				},
			},
			"Battering Ram": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [],
				description: "Use your shield, weapon, or armored fist and send your target flying.",
				effects: [
					{
						type: "Effect",
						effect: "An adjacent character is shoved 2 spaces ",
					},
					{
						type: "Collide or Heroic",
						effect: "Foe is slashed, and refund the action cost of this ability.",
					},
				],
				talents: {
					I: "You may rush 1 before using Battering Ram.",
					II: "You can also shove objects with Battering Ram. The object triggers collide effects on the first character it collides with.",
				},
				mastery: {
					name: "Gate Smasher",
					effect: "Once a turn, if you trigger Battering Ram’s Collide or Heroic effect, the ability can be used one more time this turn.",
				},
			},
			"Land Waster": {
				chapter: 1,
				action: [
					"2 Action",
					"Attack",
					"Burst 1 (target)",
				],
				tags: [],
				description: "Crash your greatshield or weapon into the earth, sending up devastating shockwaves.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: 2[D] + fray. Miss: fray. ",
					},
					{
						type: "Area effect",
						effect: "Foes take fray damage. ",
					},
					{
						type: "Effect",
						effect: "Shove all characters in the area except you 1 space away from your attack target, then, shove your target 1. ",
					},
					{
						type: "Heroic",
						effect: "Gains True Strike and becomes Burst 2 (target)",
					},
				],
				talents: {
					I: "If Land Waster’s effect shockwave shoves 3 or more foes or allies, it shoves +1 and stuns your target.",
					II: "If Land Waster’s effect shockwave shoves 2 or more foes or allies, cure yourself.",
				},
				mastery: {
					name: "Ajax",
					effect: "<b>Terrain Effect:</b> Before Land Waster’s effect triggers, you tear up the very ground, creating a height 1 boulder object in range 3 of you.",
				},
			},
			"Valiant": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [],
				description: "Stride forth, with your shield held before you, battering aside foes.",
				effects: [
					{
						type: "Effect",
						effect: "Rush 1, then rush 1. After each rush, shove all adjacent characters 1. ",
					},
					{
						type: "Collide or Heroic",
						effect: "Rush 1 again, then shove all adjacent characters 1.",
					},
				],
				talents: {
					I: "Collide: Become unstoppable for the rest of your turn",
					II: "If you only shove one foe, they gain hatred of you after this ability resolves.",
				},
				mastery: {
					name: "Second Wind",
					effect: "At round 4 or higher in combat, valiant becomes a free action.",
				},
			},
			"Endless Battlement": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Stance",
					"Aura",
				],
				description: "The land itself is your castle, and you will never let its walls be breached. No matter where your allies step, your shield will be there.",
				effects: [
					{
						type: "Stance",
						effect: "When you enter this stance, or when it refreshes, choose an ally in range 4. That ally gains aura 1 until the start of your next turn. The aura deactivates if your ally is out of range. While the aura is active, you can use the following interrupt:",
						subAbility: {
							name: "Heroic Intervention",
							tags: [
								"Interrupt 1",
							],
							effects: [
								{
									type: "Trigger",
									effect: "A foe targets your ally with an ability",
								},
								{
									type: "Effect",
									effect: "You soar into the air, removing yourself from the battlefield, then return in any space in the aura. Adjacent foes take 2 damage.",
								},
							],
						},
					},
					{
						type: "Refresh",
						effect: "Refresh this stance at the start of your turn ",
					},
					{
						type: "Heroic",
						effect: "Immediately activate the interrupt effect.",
					},
				],
				talents: {
					I: "While you are in the aura, attacks against your ally gain +1 curse.",
					II: "You and your ally both have have counter while you are in the aura.",
				},
				mastery: {
					name: "Perfect Battlement",
					effect: "At round 4 or higher, Endless Battlement has no maximum range, deals 4 damage instead of 2, and becomes interrupt 2.",
				},
			},
			"Catapult": {
				chapter: 1,
				action: [
					"Interrupt 1",
				],
				tags: [],
				description: "Use your shield as a springboard to set up ally maneuvers or to deflect projectiles",
				effects: [
					{
						type: "Trigger",
						effect: "An ally ends a movement in an adjacent space",
					},
					{
						type: "Effect",
						effect: "Shove that ally 2 in any direction.",
					},
					{
						type: "Collide or Heroic",
						effect: "That ally gains 2 vigor and may rush 1.",
					},
				],
				talents: {
					I: "Your shield becomes a valid target for allied abilities. You can expend this interrupt to grant them rebound.",
					II: "Catapult can also be triggered on foes. When triggered on foes, the effect becomes effect: shove 1. Collide: you may rush 1",
				},
				mastery: {
					name: "Mangonel",
					effect: "Catapult becomes Interrupt 3",
				},
			},
			"Perseus": {
				chapter: 2,
				action: [
					"Interrupt 2",
				],
				tags: [
					"Aura",
				],
				description: "Your armor and shield become a mirror, channeling and amplifying the destructive power of your allies’ attacks.",
				effects: [
					{
						type: "Trigger",
						effect: "You are included in an allied area effect.",
					},
					{
						type: "Effect",
						effect: "You release an aura 1 effect centered on you that lasts for the duration of the triggering ability, extending the area effect to encompass the aura. You can choose to be immune to any part of the triggering ability.",
					},
					{
						type: "Heroic",
						effect: "Increase the aura size by +1",
					},
				],
				talents: {
					I: "You gain 4 vigor the first time in a round this ability triggers",
					II: "You can extend the area as a line 5 area effect instead of an aura.",
				},
				mastery: {
					name: "Chaos Finisher",
					effect: "When this interrupt triggers, after the triggering effect resolves, you may deal 2 damage to all affected foes from the triggering ability and shove them 1 in any direction.",
				},
			},
			"Rook": {
				chapter: 2,
				action: [
					"2 Actions",
					"Attack",
				],
				tags: [
					"Aura",
				],
				description: "Your stance is powerful as you strike, and stand tall, an armored sentinel. No enemy can safely set foot where your gaze falls.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: [D]+fray. Miss: fray damage.",
					},
					{
						type: "Effect",
						effect: "Shove 1",
					},
					{
						type: "Effect",
						effect: "You gain aura 1 until the end of your next turn. Any foe in the aura that is shoved is shoved +1. If any foe ends their turn in the aura, you may deal fray damage to them and shove them 1.",
					},
					{
						type: "Collide",
						effect: "Character is slashed.",
					},
					{
						type: "Heroic",
						effect: "Gains true strike, and increase aura to Aura 2",
					},
				],
				talents: {
					I: "You also have counter while Rook’s aura is active.",
					II: "You can also inflict hatred on a foe that triggers Rook’s effect, but no more than once a round.",
				},
				mastery: {
					name: "Implacable Fortress",
					effect: "Allies in the aura also reduce all damage by 2, as if by armor.",
				},
			},
			"Great Giogios": {
				chapter: 3,
				action: [
					"1 Action",
				],
				tags: [
					"End Turn",
				],
				description: "You call a challenge to your foe to stand and fight. Cowards are blown away by your massive charge.",
				effects: [
					{
						type: "Effect",
						effect: "Choose a foe in range 3, then end your turn. At the end of that foe’s turn, you may rush 4, as long as you end each space of your movement closer to them from when you started (if you are adjacent, you don’t move at all). Then, if your foe is adjacent, they are shoved a number of spaces equal to the spaces you just moved, then take damage equal to that number +2.",
					},
					{
						type: "Collide or Heroic",
						effect: "Foe also gains hatred of you after this ability resolves.",
					},
				],
				talents: {
					I: "You gain phasing while rushing. Foes you passed through take 2 damage after your movement resolves, and are shoved 1 to either side of your movement.",
					II: "Allies adjacent to you during any part of this rush are shoved 1 in any direction after this ability resolves.",
				},
				mastery: {
					name: "Dragonslayer",
					effect: "You can choose to Delay Great Giorgios. Your next turn must be slow, but the effect activates at the start of that turn instead of at the end of your target’s turn, and it deals double damage.",
				},
			},
		},
	},
	"Demon Slayer": {
		class: "Stalwart",
		subtitle: "Master of the Forbidden Arts",
		description: "Warriors of impossible strength and insane bravado, demon slayers are warriors that specialize in fighting the largest and most dangerous monsters to crawl out of the pits that riddle the land. They relish in fighting against impossible odds, training themselves in forbidden techniques, arcane arts, and oversized weaponry that normal Kin would quake at wielding. They organize themselves into loose orders and train and hunt together, sharing tales and trophies of the colossal horrors they have slain. Some say in order to fight their quarries, the slayers must ingest demon blood to gain their strength, giving them dark and forbidden power that makes other Kin fear and respect them in equal measure.",
		traits: [
			{
				name: "Demon Edge",
				description: "If you elect to take a slow turn or use a delay effect, gain vigilance +1, and all your abilities deal bonus damage and gain true strike until the end of your next turn.",
			},
			{
				name: "Demon Strength",
				description: "You can make any ability Heroic when you use it. If you do, you can’t attack or use Heroics until the end of your following turn.",
			},
			{
				name: "Hissatsu",
				description: "If you don’t attack during your turn, your next attack ability gains +1 boon, true strike, and upgrades its damage die to d10. This effect ends after you hit with an attack.",
			},
			{
				name: "True Horn",
				description: "You are sturdy from the start of each round until the start of your turn.",
			},
		],
		ultimateTrait: {
			name: "Rangiri",
			effect: "If you trigger Hissatsu twice in a row, your attack ability becomes upgraded further. The entire ability now deals double damage. Roll and determine all damage on the attacker’s end when making it, then double the total before applying it.",
		},
		limitBreak: {
			name: "Split Heaven and Hell",
			resolve: 3,
			action: [
				"1 Action",
				"End Turn", 
			],
			tags: [
				"Delay", 
				"True Strike", 
				"Divine",
			],
			description: "Sever Divinity and cut through the threads of possibility. Pour all your rage into one blow and topple the Gods.",
			effects: [
				{
					type: "",
					effect: "End your turn, and start charging up a god cutting blow.",
				},
				{
					type: "Delay",
					effect: "Your next turn must be slow. At the start of that turn, you may take one of the following options:",
				},
				{
					type: "Sever Divine Thread",
					effect: "Swing your weapon in a line 5 area effect drawn from your position. This counts as using an attack this turn. Characters in the line take damage depending on their distance on the line from you. <ul><li>1 space: 100% of max hp</li> <li>2-4 spaces: 50% of max hp</li> <li>5+ spaces: 25% of max hp</li></ul> Legend characters always take 25% of max hp from this ability instead of other effects.",
				},
				{
					type: "Divine Cancel",
					effect: "You may cancel this ability, refunding the resolve cost, and rush 1. You can limit break again this combat, but not this turn.",
				},
				{
					type: "Divine Delay",
					effect: "You continue to hold this ability. Your next turn must be slow and repeat this delay effect. Each time you do this, increase the width of the line by 1 space, to a maximum of 3 width, and its length by 3 spaces. You cannot attack while holding Divine Delay.",
				},
			],
			ultimateName: "God Waster",
			ultimateEffect: "While holding a God Cutting Blow, you can rush 2 at the start or end of any other turn than yours, but no more than twice a round.",
		},
		abilities: {
			"Demon Cutter": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
					"Line 3", 
				],
				tags: [
					"True Strike",
				],
				description: "You slash your weapon in a deadly swing sending cutting shockwaves out that rip through enemy defenses.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: [D]+ fray. Miss: fray",
					},
					{
						type: "Effect",
						effect: "Attack target is slashed",
					},
					{
						type: "Area effect",
						effect: "Fray",
					},
					{
						type: "Charge or Heroic",
						effect: "Gains range 2, and repeat the area effect in a new line 3 area in range. The areas cannot overlap.",
					},
				],
				talents: {
					I: "Exceed: Gain 6 vigor.",
					II: "You can rush 1 before using Demon Cutter. Charge: Rush 3 instead.",
				},
				mastery: {
					name: "Blood Drinking Devil Blade",
					effect: "After this ability resolves, gain 2 vigor for every foe damaged.",
				},
			},
			"Comet": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 3",
					"Medium Blast",
				],
				tags: [
					"Object",
				],
				description: "Your weapon becomes like a meteor, burning through the air as you hurl at at your foes and smash it into the earth",
				effects: [
					{
						type: "Area Effect",
						effect: "2 damage",
					},
					{
						type: "Effect",
						effect: "After throwing your weapon, it becomes an object placed in the center space of the area, or as close as possible.",
						subAbility: {
							name: "Thrown Weapon",
							tags: [
								"Height 1",
							],
							effects: [
								{
									type: "Object",
									effect: "Space adjacent to it have rampart. While this object is active, you cannot attack. You can pick your weapon up if you enter or exit any space adjacent to it or start your turn there, ending this effect and removing the object. You also pick it up if it’s removed for any other reason.",
								},
							],
						}
					},
					{
						type: "Charge or Heroic",
						effect: "Rush 3 after throwing your weapon.",
					},
				],
				talents: {
					I: "If you end your turn adjacent to your thrown weapon, gain vigilance +1",
					II: "Yourself and allies that end their turn adjacent to your weapon gain 2 vigor.",
				},
				mastery: {
					name: "Exalted Blossoms Devil Blade",
					effect: "Effect: You may teleport to any space adjacent to your weapon at the start and end of your turn.",
				},
			},
			"Draken Cross": {
				chapter: 1,
				action: [
					"2 Actions", 
					"Attack", 
					"Range 3", 
					"Small Blast",
				],
				tags: [],
				description: "Fill the air with the flurry of blades.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: 2[D] + fray. Miss: fray.",
					},
					{
						type: "Area Effect",
						effect: "Fray",
					},
					{
						type: "Effect",
						effect: "You may rush 1, then target another small blast area in range 3 with area effect: fray damage. The areas cannot overlap.",
					},
					{
						type: "Charge or Heroic",
						effect: "Gains true strike, and may repeat the effect.",
					},
				],
				talents: {
					I: "Exceed: Deal fray damage again to all characters in any area created by this ability.",
					II: "Charge: Increase range to 5, and all areas may be increased to medium blasts instead.",
				},
				mastery: {
					name: "Dark Wind Devil Blade",
					effect: "After using this ability, you may teleport to any 	space of any area created, then all foes in any area 	you created with this ability are slashed and take 	2 divine damage.",
				},
			},
			"Righteous Disdain": {
				chapter: 1,
				action: [
					"Interrupt 1",
					"Range 2",
				],
				tags: [],
				description: "With a clap, you deflect a weapon or projectile with your bare hand or the flat edge of your blade.",
				effects: [
					{
						type: "Trigger",
						effect: "A foe uses an ability that targets an ally in range, and damage to your ally has been determined on the foe’s end but not applied yet.",
					},
					{
						type: "Effect",
						effect: "Apply the damage to both you and your ally, but both of you gain resistance to it, and are sturdy against its effects.",
					},
					{
						type: "Heroic",
						effect: "Gain vigor 4 after this ability resolves.",
					},
				],
				talents: {
					I: "You can rush 1 before triggering this ability, and your ally may rush 1 afterwards.",
					II: "Shove the triggering foe and ally each 1 space in any direction after this ability resolves.",
				},
				mastery: {
					name: "Shirahadori",
					effect: "The damage from Righteous Disdain cannot reduce you past 1 hp.",
				},
			},
			"Demon Claw": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"True Strike",
				],
				description: "Even unarmed, a Demon Slayer can employ ferocious strength and unleash blows with their bare hands that can crumple steel.",
				effects: [
					{
						type: "Effect",
						effect: "Rush 1, then rush 1. Each time, you may deal 2 damage to an adjacent foe. Foes can only be damaged once per use of this ability.",
					},
					{
						type: "Special",
						effect: "If you didn’t attack on your turn before using this ability, it deals damage to all adjacent foes.",
					},
					{
						type: "Charge or Heroic",
						effect: "Weaken all adjacent characters after the first or second rush.",
					},
				],
				talents: {
					I: "Instead of any rush from Demon claw, you can gain 2 vigor.",
					II: "After the second rush, you can shove an adjacent character 2 spaces.",
				},
				mastery: {
					name: "Raging Demon",
					effect: "Demon Claw’s damage increases by 1 for every 25% of your maximum hp you are missing, up to a maximum of +3 damage.",
				},
			},
			"Gates of Hell": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [],
				description: "You move so quickly that even your afterimages are capable of deflecting blows.",
				effects: [
					{
						type: "Effect",
						effect: "Rush 2",
					},
					{
						type: "Effect",
						effect: "Gain +1 vigilance. Until the start of your next turn, you gain counter, and may rush 2 after activating vigilance. This effect can trigger any number of times a round, but only once a turn.",
					},
					{
						type: "Heroic",
						effect: "Gain +2 vigilance instead.",
					},
				],
				talents: {
					I: "Gain 2 vigor after any time Gates of Hell’s second effect activates.",
					II: "Vigilance’s range increases by +1 while Gates of Hell is active.",
				},
				mastery: {
					name: "Flash Step",
					effect: "After Gates of Hell resolves, you create an afterimage terrain effect in a free adjacent space. The afterimage is dangerous terrain, but only for foes. You also gain the following ability.",
					subAbility: {
						name: "Flash Step",
						tags: [
							"Free Action",
						],
						effects: [
							{
								type: "Effect",
								effect: "Remove an afterimage that has no characters occupying it, then remove yourself and place yourself in its space.",
							},
						],
					},
				},
			},
			"Soul Blade": {
				chapter: 2,
				action: [
					"1 Action",
				],
				tags: [
					"Stance",
				],
				description: "You imbue your weapon with aether, causing additional cuts at the very aether of your foe.",
				effects: [
					{
						type: "Stance",
						effect: "When entering this stance, gain a d6 power die, starting at 2. <ul><li>When the stance refreshes, tick the die up by 1. </li><li>When you attack, you can tick the die down by any amount to cause an additional aether slash as a line 3 area effect that must include your target, after the attack resolves. The area has true strike. Foes in the area take damage equal to the amount you ticked down. </li><li>If you tick the die down by 3 or more, you also gain vigor equal to the number on the die. </li><li>If you tick the die down by 6, the slash deals +3 more total damage and grants you +3 more total vigor. </li><li>If the die goes to 0, you exit this stance.</li></ul>",
					},
					{
						type: "Heroic",
						effect: "Gain +1 tick on the die for every adjacent foe when you enter this stance.",
					},
					{
						type: "Refresh",
						effect: "This stance refreshes if you end a turn without attacking, or if you start a slow turn.",
					},
				],
				talents: {
					I: "You may also increase the area of any line or arc effects by +1 in Soul Blade, including from this stance.",
					II: "While in Soul Blade, your attacks gain exceed: tick the die up by 1.",
				},
				mastery: {
					name: "Wind Calling Devil Blade",
					effect: "At round 4 or later in combat, soul blade also refreshes at the start of your turn and any area created by it shoves all characters inside 1 space.",
				},
			},
			"Six Hells Trigram": {
				chapter: 2,
				action: [
					"1 Action",
				],
				tags: [
					"Delay",
					"Terrain Effect",
				],
				description: "Using dark arts, you summon up a sliver of the demon world, blocking out a dark arena that traps enemies in its web.",
				effects: [
					{
						type: "",
						effect: "End your turn and gain Terrain effect: Mark out a burst 2 (self) area, then gain Delay: Your next turn must be slow, but at the start of that turn, the trigram activates. <ul><li>When the trigram activates, all foes inside are weakened. </li><li>While active, any foes that attempt to exit the terrain effect during any turn must first pass a save, or become unable to do so until the start of their next turn. If they are moving, they don’t lose their movement but can’t consider the area outside valid space to move to. </li><li>This area lasts until this ability is used again.</li></ul>",
					},
					{
						type: "Heroic",
						effect: "The area has rampart and foes in the area when it activates take fray damage.",
					},
				],
				talents: {
					I: "You have counter and are sturdy while inside the area.",
					II: "Allies inside the area reduce all damage by 2, as if from armor.",
				},
				mastery: {
					name: "Dark Wind Chain",
					effect: "While inside the area, you gain the following ability",
					subAbility: {
						name: "Dark Wind Chain",
						tags: [
							"Free Action",
						],
						effects: [
							{
								type: "Effect",
								effect: "Deal 2 damage to any foe in range 4 and shove them 1 space towards you, then force them to save. On a failed save, they are shoved 2 more spaces towards you.",
							}
						]
					}
				},
			},
			"Wicked Sheath": {
				chapter: 3,
				action: [
					"1 Action",
					"Attack",
				],
				tags: [
					"True Strike",
					"Power Die",
				],
				description: "The master art of the demon slayers - holding a single blow with ultimate patience, until it can slay the most tenebrous of monsters in one stroke.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: fray and shove 1. Miss: fray",
					},
					{
						type: "Effect",
						effect: "After you attack, your weapon becomes charged with energy. At the start of each round, gain a d4 power die at 1, or tick it up by 1. For each tick of the die: <ul><li>increase the base damage on hit of Wicked Sheath by [D] and the shove by 1 </li><li>the attack gains +1 boon.</li></ul> Discard the power die after you hit with any attack.",
					},
					{
						type: "Charge or Heroic",
						effect: "You may also rush 1 before making the attack once for each charge on the die.",
					},
				],
				talents: {
					I: "Also shove your foe 1 for every charge on the die. Collide: Your foe is stunned.",
					II: "Exceed: Draw a line 4 area effect that includes your target. Characters inside other than your target take 2 damage, once, for every charge on the die.",
				},
				mastery: {
					name: "Mugen Shometsu",
					effect: "If the die is 2 or higher and you would discard it, roll it instead of discarding it. On a 1 or 2, keep it, using the new number.",
				},
			},
		}
	},
	"Colossus": {
		class: "Stalwart",
		subtitle: "High Flying Grappler",
		description: "Ferocious followers of Arenheir, the Wolf Titan, the Colossi are a martial order of berserkers, pankrationists, and warriors that reaches across all of Arden Eld. They travel throughout the land seeking powerful foes, and taking trophies to return to their great lodges to offer in tribute to Arenheir in fierce hope of resurrecting their god. At their lodges they feast and drink to their deeds, companions, and boasts.<br><br>Colossi seek glory and challenge through battle, and will often go for only the absolute strongest warriors and monsters, heedless of their own safety. They fight with wild abandon and unconventional techniques that would make even the dirtiest Knave raise an eyebrow.",
		traits: [
			{
				name: "Furious Berserk",
				description: "You go into a furious blood rage as you take damage, giving you the following benefits: <ul><li>You start combat with defiance. </li><li>You have regeneration, and regain regeneration if defeated and rescued. </li><li>While you’re bloodied, you are sturdy, and gain vigilance +1 at the end of your turn.</li></ul>",
			},
			{
				name: "Wolfheart",
				description: "Once a round, you may sacrifice 25% of your max hp to make an ability Heroic and increase the distance of any flight, rush, or dash as part of that move by +1.",
			},
			{
				name: "Pulverize",
				description: "When you start an attack ability on higher elevation than your target, it deals bonus damage. If you are two or more levels higher, it also triggers all exceed effects.",
			},
			{
				name: "Great Leap",
				description: "When you would end any movement on a lower elevation than you started, you may gain flying for the duration of that movement.",
			},
		],
		ultimateTrait: {
			name: "Unbreakable",
			effect: "If defeated, you can rescue yourself and take a turn as normal. This doesn’t take an action and takes place at the start of your turn. In addition, after being rescued in any way, including as part of this trait. you can rush 1 and deal 2 damage to all adjacent characters.",
		},
		limitBreak: {
			name: "Gigantas Crusher",
			resolve: 3,
			action: [
				"2 Actions",
			],
			tags: [
				"Divine",
				"Sacrifice",
			],
			description: "Wrestle with the gods themselves.",
			effects: [
				{
					type: "Effect",
					effect: "You grab an adjacent character. That character must save. Even if that character saves successfully, you grab them, and you both soar into the air. Remove both of you from the battlefield. At the start of that character’s turn, you come spinning back to earth, slamming that character into the battlefield in unoccupied space in range 3 of your original location. You sacrifice 25% of your hp. Your foe takes 50% of their max hp as divine damage, or 25% as divine damage on a successful save. Then place both of you back in or adjacent to that space.<br><br> This ability can be used against Legends, but they may always save, taking divine fray damage and refunding this ability’s resolve cost on a successful save, and only 25% hp as divine damage on a failed save.",
				},
			],
			ultimateName: "Atomos Crusher",
			ultimateEffect: "If you’re at 1 hp or lower, this ability deals 25% more max hp damage to non-legend characters.",
		},
		abilities: {
			"Valkyrie": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
				],
				tags: [
					"True Strike",
				],
				description: "Soaring through the air like a vengeful spirit, you crash into your enemy.",
				effects: [
					{
						type: "Effect",
						effect: "You may fly 1",
					},
					{
						type: "Attack",
						effect: "On hit: [D] + fray. Miss: fray.",
					},
					{
						type: "Effect",
						effect: "Attack target is weakened.",
					},
					{
						type: "Exceed or Heroic",
						effect: "Create a pit under your target.",
					},
				],
				talents: {
					I: "Valkyrie gains range 4.",
					II: "You are unstoppable and immune to all damage while flying with Valkyrie. Charge: You may fly 3 instead",
				},
				mastery: {
					name: "Call of Erenhelion",
					effect: "When you use Valkyrie, all allies may fly 1. If they end this flight on a lower elevation than they started, they may fly 1 again.",
				},
			},
			"Upheaval": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 3",
				],
				tags: [],
				description: "The disciples of the wolf titan exhibit such legendary strength that they can rip up the earth itself with their bare hands.",
				effects: [
					{
						type: "Terrain Effect",
						effect: "Smash the battlefield, creating a height 1 boulder object in free space in range. Adjacent characters are shoved 1 away from the terrain when it appears.",
					},
					{
						type: "Comeback or Heroic",
						effect: "Create difficult terrain underneath any character shoved by this ability.",
					},
				],
				talents: {
					I: "The boulder bounces before landing, dealing 2 damage in a small blast area effect anywhere in range. Charge: Large blast",
					II: "The boulder bounces before landing, creating a pit anywhere in free space in range.",
				},
				mastery: {
					name: "Titan Strength",
					effect: "Gains range 5 and Comeback: Boulder may be placed as a height 2 pillar instead.",
				},
			},
			"Dropkick": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Sacrifice",
				],
				description: "Throwing caution to the wind, you crash your whole body into your foe, sending you both flying.",
				effects: [
					{
						type: "Effect",
						effect: "Fly 1.",
					},
					{
						type: "Effect",
						effect: "Sacrifice 6. An adjacent foe takes [D] +fray damage.",
					},
					{
						type: "Heroic",
						effect: "You may rush 2 before or after using this ability.",
					},
				],
				talents: {
					I: "Comeback: Hit your foe so hard that you create 2 spaces of difficult terrain in adjacent spaces after this ability resolves.",
					II: "Shove your foe 1, then shove yourself 1 away from your foe. Charge: Increase shoves to 2",
				},
				mastery: {
					name: "Giant Kicker",
					effect: "At round 4 or later, dropkick gains true strike and a line 4 area effect that must include your target. The area deals fray damage to all characters other than your target.",
				},
			},
			"Massive Overhead": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"End Turn"
				],
				description: "",
				effects: [
					{
						type: "",
						effect: "End your turn. Your next attack strikes with such force that it deals bonus damage and creates a pit under its target after it resolves.",
					},
					{
						type: "Special Effect",
						effect: "If your target was already in a pit before the triggering attack, it also activates all exceed effects.",
					},
					{
						type: "Comeback or Heroic",
						effect: "Attack may also create a small blast area effect on its target, dealing 2 damage to all characters inside.",
					},
				],
				talents: {
					I: "Attack gains Exceed: Also create a height 1 boulder object adjacent to your foe.",
					II: "Attack gains Exceed: The pit also becomes dangerous terrain.",
				},
				mastery: {
					name: "Blood Rush",
					effect: "At round 4 or later, Massive Overhead also grants you 4 vigor and no longer ends your turn.",
				},
			},
			"": {
				chapter: 1,
				action: [
					"2 Actions",
					"Attack",
				],
				tags: [],
				description: "You deliver a mighty blow with wild abandon, so strong that you yourself are left reeling.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: [D]+fray. Miss: fray",
					},
					{
						type: "Effect",
						effect: "Both you and your foe are stunned. You may sacrifice 4 to avoid this stun.",
					},
					{
						type: "Exceed or Heroic",
						effect: "Gains true strike and creates a pit under your target.",
					},
				],
				talents: {
					I: "You may rush 2 or fly 2 before using Takedown.",
					II: "You can also choose to shove your target 2, then shove yourself 2. Collide: Deal fray damage.",
				},
				mastery: {
					name: "Fierce Elbow",
					effect: "When you takedown a character, the character takes 2 damage once after the ability resolves for each difference in elevation between you and them when you started this ability, for a maximum of three times.",
				},
			},
			"Great Suplex": {
				chapter: 1,
				action: [
					"2 Actions",
				],
				tags: [],
				description: "Wrapping your arms around your foe, you fling the two of you backwards with a force that liquifies rock.",
				effects: [
					{
						type: "Effect",
						effect: "You pick up an adjacent foe, removing them from the battlefield.",
					},
					{
						type: "Effect",
						effect: "Sacrifice up to 6, then fly half that many spaces. Place your foe in a free adjacent space. They take [D]+fray damage and are slashed. Slashed characters are stunned. If you can’t place the foe in a valid space this action can’t be taken.",
					},
					{
						type: "Heroic",
						effect: "Sacrifice cost costs 0 hp but counts as sacrificing 6",
					},
				],
				talents: {
					I: "This ability deals bonus damage to your target if you land them in a pit.",
					II: "You can use this ability on allies. If you do, reduce its action cost to 1, they are immune to its damage and statuses, and both of you can rush 1 after it resolves.",
				},
				mastery: {
					name: "Titanheart",
					effect: "You can target two adjacent characters with this ability",
				},
			},
			"Gigaton Whip": {
				chapter: 2,
				action: [
					"1 Action",
					"Attack",
				],
				tags: [
					"True Strike",
				],
				description: "You fling your foe into a wall, catching them on the rebound.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: [D], Miss: 1 damage.",
					},
					{
						type: "Effect",
						effect: "Shove 2.",
					},
					{
						type: "Collide",
						effect: "You bounce your foe, then and catch them mid air. Remove them from the battlefield, fly 1, then place them in any free adjacent space. They take fray damage.",
					},
					{
						type: "Exceed or Heroic",
						effect: "Smash the ground when you land, creating difficult terrain under your foe and in two adjacent spaces.",
					},
				],
				talents: {
					I: "If your target collides with another character, you may also shove that character 1 and deal 2 damage to them.",
					II: "Fly 2 instead. Charge: Shove 3 and fly 3.",
				},
				mastery: {
					name: "Izuna Drop",
					effect: "Instead of the normal collide effect, on collide you can do the legendary Izuna drop. You take a pose, then end your turn and gain Delay: Your next turn must be slow. At the start of that turn, you may rush 2, then if any foe is adjacent, you grab them, removing both of you from the battlefield, then come spinning back to earth, placing both of you back in free space adjacent to each other in range 3. That foe is weakened, stunned and takes fray damage twice.",
				},
			},
			"Raging Wolf": {
				chapter: 2,
				action: [
					"1 Action",
				],
				tags: [
					"True Strike",
				],
				description: "You deliver a spectacular series of wild, rising blows. Like a cornered animal, your strength becomes greater the more of your blood spills.",
				effects: [
					{
						type: "Special",
						effect: "This ability has no effect if you are not bloodied.",
					},
					{
						type: "Comeback",
						effect: "Gain additional effects depending on your current hp. Each effect stacks and takes place in order. <ul><li>Bloodied: You may rush 1, then deal fray damage to an adjacent foe. That foe is slashed. </li><li>25% or lower: You may fly 1, then shove all adjacent foes 1. </li><li>1 hp or lower: Repeat the above two effects.</li></ul>",
					},
					{
						type: "Heroic",
						effect: "Become unstoppable and immune to all damage while using this ability.",
					},
					{
						type: "Special",
						effect: "If you are defeated, your next use of this ability in the same combat becomes a free action.",
					},
				],
				talents: {
					I: "You can voluntarily reduce yourself to 1 hp before using Raging Wolf.",
					II: "While you’re at 1 hp, increase flight to 3",
				},
				mastery: {
					name: "Beast Within",
					effect: "You can immediately use Raging Wolf as an interrupt before becoming defeated. This ignores the interrupt limit.",
				},
			},
			"Boiling Blood": {
				chapter: 3,
				action: [
					"Interrupt 1",
				],
				tags: [],
				description: "Colossi can lash out with the last of their strength, using the heat and strength of their body to punish their foes before expiring.",
				effects: [
					{
						type: "",
						effect: "",
						subAbility: {
							name: "Defy Death",
							tags: [],
							effects: [
								{
									type: "Trigger",
									effect: "You are defeated",
								},
								{
									type: "Effect",
									effect: "You fight on, remaining standing at 1 hp and do not become defeated until the end of your next turn, or if combat ends before then. During that time, damage cannot reduce you past 1 hp and you deal bonus damage with all abilities.",
								},
								{
									type: "Heroic",
									effect: "Also deal fray damage twice to all adjacent foes.",
								},
							],
						},
					},
				],
				talents: {
					I: "While Defy Death is active, all abilities also trigger all exceed effects.",
					II: "You can rush or fly 1 before using any ability while Defy Death is active.",
				},
				mastery: {
					name: "Great Hemon",
					effect: "When Defy Death would expire, you can take a wound to extend the duration by 1 turn. This effect can only be triggered once per combat.",
				},
			},
		},
	},
	"Knave": {
		class: "Stalwart",
		subtitle: "Absolute Bastard",
		description: "The advent of the Churning Age has coincided with the rise of a certain class of person with heavy pockets and a long list of ‘problems’ to solve. The Knaves are the solution. Hedge knights, rogue warriors, duelists, deserters, and veterans, they roam the land offering their services to whoever has the dust to spare. Though some of them are altruistically minded, they tend to go where the work, food, and fighting is thickest, and never stay for long in one location.<br><br>Knaves operate under a loose moral code and an even looser no-holds-barred fighting style, using hilts, head butts, and gauntleted fists to inflict pain, punishment, and humiliation on their opponents in equal measure. These braggadocios warriors spare no effort in flexing their incredible strength - if the price is right. For a freshly roasted chicken, a pocket full of dust, and a polish of their boots, they’ll do just about anything.",
		traits: [
			{
				name: "Martial Master",
				description: "You can take two stances at once.",
			},
			{
				name: "Blackheart",
				description: "While you’re suffering from a status, gain vigilance +1 at the end of your turn. If you are suffering from two or more, also deal bonus damage with all abilities.",
			},
			{
				name: "Taunt (1 action)",
				description: "A foe in range 3 gains hatred of you.",
			},
			{
				name: "Spite",
				description: "You can choose to use the Heroic effects of any ability when you use it. However, after it resolves, gain Hatred+ of the closest foe to you until the end of your next turn and you can’t use Heroics again for the same duration. If multiple foes are equidistant, you can choose.",
			},
		],
		ultimateTrait: {
			name: "Way of the Crow",
			effect: "If any ally is defeated, cure yourself and become unstoppable until the end of your next turn.",
		},
		limitBreak: {
			name: "Mock",
			resolve: 2,
			action: [
				"1 Action",
			],
			tags: [],
			description: "There is no weapon greater than a well-timed and well-aimed insult.",
			effects: [
				{
					type: "Effect",
					effect: "A foe in range 3 becomes slashed+, weakened+, cannot gain or benefit from evasion, dodge, or stealth, and gains hatred+ of you. These effects continue until the end of their next turn.",
				},
				{
					type: "Special",
					effect: "On elite and legend foes, this ability lasts two turns instead.",
				},
			],
			ultimateName: "Dread Mock",
			ultimateEffect: "Gains range 5 and also deals divine fray damage to your foe.",
		},
		abilities: {
			"Low Blow": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
				],
				tags: [
					"Combo",
					"True Strike",
				],
				description: "Hit them right in the gronch.",
				effects: [
					{
						type: "Effect",
						effect: "You may Rush 1",
					},
					{
						type: "Attack",
						effect: "On hit: [D] + fray. Miss: fray.",
					},
					{
						type: "Effect",
						effect: "Foe is slashed. If they are already slashed, they gain hatred of you.",
					},
					{
						type: "Slay or Heroic",
						effect: "You may cure yourself.",
						subAbility: {
							name: "Combo: The Hook",
							tags: [
								"Gains range 2 and effect",
							],
							effects: [
								{
									type: "",
									effect: "Shove character 1 towards you.",
								},
							],
						},
					},
				],
				talents: {
					I: "Deals bonus damage if your foe is suffering from a status.",
					II: "Comeback: Gain vigilance +1",
				},
				mastery: {
					name: "Sadist",
					effect: "After this ability resolves, you may rush 1 and gain 2 vigor for every status your foe is suffering from.",
				},
			},
			"Provoke": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [],
				description: "You drop your guard, and wait for foes to take the bait.",
				effects: [
					{
						type: "Effect",
						effect: "You may Rush 1, then each adjacent foe deals 1 piercing damage to you, as if damaging you with an ability. You then deal 2 damage, once, for each foe that damaged you this way to all adjacent foes, to a maximum of three times.",
					},
					{
						type: "Heroic",
						effect: "Affects all foes in range 2.",
					},
					{
						type: "Slay",
						effect: "Then, you may shove all affected foes 1 towards or away from you.",
					},
				],
				talents: {
					I: "If this ability only affects one foe, they gain hatred of you.",
					II: "You can sacrifice 2 after this ability resolves to deal 2 damage again to all adjacent foes.",
				},
				mastery: {
					name: "Storm of Fury",
					effect: "Before dealing each instance of damage, you may rush 1.",
				},
			},
			"Revenge": {
				chapter: 1,
				action: [
					"2 Actions",
					"Attack",
				],
				tags: [
					"Combo",
				],
				description: "No matter how hard pressed, your hands, feet, and armor are ready to retaliate.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: [D]+fray. Miss: fray",
					},
					{
						type: "Effect",
						effect: "Gain unstoppable and counter until the end of your next turn",
					},
					{
						type: "Slay or Heroic",
						effect: "While this ability’s effect is active, you can rush 1 as an effect if you are damaged by a foe’s ability, but no more than once a turn.",
						subAbility: {
							name: "Combo: Indignation",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Gains True Strike and replace the base effect with effect: gain +1 vigilance for every status your foe is suffering from, to a maximum of three times, then gain counter until the end of your next turn.",
								},
							],
						},
					},
				],
				talents: {
					I: "While this ability’s effect is active, attacks against adjacent allies gain +1 curse",
					II: "You may sacrifice 4 to gain or lose a combo token after using any version of this ability.",
				},
				mastery: {
					name: "Iron Maiden",
					effect: "Also gains effect: until the end of your next turn, immediately after you activate vigilance, deal 2 damage to all adjacent foes.",
				},
			},
			"Riposte": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Stance",
					"Gamble",
				],
				description: "When you come at a knave, you best not miss.",
				effects: [
					{
						type: "Stance",
						effect: "When you enter this stance or when it refreshes, gain the following interrupt until the start of your next turn:",
						subAbility: {
							name: "Dire Parry",
							tags: [
								"Interrupt 1",
							],
							effects: [
								{
									type: "Trigger",
									effect: "A foe targets an ally in range 2 with an ability.",
								},
								{
									type: "Effect",
									effect: "Gamble, then deal that much damage to your foe. On a 6, they are also slashed and shoved 1. If you have vigilance, you can spend any number of vigilance charges when gambling to roll one extra d6 per charge spent.",
								},
							],
						},
					},
					{
						type: "Refresh",
						effect: "Refresh this stance when a foe damages you or an adjacent ally with an ability.",
					},
					{
						type: "Heroic",
						effect: "Also gain vigor equal to your gamble result after this ability resolves.",
					},
				],
				talents: {
					I: "You can also sacrifice 2 to roll 1 more d6 while gambling.",
					II: "Comeback: Gain vigilance +1 after Riposte resolves.",
				},
				mastery: {
					name: "Strong Left",
					effect: "Refresh Riposte at the start of your turn. Uses of Dire Parry can stack up to 3 times, and you can bank these uses.",
				},
			},
			"Dark Knight": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Stance",
				],
				description: "You give into the heat of battle, becoming a creature of violence and instinct.",
				effects: [
					{
						type: "Stance",
						effect: "While in this stance: <ul><li>You gain hatred+ of the closest foe to you at the start of your turn or when you enter this stance. If multiple foes are equidistant, you may choose. </li><li>You are sturdy </li><li>You gain vigilance +1 at the end of your turn</li></ul>",
					},
					{
						type: "Heroic",
						effect: "On entering this stance, you may gain 2 vigor per status affecting you, including from this stance.",
					},
					{
						type: "Refresh",
						effect: "You may refresh or exit this stance at the start of your turn",
					},
				],
				talents: {
					I: "You may rush 2 towards your hated foe at the start of their turn, but only once a round.",
					II: "While in this stance, you have regeneration.",
				},
				mastery: {
					name: "Infectious Hatred",
					effect: "While in Dark Knight, you have Aura 1. Foes that end their turn in the aura must save or gain hatred of you.",
				},
			},
			"Strongarm": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [],
				description: "Grappling is a common and brutal strategy among the knaves, who will happily hurl their foes into trees, rocks, or their own allies.",
				effects: [
					{
						type: "Effect",
						effect: "Shove an adjacent foe in a full circle either clockwise or counter clockwise through each space around you, phasing through characters. Stop and collide if your foe would hit an obstruction.",
					},
					{
						type: "Effect",
						effect: "Your foe takes 2 damage once for each foe or ally they pass through, to a maximum of 3 times, and those characters are shoved 1. Then, shove your foe 1.",
					},
					{
						type: "Collide",
						effect: "Foes are weakened.",
					},
					{
						type: "Heroic",
						effect: "Shove your foe 1 space, then 1 additional space for every character they passed through instead, to a maximum of 4 extra spaces.",
					},
				],
				talents: {
					I: "Comeback: this ability gains range 2. Remove your target and place them into adjacency before activating this effect.",
					II: "During the spin, you can cause your target to take damage and phase through objects the same way as characters, though those objects are not shoved.",
				},
				mastery: {
					name: "Perfect Strongarm",
					effect: "Perform two full circles instead, and you may rush 2 before the second circle.",
				},
			},
			"Intimidate": {
				chapter: 2,
				action: [
					"1 Action",
				],
				tags: [
					"Mark",
				],
				description: "Swatting interlopers out of the way, you make it your personal vendetta to make someone’s day as miserable as possible.",
				effects: [
					{
						type: "End your turn and Mark",
						effect: "Choose a foe at or further away than range 4.",
					},
					{
						type: "Effect",
						effect: "Each time that foe damages you or an ally with an ability, you may rush 1, ending closer to them if possible, then you may shove any adjacent character 1. This effect can activate any number of times. If you start your turn adjacent to your marked foe, deal fray damage to them, stun them, and then this mark ends. You may also end it at the start of your turn.",
					},
					{
						type: "Heroic",
						effect: "Choose a foe at or further away than range 2.",
					},
				],
				talents: {
					I: "Comeback: Rush 2 instead",
					II: "Your foe also takes 2 damage, once, for every status they are afflicted by when intimidate’s stun triggers, up to a maximum of three times.",
				},
				mastery: {
					name: "Iron Skull",
					effect: "After Intimidate’s stun triggers, also become unstoppable until the end of your next turn.",
				},
			},
			"Sucker Punch": {
				chapter: 2,
				action: [
					"Interrupt 1",
				],
				tags: [],
				description: "There’s nothing that can’t be solved with the liberal application of fists to faces.",
				effects: [
					{
						type: "Trigger",
						effect: "An enemy adjacent to you rolls a save and you see the result",
					},
					{
						type: "Effect",
						effect: "The enemy must re-roll the save, keeping the second result.",
					},
					{
						type: "Heroic",
						effect: "The character rolls the new save with +1 curse",
					},
				],
				talents: {
					I: "You can sacrifice 2 after using this interrupt to immediately regain it.",
					II: "Comeback: This ability is interrupt 2.",
				},
				mastery: {
					name: "Strong Right",
					effect: "You can rush 2 before activating sucker punch, it triggers from within range 2, and you may give it shove 1.",
				},
			},
			"Bleak Mercy": {
				chapter: 3,
				action: [
					"2 Action",
					"Attack",
				],
				tags: [
					"Combo",
				],
				description: "Crush your foes and see them driven before you.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: deal 2[D]+fray. Miss: fray.",
					},
					{
						type: "Effect",
						effect: "Bleak Mercy gains true strike and ignores defiance, armor, and vigor if its target is suffering from 3 or more statuses.",
					},
					{
						type: "Slay or Heroic",
						effect: "Cure yourself, then shove all foes in range 2 1 space in any direction.",
						subAbility: {
							name: "Combo: Sweet Torment",
							tags: [],
							effects: [
								{
									type: "",
									effect: "As above, but replace the base effect with Effect: until the end of your next turn, gain aura 1. Foes in the aura cannot be cured and cannot save to clear statuses.",
								},
							],
						},
					},
				],
				talents: {
					I: "Against characters at 25% hp or lower, this ability cannot miss (turn any miss into a hit).",
					II: "This ability gains range 2 against characters 25% hp or lower and you may rush 2 before using it against those characters.",
				},
				mastery: {
					name: "Painkiller",
					effect: "Once gained, Sweet Torment’s aura lasts indefinitely. If you use Sweet Torment again while the aura is active, deal 2 damage, once, to all foes in the aura within for every status they are suffering from, to a maximum of three times.",
				},
			},
		},
	},

	// Yellow Jobs
	"Fool": {
		class: "Vagabond",
		subtitle: "Masked Avenger",
		description: "Fools are dedicated defenders of the common people of Arden Eld, part folk hero, and part hired killer. They have no official organization, and cover their faces with masks to hide their identity, wearing bells and motley to cover their collections of deadly weapons and explosives.<br><br> Some people fear the Fools, calling them self-interested thugs or anarchic cultists of the Laughing God. They may not be entirely wrong, but none can deny their flair for the theatrical.<br><br> They are feared rightly by all would-be tyrants, under-barons, and aspiring imperial lords. Wherever kin labor under oppression, someone will take up the mask and knives and sent cold jolts of fear into the hearts of the rich and comfortable.",
		traits: [
			{
				name: "Tumbling",
				description: "You may phase through characters. Entering the space of any character, including summons, always costs a maximum of 1 movement.",
			},
			{
				name: "Curse of Chaos",
				description: "You have evasion against characters that are 3 or more spaces away from you.",
			},
			{
				name: "Cheap Trick",
				description: "When an attack misses you, you may teleport 1 space, then leave a bomb in an adjacent space.",
			},
			{
				name: "Stack Dice",
				description: "Once a round, when you trigger a finishing blow or slay effect, gain a Stacked Die after that ability resolves. You can use this die when you gamble to make the gamble result 6, consuming the die. You can only hold on to one Stacked Die at once, and lose all of them at the end of combat.",
			},
		],
		ultimateTrait: {
			name: "Death’s Apprentice",
			effect: "You can hold on to 2 stacked dice at once.",
		},
		limitBreak: {
			name: "Curtain Call",
			resolve: 4,
			action: [
				"2 Actions",
			],
			tags: [
				"Divine",
				"Gamble",
				"True Strike",
			],
			description: "Bring out the fireworks. Fire up the elden magic. Time for a showstopper.",
			effects: [
				{
					type: "Effect",
					effect: "Gamble, then draw a line area effect of that many spaces +2. Soar into the air, removing yourself from the battlefield, then place yourself adjacent to the first foe in that line, delivering a massive blow. This ability has different effects depending on their position on the line. If there are no valid targets after rolling, the resolve cost of this ability is refunded.<br><br> Roll [D] + fray damage once, then apply it the number of times listed.<br><br> 3-5 spaces: x2<br> 6-7 spaces: x3<br> 8 spaces: x4 and character is stunned.",
				},
			],
			ultimateName: "Ultima Curtain Call",
			ultimateEffect: "After this ability resolves, summon half as many bombs as your gamble result anywhere on the battlefield.",
		},
		summons: {
			description: "Many fool abilities summon bombs. When a bomb is summoned, it can be summoned in free space in range 2 unless a different range is specified. You can have a maximum of six active bombs.",
			summons: [
				{
					name: "Bomb",
					tags: [
						"Size 1",
						"Intangible",
					],
					effects: [
						{
							type: "Summon effect",
							effect: "The bomb can be shoved or teleported and can share space with other characters, though it can’t share space with other bombs. When any character enters a bomb’s space, they can remove it from the battlefield. At the end of their turn, they may place it any any free adjacent space. Characters can only carry one bomb at once.",
						},
						{
							type: "Summon effect",
							effect: "Once a round, you may gamble at the end of any other turn than yours, after all bombs have been placed. All bombs explode, dealing damage equal to the gamble result in a small blast area effect centered on them. Characters in the area of multiple explosions are only affected once.",
						},
					],
				},
			],
		},
		abilities: {
			"Cavaliere": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
				],
				tags: [
					"+1 Boon",
				],
				description: "It is not enough to rudely and plainly strike your foe down. One must make it entertaining.",
				effects: [
					{
						type: "Effect",
						effect: "Dash 3, then dash 1 space to the side of your movement. This movement ignores all movement penalties and has phasing. However: <ul><li>You must move if able </li><li>You must move as far as possible </li><li>You cannot move diagonally during this movement.</li></ul>",
					},
					{
						type: "Attack",
						effect: "On hit: [D]+fray. Miss: fray.",
					},
					{
						type: "Effect",
						effect: "Foe is dazed.",
					},
					{
						type: "Finishing Blow or Slay",
						effect: "Summon a bomb",
					},
				],
				talents: {
					I: "If you pass through an ally or summon during this movement, deal bonus damage",
					II: "Allies you pass through during this movement can dash 1.",
				},
				mastery: {
					name: "Pegaso",
					effect: "After Cavaliere resolves, you may fly 4.",
				},
			},
			"Carnevale": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Summon",
				],
				description: "Get the party started.",
				effects: [
					{
						type: "Summon",
						effect: "Summon two bombs in range 2. You may dash 1 after summoning each bomb.",
					},
					{
						type: "Effect",
						effect: "If you end your turn without attacking, you can then immediately gamble to detonate all bombs.",
					},
				],
				talents: {
					I: "Fly 1 after summoning each bomb instead. Charge: Fly 2 instead.",
					II: "You can allow any ally in range 2 to dash 1 before summoning a bomb instead.",
				},
				mastery: {
					name: "Il Caos, La Mia Musa",
					effect: "When you summon a bomb with this ability, you may bounce it it off a character in range, dealing 2 damage, then summon it in range 2 of that character.",
				},
			},
			"Spinning Top": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Gamble",
				],
				description: "A blur of cape, a flash of color, the gleaming of blades.",
				effects: [
					{
						type: "Effect",
						effect: "Gamble, then dash that many spaces +2 in a whirling dance. <ul><li>You must move as far as possible before an obstruction causes you to stop </li><li>You must make all movement in the same direction. </li><li>You cannot move diagonally using this movement </li><li>However, you can interrupt spinning top with any number of other abilities without causing the movement to end.</li></ul>",
					},
					{
						type: "Effect",
						effect: "If you move the maximum distance rolled by Spinning top, gain evasion until the start of your next turn.",
					},
				],
				talents: {
					I: "You can always choose to dash 3 spaces with spinning top after seeing your gamble result.",
					II: "Charge: Spinning top becomes fly instead.",
				},
				mastery: {
					name: "Vortice Di Follia",
					effect: "If you triggered a slay effect during your turn before using spinning top, it becomes a free action.",
				},
			},
			"Death": {
				chapter: 1,
				action: [
					"2 Actions",
					"Attack",
					"Line 6",
				],
				tags: [
					"Unerring",
				],
				description: "A shard of Divine Death, summoned with a snap of the finger.",
				effects: [
					{
						type: "Area effect",
						effect: "Gamble, then count the spaces out from you along the line. The space rolled is the attack space.",
					},
					{
						type: "Attack",
						effect: "Autohit: 2[D]+fray.",
					},
					{
						type: "Area Effect",
						effect: "fray",
					},
					{
						type: "Finishing blow or Slay",
						effect: "Character explodes in a large blast area effect centered on them, dealing fray damage.",
					},
					{
						type: "Special Effect",
						effect: "Death deals 999 divine damage instead to your attack target if they are at 8 hp or less.",
					},
				],
				talents: {
					I: "If there’s a bloodied character in the area, roll 1 more d6 and choose any result.",
					II: "Slay: create a pit under your target, and summon a bomb in the pit.",
				},
				mastery: {
					name: "Ultima Death",
					effect: "Increase death’s threshold to 16 hp or less.",
				},
			},
			"Gallows Humor": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Stance",
					"Power Die",
				],
				description: "The power of Divine Death flows through you, empowering your strikes.",
				effects: [
					{
						type: "Stance",
						effect: "Set out a d6 power die, starting at 1. While in this stance: <ul><li>When this stance refreshes, or when you or an ally anywhere misses or is missed by an attack, tick the die up by 1. </li><li>When the die is at maximum, you may reset it to 1 when you or an ally uses an ability to empower it. The ability deals bonus damage and triggers any slay effects, hit or miss.</li></ul>",
					},
					{
						type: "Refresh",
						effect: "This stance refreshes at the start of your turn.",
					},
				],
				talents: {
					I: "Gallows humor instantly ticks up to maximum if an ally is defeated anywhere.",
					II: "The empowered ability gains effect: deal 4 damage again to any target at 25% hp or lower.",
				},
				mastery: {
					name: "Maestria Mortale",
					effect: "While in this stance, all your abilities with an action cost of 1 or 2 gain slay: all allies may dash 1, then foes adjacent to at least one ally that dashed this way take 2 damage.",
				},
			},
			"Party Favor": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Terrain Effect",
				],
				description: "The Fool’s arsenal is deep, their mirth infinite, and their ability to turn nearly anything into an explosive is legendary.",
				effects: [
					{
						type: "Terrain effect",
						effect: "You throw an explosive mine into a free space in range 3. When any character enters the space, the mine explodes with a medium blast area effect centered on it. When activated, gamble to see the effects, which stack.",
					},
					{
						type: "Then, the mine is destroyed, ending the terrain effect. <ul><li>1-3",
						effect: "Yourself and allies in the area fly 1. Foes take 2 damage. </li><li>4-5: Foes are additionally blinded. </li><li>6: Yourself and allies also gain stealth.</li></ul>",
					},
					{
						type: "Finishing Blow",
						effect: "Foes take 2 damage, twice.",
					},
				],
				talents: {
					I: "Increase flight on yourself to 3",
					II: "Dazed or Blinded foes activate the Finishing Blow effect.",
				},
				mastery: {
					name: "Amico",
					effect: "You can throw the party favor at any character in range instead, making it a mark. You can gamble at the end of any turn after yours to detonate it, ending the mark and effect.",
				},
			},
			"Masquerade": {
				chapter: 2,
				action: [
					"Interrupt 1",
				],
				tags: [],
				description: "The Fool knows how to move unseen, slipping through shifting faces and voices like a fish through water.",
				effects: [
					{
						type: "Trigger",
						effect: "An character uses an ability against you, and there’s a willing ally in range 3",
					},
					{
						type: "Effect",
						effect: "Swap places with your ally, teleporting both of you, and the ability targets your ally instead. If you or your ally can’t make a valid teleport, this interrupt can’t be made.",
					},
				],
				talents: {
					I: "If you haven't acted yet this round, gain evasion after swapping until the end of your next turn.",
					II: "Fly 1, then summon a bomb after swapping",
				},
				mastery: {
					name: "Hall of Mirrors",
					effect: "Masquerade has no maximum range.",
				},
			},
			"Diablo": {
				chapter: 2,
				action: [
					"1 Action",
					"Attack",
					"Range 3",
					"Small Blast",
				],
				tags: [
					"+1 Boon",
					"Unerring",
				],
				description: "A snap of the finger summons the fool’s cross, the mark of the Laughing God, writ in hellish flames.",
				effects: [
					{
						type: "Special",
						effect: "The attack space of this ability is your choice of one of the four edge spaces of the blast.",
					},
					{
						type: "Attack",
						effect: "On hit: [D]. Miss: 1 damage.",
					},
					{
						type: "Effect",
						effect: "Attack target is blinded.",
					},
					{
						type: "Area Effect",
						effect: "Deal 2 damage, once, to all foes in the area for every foe or ally in end spaces of the cross, including the attack space.",
					},
					{
						type: "Finishing Blow or Slay",
						effect: "Cross counts as having +1 foe in an end space.",
					},
				],
				talents: {
					I: "If you catch 2 or more foes or allies in the end spaces of the cross, summon a bomb in the center space if it is free.",
					II: "Allies in the area can fly 1. Charge: Allies in the area can fly 3.",
				},
				mastery: {
					name: "Hell Festival",
					effect: "You can also choose to end your turn, mark out the area effect and gain delay: You must take a slow turn next round. At the start of that turn, the area explodes again, dealing [D] damage to all characters within as an area effect, and summoning a bomb adjacent to each foe in the area.",
				},
			},
			"Chronotemper": {
				chapter: 3,
				action: [
					"1 Action",
				],
				tags: [],
				description: "Laugh at time itself.",
				effects: [
					{
						type: "Mark",
						effect: "Mark self or an ally in range 2. While marked, that character can use the following interrupt:",
						subAbility: {
							name: "Cheat Time",
							tags: [
								"Interrupt 1",
							],
							effects: [
								{
									type: "Trigger",
									effect: "The start or end of any turn other than yours",
								},
								{
									type: "Effect",
									effect: "Gamble, then the marked character dashes a number of spaces equal to the gamble result, 1 space at a time. Each time they finish a dash, they may deal 2 damage to an adjacent foe, but cannot damage the same foe more than once in the same turn.",
								},
							],
						},
					},
				],
				talents: {
					I: "This dash gains phasing and ignores movement penalties from terrain",
					II: "Before and after the dash, fly 1.",
				},
				mastery: {
					name: "Revolution",
					effect: "You can take this interrupt three times a round. The second time you use it, the dash becomes just 2 spaces, and the third time just 1 space.",
				},
			},
		},
	},
	"Freelancer": {
		class: "Vagabond",
		subtitle: "Divine Punisher",
		description: "Freelancers are free-roaming exorcists and hired guns, roaming the land and fighting blights, demons and bandits in the name of justice. They tend to act as wild cards: highly independent, highly effective, and sticking to their codes of honor.<br><br> Freelancers have their history in an ancient disgraced knightly order from one of the Seven Families of the Thrynn. They each wield a bright metal six gun, a bow, or a long rifle with extreme skill, the bullets, shot, or arrows of which they infuse with raw Aether drawn from their very souls. Each weapon is a relic passed down from master to student over the years, and can only be won in a duel with another freelancer. The freelancer’s ultimate weapon is the Astral Chain, a holy gauntlet which they use to purge and bind demons and rogue spirits into their service as Seraphim.",
		traits: [
			{
				name: "Bound Spirit",
				description: "At the start of combat, you may place your seraph in range 2 from you. This summon persists even if you’re defeated.",
				subAbility: {
					name: "Astral Seraph",
					tags: [
						"Size 1",
						"Intangible",
						"Flying",
						"Skirmisher",
					],
					effects: [
						{
							type: "Summon action",
							effect: "The seraph flies 3",
						},
						{
							type: "Summon effect",
							effect: "Once a round, when you score a Critical hit, trigger a Finishing Blow, or trigger an Exceed effect, you may cause the seraph to lash out against all foes at exactly range 3 from the seraph, dealing 2 unerring damage to them.",
						},
					],
				},
			},
			{
				name: "Aether Shot",
				description: "Any attack made on the third and sixth round of combat deals bonus damage and triggers all exceed effects, hit or miss.",
			},
			{
				name: "Trigrammaton",
				description: "Your abilities used against foes at exactly range 3 gain +1 boon on attack rolls and unerring.",
			},
			{
				name: "Astral Binding",
				description: "You can stack up to two marks on characters. As a free action, you can teleport all characters marked by you 1 space.",
			},
		],
		ultimateTrait: {
			name: "Divine Chamber",
			effect: "Your sixth round Aether Shell also deals divine damage",
		},
		limitBreak: {
			name: "Paradiso",
			resolve: 3,
			action: [
				"1 Action",
			],
			tags: [
				"Aura",
			],
			description: "You summon the spirit of your weapon, drawing out the residual soul aether of every single one of its previous users. Ghostly doubles of dozens of your predecessors match your movements, and create an aura of untold power.",
			effects: [
				{
					type: "Aura",
					effect: "You gain an aura of supernatural accuracy, charging your weapons and the weapons of your allies with aether.<br><br> You gain Aura 2 until the end of your next turn. While standing in Paradiso, abilities used by you or allies against foes outside of Paradiso trigger all the following triggered effects: charge, collide, comeback, chain reaction, exceed, finishing blow, slay.",
				},
			],
			ultimateName: "Ultimate Paradiso",
			ultimateEffect: "As a free action ability while Paradiso is active, you can teleport yourself, all allies, and the area itself to any other part of the battlefield, as long as there is free space to place all characters teleported inside the area when it is moved.",
		},
		abilities: {
			"Strafe Shot": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
					"Range 3",
				],
				tags: [
					"+1 Boon",
				],
				description: "Faster than a speeding bullet.",
				effects: [
					{
						type: "Effect",
						effect: "You may dash 1",
					},
					{
						type: "Attack",
						effect: "On hit: [D]+ fray. Miss: fray.",
					},
					{
						type: "Effect",
						effect: "Your foe is blinded.",
					},
					{
						type: "Effect",
						effect: "You may dash 1",
					},
					{
						type: "Finishing blow or Exceed",
						effect: "Release a flurry of fire, dealing 2 unerring damage to all foes at exactly range 3 from you.",
					},
				],
				talents: {
					I: "Exceed: Gain evasion until the start of your next turn.",
					II: "Exceed: Dash 3 again",
				},
				mastery: {
					name: "Platinum Chamber",
					effect: "Strafe shot can interrupt and break up any movement you make without halting it.",
				},
			},
			"Exorcism": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 3",
				],
				tags: [
					"Mark",
					"Power Die",
					"Unerring",
				],
				description: "The mantra of the exorcist. Every bullet or arrow shot is imbued with the soul aether of its master, and seeks its foe like a loyal hound.",
				effects: [
					{
						type: "Mark",
						effect: "You mark a foe in range, with the following effects: <ul><li>When you end your turn in range 3 from your foe, or that foe ends their turn in range 3 of you, set out a d4 power die, starting at 1, or tick it up by 1. </li><li>When you set out the die or tick it up, shoot a projectile at your foe, dealing 2 damage. The projectile remains, hovering in the air, and tracking your foe. </li><li>At the end of any turn the die is at maximum, every projectile shot flies at your foe, dealing 2 damage once for each charge on the die and ending this effect and mark.</li></ul>",
					},
					{
						type: "Finishing Blow",
						effect: "When marking a bloodied foe, immediately gain the die at 1",
					},
				],
				talents: {
					I: "While this mark is active, your attacks gain: Exceed: tick the die up by 1.",
					II: "If your target is defeated while marked by exorcism, the projectiles scatter, dealing 2 damage, once, per charge on the die to all foes in a large blast area effect centered on the foe.",
				},
				mastery: {
					name: "Puresilver",
					effect: "If exorcism's target is defeated, you can cause the projectiles to fly and track a new target in range 3 of you or the original target, transferring the mark and keeping the power die.",
				},
			},
			"Trick Shot": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [],
				description: "Shoot with your heart.",
				effects: [
					{
						type: "Effect",
						effect: "Your next ability with a listed range gains unerring, +1 boon on attacks, and rebound.",
					},
					{
						type: "Finishing blow",
						effect: "Gain stealth after the ability resolves.",
					},
				],
				talents: {
					I: "When Trick shot rebounds off an ally or summon, you may teleport them 2.",
					II: "After Trick shot rebounds, it causes phantom projectiles to split off, dealing 2 unerring damage to all foes at exactly range 3 from its rebound target.",
				},
				mastery: {
					name: "Golden Bullet",
					effect: "Trick Shot can cause an ability to rebound twice. The second bounce must be off a new character or object in range 3 of the first.",
				},
			},
			"Astral Chain": {
				chapter: 1,
				action: [
					"2 Actions",
					"Attack",
					"Range 3",
				],
				tags: [
					"Mark",
				],
				description: "With your heavenly chain skillfully whirling through the air, you dispense divine justice.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: 2[D]+fray. Miss: fray.",
					},
					{
						type: "Mark",
						effect: "Your foe is marked. While marked, at the start of your turn, if they are in range 3, they take 2 unerring damage from you as bolt of celestial lightning shoots between you. If they are at exactly range 3, increase damage to 2 damage, twice instead.",
					},
					{
						type: "Finishing Blow or Exceed",
						effect: "You may fly 4",
					},
				],
				talents: {
					I: "While marked, gain evasion against your marked foe while they are in range 3.",
					II: "While marked, all attacks from you or allies against your marked foe may gain rebound and deal bonus damage if they are rebounded.",
				},
				mastery: {
					name: "Diamond Punisher",
					effect: "While your foe is marked and in range 3 of you, they must save if they attempt to move to any space more than 3 spaces away from you. On a successful save, they can move as normal. On a failed save, they can’t consider any space further away than range 3 of you valid space to move to until the start of their next turn, then become immune to this effect for the rest of combat.",
				},
			},
			"Deus Ex Machina": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 3",
				],
				tags: [
					"Mark",
				],
				description: "When skillfully used, the astral chain can be used to maneuver in the blink of an eye.",
				effects: [
					{
						type: "Mark",
						effect: "Mark and grapple on to a foe, ally, or summon in range from you with an ethereal lasso and gain the following interrupt while that character is marked. You can take the interrupt regardless of distance.",
						subAbility: {
							name: "Divine Intervention",
							tags: [
								"Interrupt 1",
							],
							effects: [
								{
									type: "Trigger",
									effect: "The end of any turn",
								},
								{
									type: "Effect",
									effect: "Teleport 2 towards the target or teleport your target 1 towards you. The teleport must end with both of you closer together. Allies can choose whether to take this teleport.",
								},
							],
						},
					},
				],
				talents: {
					I: "Allies and summons can be teleported up to 4 spaces instead",
					II: "Using this interrupt on a foe dazes or blinds them (your choice).",
				},
				mastery: {
					name: "Whip of the Thrones",
					effect: "Gain stealth after marking your target. This interrupt does not break stealth, and while you have stealth, it can be used +1 more time a round.",
				},
			},
			"Ace": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Stance",
					"End Turn",
				],
				description: "The world goes still, and is split by a bolt of lightning.",
				effects: [
					{
						type: "End your turn and gain Stance",
						effect: "When you take this stance, or when it refreshes, you may dash 1 and your next attack triggers all exceed effects, dazes your foe, and gains unerring.",
					},
					{
						type: "Refresh",
						effect: "Refresh this stance after you score a finishing blow.",
					},
				],
				talents: {
					I: "If your attack target is at exactly range 3, they explode with a medium blast area effect centered on them. Foes inside are dazed.",
					II: "If your attack target is at exactly range 3, you may also teleport them 2 after the attack resolves.",
				},
				mastery: {
					name: "Hot Chamber",
					effect: "At round 4 or later, Ace becomes a free action to enter if you have not used it yet this combat. It also refreshes automatically at the start of your turn, and its dash increases to 3.",
				},
			},
			"Showdown": {
				chapter: 2,
				action: [
					"1 Action",
					"Range 3",
				],
				tags: [],
				description: "With a glint in your eye, you zero in on a foe with preternatural accuracy.",
				effects: [
					{
						type: "Effect",
						effect: "Choose a foe in range 3 and become immobile until the end of your current turn. At the end of that foe’s next turn, if they’re in range 3 of you, you may dash 2, and the effect ends. If they’re at range 4 or higher, they take 2 unerring damage from you twice, ignoring cover.",
					},
					{
						type: "Finishing Blow",
						effect: "Deal 2 damage four times instead.",
					},
					{
						type: "Special",
						effect: "Showdown can be used as free action if you activated an exceed effect or scored a critical hit this turn.",
					},
				],
				talents: {
					I: "Each time you deal damage with showdown, you may teleport 1",
					II: "When you activate showdown, gain stealth.",
				},
				mastery: {
					name: "Quench",
					effect: "Terrain Effect: After activating showdown, you may create a small blast terrain effect on you of smoke. The area grants cover, and yourself and allies exiting the area can gain stealth, but no more than once a round for each character. It lasts until created again.",
				},
			},
			"Warding Bolts": {
				chapter: 2,
				action: [
					"Interrupt 1",
					"Range 3",
				],
				tags: [],
				description: "You rapidly fire a massive barrage from your weapon into the air. The projectiles hover in the air like hunting eagles, waiting to strike.",
				effects: [
					{
						type: "Trigger",
						effect: "You score a critical hit or trigger an exceed effect",
					},
					{
						type: "Terrain Effect",
						effect: "You shoot out a flurry of projectiles into the air, where they hover in place, creating a small blast terrain effect in range, which can overlap characters. Foes that start their turn in the area that end their turn outside of the area are struck by a projectile, taking 2 unerring damage and dazing them. The area lasts until this ability is used again.",
					},
				],
				talents: {
					I: "You can consume the area as a free action to disperse the bolts, dealing 2 unerring damage to all foes at exactly range 3 from the center space of the area, and ending the effect.",
					II: "Marked foes take 2 damage, twice, instead.",
				},
				mastery: {
					name: "Phantom Bolts",
					effect: "You can cause the area to hover around you as an Aura 2 instead, which lasts for the rest of combat, with the same effect as the default area. When this ability triggers again, you may deal 2 unerring damage to all foes in this aura instead of replacing the aura.",
				},
			},
			"Soul Shot": {
				chapter: 3,
				action: [
					"1 Action",
					"Attack",
					"Line 3",
				],
				tags: [
					"+1 Boon"
				],
				description: "The ultimate freelancer technique - using the soul aether of their companions to supercharge astral bullets.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: [D]+fray. Miss: fray.",
					},
					{
						type: "Effect",
						effect: "Foe is blinded.",
					},
					{
						type: "Area effect",
						effect: "fray",
					},
					{
						type: "Effect",
						effect: "Allies are immune to damage from this ability. If it passes through two or more allies, automatically triggers all exceed effects.",
					},
					{
						type: "Finishing Blow or Exceed",
						effect: "Attack target explodes with a large blast area effect placed centered on them. Foes inside take 2 damage and are blinded. Blinded foes take 2 damage twice instead.",
					},
				],
				talents: {
					I: "At round 4 or greater, Soul Shot considers all characters in the line to be at exactly range 3",
					II: "At round 4 or greater, Soul Shot becomes Line 6",
				},
				mastery: {
					name: "Great Angelos",
					effect: "Allies Soul Shot passes through gain 3 vigor and may fly 3.",
				},
			},
		},
	},
	"Shade": {
		class: "Vagabond",
		subtitle: "Nocturnal Assassin",
		description: "Night-walkers, shadow-steppers, and masters of secret scroll arts, the Shades are spies, scouts, and assassins of unparalleled skill. Their number forms a secret and deadly society of Shadow Clans spread across Arden Eld, each practicing and refining the Night Venom Techniques. Joining the shades is presumed to be extremely difficult, but they tend to open their ranks to anyone that has been lost or abandoned.<br><br> The legends say Shades make a deal with the Weeper, the dead titan queen of night and air, and drink her tears, splitting their soul in two. Their shadow becomes animate, bestial and hungry. Over a week and a day, they must fast and train their shadow to obey them, transforming them into agile and silent warriors of the highest order. The Shades say the stories are rumors, and they get along with their Darksides. They do have a tendency to appear when least expected, in uncanny and unsettling ways.",
		traits: [
			{
				name: "Shadow Arts",
				description: "You have phasing and are immune to blinded.",
			},
			{
				name: "Underworld",
				description: "Abilities used against foes in pits, difficult, or dangerous terrain gain unerring and deals bonus damage.",
			},
			{
				name: "Darkside",
				description: "When you first vacate a space on your turn, you may leave a shadow.",
			},
			{
				name: "Meld",
				description: "Once a round, before or after using any ability on your turn, you can swap places with any shadow in range 3, teleporting.",
			},
		],
		ultimateTrait: {
			name: "Umbral Soul",
			effect: "Once a round, one of your allies can swap places with any of your shadows before or after using any ability, teleporting.",
		},
		limitBreak: {
			name: "Abyssal Ecstasy",
			resolve: 2,
			action: [
				"1 Action",
			],
			tags: [],
			description: "A prayer and a drop of blood, and soothing darkness cloaks the battlefield.",
			effects: [
				{
					type: "Effect",
					effect: "Yourself, all allies, and allied summons gain stealth, and all foes are blinded.",
				},
			],
			ultimateName: "Ultima Ecstasy",
			ultimateEffect: "Summon shadows adjacent to all allies.",
		},
		summons: {
			description: "Many shade abilities summon shadows or create shadow clouds. Shadows can be summoned in free space in range 2, unless a higher range is specified. You can have a maximum of six active shadows, and any number of shadow clouds.",
			summons: [
				{
					name: "Shadow",
					tags: [
						"Size 1",
						"Intangible",
					],
					effects: [
						{
							type: "Summon Effect",
							effect: "The shadow can share space other characters, and has different effects on foes and allies: <ul><li>If a foe enters the shadow’s space for any reason or starts their turn there, it it consumed, dealing 2 damage to them, disappearing and turning into a shadow cloud </li><li>If a yourself or an ally enters the shadow’s space, it is consumed. It disappears and grants them stealth.</li></ul>",
						},
					],
				},
				{
					name: "Shadow Cloud",
					tags: [
						"Terrain Effect",
					],
					effects: [
						{
							type: "",
							effect: "Difficult terrain. While inside this terrain space, characters are blinded+. You are immune to these effects.",
						},
					],
				},
			],
		},
		abilities: {
			"Umbra": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
					"Range 3",
				],
				tags: [
					"+1 Boon",
					"Combo",
				],
				description: "By the power of darkness.",
				effects: [
					{
						type: "Effect",
						effect: "You may teleport 3.",
					},
					{
						type: "Attack",
						effect: "On hit: [D]+ fray. Miss: fray.",
					},
					{
						type: "Effect",
						effect: "Your foe is blinded.",
					},
					{
						type: "Finishing Blow",
						effect: "Summon a shadow adjacent to your target.",
						subAbility: {
							name: "Combo: Penumbra",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Teleport your foe up to 3 spaces towards you instead of teleporting yourself. A foe can save to avoid this effect. Blinded foes fail this save",
								},
							],
						}
					},
				],
				talents: {
					I: "Slay: Gain defiance.",
					II: "You can sacrifice 2 or consume a shadow in range 2 of you to gain a combo token after using this move.",
				},
				mastery: {
					name: "Devil Frog Technique",
					effect: "Increase Umbra and Penumbra’s range to 6 and it gains unerring.",
				},
			},
			"Harrow": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 3",
				],
				tags: [
					"Mark",
				],
				description: "You mark your foe with a dire seal. Shadowy tendrils reach out from an unknown space and jerk them like a puppet.",
				effects: [
					{
						type: "Mark",
						effect: "Flick an umbral seal at a character in range 3, marking them. While marked, once a round when you teleport, you can also teleport the marked character 1 spaces and deal 2 damage to them if they’re a foe.",
					},
					{
						type: "Finishing Blow",
						effect: "When marking a bloodied character, immediately trigger the effect, ignoring the round limit.",
					},
				],
				talents: {
					I: "At the start of your turn, you may teleport to any space in range 2 of your target",
					II: "You can also sacrifice 2 or consume a shadow in range 2 of you when marking a foe to also create a pit under them.",
				},
				mastery: {
					name: "Bone Raven Technique",
					effect: "This effect can trigger twice a round by default instead.",
				},
			},
			"Death Blossom": {
				chapter: 1,
				action: [
					"2 Actions",
					"Attack",
					"Range 2",
					"Burst 1",
				],
				tags: [
					"Unerring",
				],
				description: "From beneath a cloak, out from flying sleeves, or hidden in coils of hair - infinite blades. One more sweep, and shadowy bolts of cloth cut through your foes like razors.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: 2[D]+fray. Miss: fray.",
					},
					{
						type: "Area Effect",
						effect: "Fray",
					},
					{
						type: "Finishing Blow",
						effect: "After this ability resolves, create a pit under your attack target. The pit is also a shadow cloud.",
						subAbility: {
							name: "Combo: Flying Sleeves",
							tags: [
								"Area becomes Arc 4",
							],
							effects: [
								{
									type: "Effect",
									effect: "If you catch an ally or allied summon in the area, you and your allies are immune to this ability’s damage and effects, and you may extend the area effect to arc 8.",
								},
							],
						}
					},
				],
				talents: {
					I: "Finishing Blow: Teleport all characters in the area 1.",
					II: "Slay: Teleport 2, then throw knives, dealing 2 damage to up to three foes in range 3.",
				},
				mastery: {
					name: "Shukuchi",
					effect: "You can teleport 2 spaces before and after using this ability.",
				},
			},
			"Nightmare": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 2",
				],
				tags: [
					"Summon",
					"Aura",
				],
				description: "Draw out a fragment of true darkness, roaming and hunting for warmth.",
				effects: [
					{
						type: "Summon",
						effect: "Summon 2 shadows in range 2.",
					},
					{
						type: "Effect",
						effect: "Until the start of your next turn, you gain aura 2. You may consume a shadow in the aura when you or any ally in the aura is targeted by an attack to grant evasion against that attack.",
					},
				],
				talents: {
					I: "When you summon a shadow, you or an ally or allied summon in range 2 may teleport 1.",
					II: "While Umbra’s effect is active, you or allies can rebound abilities off shadows in the aura. Doing so consumes the shadow, removing it.",
				},
				mastery: {
					name: "Hell Centipede Technique",
					effect: "Gain effect: until the start of your next turn, when a shadow is consumed in the aura, you may also create a pit in or adjacent to its space.",
				},
			},
			"Shadow Play": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 2",
				],
				tags: [],
				description: "Using forbidden scroll techniques, you confuse the senses of foes and allies alike.",
				effects: [
					{
						type: "Effect",
						effect: "Choose a character other than yourself in range, then a different character other than yourself in range 3 of that character. Swap their places, removing and placing them. Allies swapped gain stealth. Foes swapped are dazed.",
					},
					{
						type: "Finishing Blow",
						effect: "Repeat the effect.",
					},
				],
				talents: {
					I: "If you swap two foes, you may then teleport them 1 after this ability resolves.",
					II: "If you swap two allies, one of them can gain evasion until the start of their next turn.",
				},
				mastery: {
					name: "Pale Rat Technique",
					effect: "At round 4 or later in combat, Shadow Play becomes a free action",
				},
			},
			"Umbral Echo": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Stance",
					"Power Die",
				],
				description: "You split echoes of your soul into clones that overlay your movements.",
				effects: [
					{
						type: "Stance",
						effect: "You create shadowy copies of yourself, granting a d4 power die, starting at 2. If the die ticks down to 0, end this stance. While in this stance: <ul><li>When you use an ability that targets a foe, you may trigger any finishing blow effects of that ability, then tick the die down by 1.</li><li>After you tick the die down, you may teleport 1</li></ul>",
					},
					{
						type: "Refresh",
						effect: "Refresh this stance if you end your turn with no foes adjacent. When you do, tick the die up by 1.",
					},
				],
				talents: {
					I: "While in this stance, your abilities gain slay: summon a shadow. This effect can only trigger once a round.",
					II: "While in Umbral Echo, you have phasing and entering the space of shadows always costs a maximum of 1 movement.",
				},
				mastery: {
					name: "Bunshin",
					effect: "Gain the following interrupt while in this stance:",
					subAbility: {
						name: "Soul Proxy",
						tags: [
							"Interrupt 1",
						],
						effects: [
							{
								type: "Trigger",
								effect: "You take damage from a foe.",
							},
							{
								type: "Effect",
								effect: "End this stance, consume and remove all shadows in range 2 of you, and immediately gain defiance against the incoming damage. Deal 2 damage, once, to the triggering foe for each shadow consumed this way. You cannot take this stance again for the rest of combat.",
							},
						],
					}
				},
			},
			"Assassinate": {
				chapter: 2,
				action: [
					"1 Action",
					"Range 3",
				],
				tags: [
					"End Turn",
				],
				description: "You step through the air, emerging from the shadow of your foe, where they find only gleaming knives.",
				effects: [
					{
						type: "",
						effect: "End your turn and choose a foe in range. At the end of that foe’s turn, as long as they’re in range 3, teleport to any space adjacent to them and deal 2 damage, three times to them and inflict blinded. Reduce this damage to just 2 damage if they have an adjacent ally. Then, you may kick off them and fly 2.",
					},
				],
				talents: {
					I: "If you’re in stealth, increase all ranges by +2, and doesn’t break stealth.",
					II: "While you’re holding assassinate, you have evasion.",
				},
				mastery: {
					name: "Thousand Year Lizard Technique",
					effect: "At round 4 or later, you can choose two foes with this ability. Trigger its effects in any order.",
				},
			},
			"Nocturne": {
				chapter: 2,
				action: [
					"Interrupt 1",
				],
				tags: [],
				description: "You capture a thin silver thread of spilled life force of a foe and use it to tear open a space of night and cold.",
				effects: [
					{
						type: "Trigger",
						effect: "You trigger a finishing blow effect",
					},
					{
						type: "Terrain Effect",
						effect: "Mark a small blast centered on that character, then create a terrain effect in the area. All spaces of this terrain effect are shadow clouds. This area lasts until this ability is used again.",
					},
				],
				talents: {
					I: "While Nocturne is active, you may teleport up to 2 spaces in or out of the area as a free action.",
					II: "You may sacrifice 2 when the area is created to increase the size of the area to medium blast, or sacrifice 4 to increase it to large blast.",
				},
				mastery: {
					name: "Trap Door Spider Technique",
					effect: "You can weave shadow magic when the area is created to teleport any characters in range 2 of you into any free space inside the area, as long as there is room for that character.",
				},
			},
			"Incubus": {
				chapter: 3,
				action: [
					"1 Action",
					"Attack",
				],
				tags: [
					"Mark",
					"+1 boon",
					"Combo",
				],
				description: "The thirteenth scroll art, a void-sheathed blade that cuts away at the aether of the very soul, leaving a cut that creates slashed darkness.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: [D]+fray. Miss: fray damage.",
					},
					{
						type: "Mark",
						effect: "Mark your foe. While marked, if any foe ends their turn adjacent to your marked foe, or your foe ends their turn adjacent to any other foe, then both the target and any adjacent foes take 2 damage and are dazed. This effect can only trigger once per round.",
					},
					{
						type: "Finishing Blow",
						effect: "Immediately trigger the mark effect, ignoring the round limit.",
						subAbility: {
							name: "Combo: Succubus",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Instead of the mark, gain Effect: deal 3 damage to all characters marked by Incubus, and teleport them 2.",
								},
							],
						}
					},
				],
				talents: {
					I: "Incubus gains range 3. If you make it from stealth, gains range 5.",
					II: "Incubus deals bonus damage for every ally of your target adjacent to your target.",
				},
				mastery: {
					name: "Toxic Widow Technique",
					effect: "Incubus’ mark stacks with other marks. You may mark any number of characters with Incubus. When a character takes damage from an Incubus mark, you may also mark them.",
				},
			},
		},
	},
	"Warden": {
		class: "Vagabond",
		subtitle: "Friend to Beast and Bough",
		description: "The Wardens are the protectors and keepers of the Deep Green, the old and untamed parts of Arden Eld, lorded over by the beasts and the ancient trees. They are both the keepers and the servants of the herd and root, tending to their health, and culling them when it becomes necessary. They sleep under the stars and make their home under bough and root, making staunch allies of the ferocious beasts of the deep wilds through a combination of rigorous training and mutual respect. Their fierce defense of the wild sometimes puts them at odds with civilization, which they tend to have a distaste for.<br><br> Wardens are the keepers of the green kenning, the old ranger arts, that allow one to travel noiselessly, hide in plain sight, live off the land, and become immune to even the most deadly of toxins. They are solitary and powerful fighters. It is not uncommon for a Warden on a long sojourn to go without speaking the tongue of Kin for years at a time.",
		traits: [
			{
				name: "Beast Master",
				description: "At the start of every combat, summon a great beast in range 2, a trained animal companion. This summon persists even if you’re defeated.",
				subAbility: {
					name: "Great Beast",
					tags: [
						"Size 1",
						"Intangible",
					],
					effects: [
						{
							type: "Summon Action",
							effect: "Once during your turn, your beast can dash up to 2 spaces, then may deal 2 damage to an adjacent foe and shove 1.",
						},
						{
							type: "Charge",
							effect: "Repeat the action.",
						},
					],
				},
			},
			{
				name: "Path of the Aesi",
				description: "While you have stealth the dash action becomes a free action.",
			},
			{
				name: "Ambush master",
				description: "Your abilities made from stealth ignore cover, and deal bonus damage.",
			},
			{
				name: "Green Kenning",
				description: "You and your summons ignore all movement penalties from terrain. Any time you grant a dash, it also gains this benefit.",
			},
		],
		ultimateTrait: {
			name: "Deep Stealth",
			effect: "While in stealth, you cannot be directly targeted at all, even from adjacent spaces.",
		},
		limitBreak: {
			name: "Lycanthropy",
			resolve: 3,
			action: [
				"1 Action",
			],
			tags: [
				"Divine",
			],
			description: "You muster up the primal magic of the Deep Green. The power of fang, tooth scale, fur, and claw pours into you, granting you massively increased speed and power.",
			effects: [
				{
					type: "",
					effect: "You become a beast hybrid of primal fury. You gain a greatly enhanced dash, with the following benefits: <ul><li>Dash always becomes a free action. </li><li>All dashes granted as part of any of your abilities, summons, or actions (including this one!) may be increased by +1, and grant phasing while moving. </li><li>When you take the dash action, all allies and allied summons can dash 1. Then, any foe adjacent to one or more characters that dashed this way takes 2 damage.</li></ul>",
				},
			],
			ultimateName: "Ultima Lycanthropy",
			ultimateEffect: "When you shape change, you can also allow allies to partly shift. The first two effects from Lycanthropy affect all allied characters.",
		},
		summons: {
			description: "Many warden abilities summon beasts. When a beast is summoned, it can be summoned in any free space in range 2 unless a different range is listed. Beasts can be summoned in free space in range 2, unless a higher range is specified. You can have a maximum of six active beasts.",
			summons: [
				{
					name: "Beast",
					tags: [
						"Size 1",
						"Intangible",
					],
					effects: [
						{
							type: "Summon Action",
							effect: "All beasts can dash 1 space at the start of your turn.",
						},
						{
							type: "Summon Effect",
							effect: "When you or an ally ends any movement adjacent to a beast’s space, you may cause the beast to pounce at a foe in range 3. That character takes unerring damage equal to their distance from the beast (1-3). Then remove the beast.",
						},
					],
				},
			],
		},
		abilities: {
			"Apex": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
					"Range 3",
				],
				tags: [
					"+1 Boon",
				],
				description: "Your strike is a clarion call to the forest, the plains, and the deep places of the Green, bringing forth their denizens to fight for you.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: [D]+ fray. Miss: fray.",
					},
					{
						type: "Effect",
						effect: "Foe is dazed.",
					},
					{
						type: "Effect",
						effect: "Summon a beast in an adjacent space to your target after the attack resolves.",
					},
					{
						type: "Finishing blow or Charge",
						effect: "Summon one more beast, then gain stealth.",
					},
				],
				talents: {
					I: "Terrain effect: You can replace any beast you summon with a space of dangerous terrain instead.",
					II: "If you attack a foe at exactly range 3, this ability gain unerring and you may shove your foe 1 in any direction after this ability resolves.",
				},
				mastery: {
					name: "Loaded Quiver",
					effect: "If you end your turn without attacking, the next time you use Apex, summon +1 more beasts, and deal 2 damage, once, to your target for every beast you summon.",
				},
			},
			"Gwynt": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [],
				description: "With catlike reflexes, you pounce, spurring allies to action.",
				effects: [
					{
						type: "Effect",
						effect: "Dash up to 2 spaces, then deal 2 damage to an adjacent foe.",
					},
					{
						type: "Effect",
						effect: "An ally or allied summon in range 3 of your foe may also dash 2. If that puts them adjacent to your target, they also deal 2 damage to them.",
					},
					{
						type: "Finishing blow or Charge",
						effect: "You and all chosen allies or summons gain stealth after this ability resolves.",
					},
				],
				talents: {
					I: "If made from stealth, increase the dashes and range of this ability by +1",
					II: "You and your ally or summon may each shove your target 1 space.",
				},
				mastery: {
					name: "Great Gwynt",
					effect: "Increase dashes and ranges by +1, and the effect can be used on an additional ally or allied summon in range.",
				},
			},
			"Circle the Oak": {
				chapter: 1,
				action: [
					"2 Actions",
					"Attack",
				],
				tags: [],
				description: "Ten palm strikes with the heel of the hand or the haft of the axe will shatter even the most tenacious bark.",
				effects: [
					{
						type: "Effect",
						effect: "Dash 2",
					},
					{
						type: "Attack",
						effect: "On hit: 2[D]. Miss: 1 damage.",
					},
					{
						type: "Effect",
						effect: "If you’re adjacent to your foe, dash in a full circle clockwise through every adjacent space to your foe, phasing through allies or allied summons, or as far as possible until stopped.",
					},
					{
						type: "Each time you pass through an ally or summon’s space, deal fray damage to your foe, up to a maximum of four times. Stop if you would enter the space of a foe or obstruction. Finishing Blow or Charge",
						effect: "Increase initial dash to 5. After the ability resolves, you may shove your foe 2.",
					},
				],
				talents: {
					I: "Allies you pass through with Circle the Oak may dash 1 after this ability resolves.",
					II: "If you passed through two or more allies or allied summons, also gain evasion until the end of your next turn.",
				},
				mastery: {
					name: "Timber Split",
					effect: "Enemies no longer stop this move, and you may phase through their spaces. Enemies you pass through are shoved 1, take fray damage, and are dazed.",
				},
			},
			"Mist Strider": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 3",
				],
				tags: [
					"Terrain Effect",
					"Summon",
				],
				description: "Call on the beasts of the deep mists and rains, whose form is shadow and water.",
				effects: [
					{
						type: "Terrain effect",
						effect: "Create small blast misty cloud in free space in range, with the following effects: <ul><li>The spaces of the area always cost a maximum of 1 movement for you and allies to move across, and characters have phasing while moving this way. </li><li>Foes inside are blinded+</li></ul>",
					},
					{
						type: "Clouds created with this ability last until this ability is used again. Charge",
						effect: "Create a second cloud.",
					},
					{
						type: "Summon",
						effect: "At the start of your turn, you can consume a cloud as a free action to condense it into a fey creature, summoning a beast in any of its spaces and ending this effect.",
					},
				],
				talents: {
					I: "Once a round, when you enter or exit the area, you can gain stealth.",
					II: "Foes in the area count all characters as having evasion.",
				},
				mastery: {
					name: "River Guardians",
					effect: "This ability creates a beast inside when an area is created. Foes that start their turn inside the area that end their turn outside of it take 2 damage and are dazed.",
				},
			},
			"Stampede": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 4",
				],
				tags: [
					"Mark",
					"Summon",
				],
				description: "With a bellow or a clenched fist, you summon an immense spirit to pound your enemies.",
				effects: [
					{
						type: "Mark",
						effect: "You mark a foe in range. Once a round, at the end of that foe’s turn, a rampaging spirit beast, charges in from any edge of the battlefield. Create a line area effect drawn from the edge of the battlefield that includes your foe. The beast charges down the line until it enters an adjacent space to your foe, shoving all characters 1 to either side of the line.",
					},
					{
						type: "Summon",
						effect: "Then the beast deals 2 damage to your foe, shoves them 1, then coalesces into a real creature, becoming a beast summon.",
					},
					{
						type: "Collide or Charge",
						effect: "Foes affected take 2 damage after this ability resolves.",
					},
				],
				talents: {
					I: "When you trigger a finishing blow on a foe, you may transfer the mark to them as a free action.",
					II: "If the beast passes through two or more characters before reaching your foe it deals 4 damage and shoves them 2 instead.",
				},
				mastery: {
					name: "Lord of the Steppe",
					effect: "Yourself and allies can ride the beast if it passes through their space, removing themselves from the battlefield instead of taking damage and shove. When it ends its movement, they hop off and must place themselves in an adjacent space, or as close as possible.",
				},
			},
			"Strength of the Pack": {
				chapter: 1,
				action: [
					"2 Actions",
				],
				tags: [
					"Stance",
					"Aura",
				],
				description: "Your senses sync with those of the herd, and you strike as one.",
				effects: [
					{
						type: "Stance",
						effect: "In this stance, gain aura 2. <ul><li>When entering this stance, or when it refreshes, summon a beast in free space in the aura, then you and all allies and summons in the aura may dash 1 space. </li><li>Foes in the aura take +1 damage from summons.</li></ul>",
					},
					{
						type: "Refresh",
						effect: "Refresh this stance at the start of your turn.",
					},
					{
						type: "Special",
						effect: "While adjacent to 3 or more summons, the action cost of this ability is reduced to 1.",
					},
				],
				talents: {
					I: "When you first enter this stance, increase the dash granted to 4.",
					II: "While you have three or more summons in this aura, you have evasion.",
				},
				mastery: {
					name: "Cú Chulainn",
					effect: "Strength of the pack becomes a free action at round 4 or later and its aura affects the entire battlefield.",
				},
			},
			"Underway": {
				chapter: 2,
				action: [
					"1 Action",
				],
				tags: [
					"Terrain Effect",
				],
				description: "You open the greenways to your allies, allowing them to step the branch-paths and cross distances in an instant.",
				effects: [
					{
						type: "Terrain Effect",
						effect: "Create a leafy portal object in a free adjacent space. At the end of your turn, create another portal in a free adjacent space. Portals last until this ability is used again. Portals don’t provide obstruction and can’t stack or be stacked on other objects.",
						subAbility: {
							name: "Underway",
							tags: [
								"Size 1",
								"Object",
							],
							effects: [
								{
									type: "Object Effect",
									effect: "As a free action ability, you and allies can teleport from any space adjacent to an underway to a free adjacent space to any other underway. This ability does not interrupt movement or other action.",
								},
							],
						},
					},
					{
						type: "Charge",
						effect: "Summon a beast each time you create an underway this turn.",
					},
				],
				talents: {
					I: "While you have stealth, you can create a third underway at any point during your turn as a free action. This underway is replaced if created again.",
					II: "When you create an underway, you may create up to three spaces of leafy difficult terrain in adjacent spaces. Allies adjacent to underways have cover.",
				},
				mastery: {
					name: "Bale Portal",
					effect: "Foes that are shoved into portals or that end their turn adjacent to an underway can be teleported to any free space adjacent to any other underway. A foe can pass a save to avoid it, and can only be successfully teleported this way once a round. Bloodied foes fail the save.",
				},
			},
			"Morrigan": {
				chapter: 2,
				action: [
					"1 Action",
				],
				tags: [
					"Delay",
				],
				description: "You call in the winged warriors of the sky to smite your foes.",
				effects: [
					{
						type: "End your turn and gain Delay",
						effect: "Your next turn must be slow. At the start of that turn, you summon a massive flock of winged beasts that lashes out at all characters in range 2. Yourself, allies, and allied summons in range can dash 2, then gain stealth. Foes in range are shoved 2, and are blinded.",
					},
					{
						type: "Collide",
						effect: "Summon a beast.",
					},
				],
				talents: {
					I: "While holding Morrigan, you have cover and ranged attacks against you take +1 difficulty.",
					II: "After Morrigan resolves, some of the winged creatures linger, creating two spaces of dangerous terrain in range 2.",
				},
				mastery: {
					name: "Dark Wing",
					effect: "After Morrigan resolves, you can redirect the flock, creating a small blast terrain effect in range 3. The are is dangerous terrain for foes, and allies in the area have cover. It lasts until this effect is repeated.",
				},
			},
			"Sidhe": {
				chapter: 3,
				action: [
					"1 Action",
					"Attack",
				],
				tags: [
					"+1 Boon",
				],
				description: "Dip your weapons in the toxins of the deadliest creatures to roam the deep green. Mere preparation of this technique requires years of ritual, patience, and training.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: [D]. Miss: 1 damage.",
					},
					{
						type: "Effect",
						effect: "Your foe is blinded.",
					},
					{
						type: "Effect",
						effect: "Your target is injected with a catalyzing toxin. At the end of their next turn, they take 6 damage. Reduce this damage to 3 if they end that turn adjacent to an ally. Then, this effect ends.",
					},
					{
						type: "Finishing Blow or Charge",
						effect: "Shove your target 2",
					},
				],
				talents: {
					I: "Also create a space of dangerous terrain adjacent to your foe after the effect expires.",
					II: "When the effect expires, your foe explodes with a medium blast area effect, dealing 2 damage to all other characters within.",
				},
				mastery: {
					name: "Great Fume Poison",
					effect: "While the toxin’s effect is active, your foe treats all other characters as having cover, evasion and dodge. This effect turns off while they are adjacent to an ally.",
				},
			},
		},
	},

	// Green Jobs
	"Chanter": {
		class: "Mendicant",
		subtitle: "Songweaver of the Great Chant",
		description: "Descending from numerous holy orders that have their roots high in the chronicler monasteries, the chanters are part singer, part storyteller, and part priest. At the time of the Doom, when all knowledge was deemed lost and everything put to page was transformed into ash, the only thing that persisted was the power of song, poetry, and the spirit of survival. A select order of priests committed all the great and necessary knowledge of Kin to memory, creating a single, continuous song, known as the Great Chant. In myths, stories, and histories, they recorded the knowledge of the ancients, transforming it into liturgy.<br><br> The Chant performed its role, and it was through its power that the early bands of Kin survived and persevered through the darkest days. Today, however, it is so archaic, convoluted, and long that many dispute the meaning of its dogma, though none can deny its value as a mythic text. The Old Church of the chroniclers has splintered into factions that mostly squabble over its meaning and try to draw some angle from its numerous and sometimes contradictory adaptions into holy texts.<br><br> Nevertheless, the Chant still holds power - real, tangible power - to heal, mend, and uplift. There are still those that take to the road and use its awesome power for good, ringing the bells of awakening and purification, as they sing to victory.",
		traits: [
			{
				name: "Blessing of Faith",
				description: "Yourself and allies may spend a blessing token when using an ability to gain True Strike on that ability and fly 2 before using it. If they spend 3 tokens, the ability also triggers any charge effects.",
			},
			{
				name: "Songweave",
				description: "You are a mastery of weaving spellsongs together. You can spend a combo token as part of any ability to activate all the charge effects of that ability, even on a regular turn. If that ability was a combo, perform its base version instead of its combo version.",
			},
			{
				name: "Divine Grace",
				description: "Once a round, when you gain or spend a combo token, you may fly 2, then Bless yourself or an ally in range 3 of you.",
			},
			{
				name: "Uplift",
				description: "The first time a round you use any ability that allows you to fly, all allies can fly 1.",
			},
		],
		ultimateTrait: {
			name: "Gran Redempta (2 actions, 1/expedition)",
			effect: "Cure yourself and every ally on the map. Characters that are cured this way are also Rescued if they’re defeated.",
		},
		limitBreak: {
			name: "March of the Saints",
			resolve: 2,
			action: [
				"1 Action",
			],
			tags: [
				"Stance",
			],
			description: "You sing of the deeds of the first heroes, from the Doom. The Great Chant weaves around your allies and transforms them into echoes of those mighty heroes.",
			effects: [
				{
					type: "Stance",
					effect: "You begin weaving an epic song, a saga of legendary heroes. When you take this action, and when this stance refreshes, you may invest an ally in range 5 with the power of one of the great saints. Each saint must be chosen at least once before it can be chosen again. The effect takes place immediately and lasts until the end of their next turn.",
				},
				{
					type: "Refresh",
					effect: "This stance refreshes automatically at the start of your turns. <ul><li>Parzival: An allied character gains flying and cover from all directions. </li><li>Leon: An allied character gains dodge and the ability to move diagonally </li><li>Angrboda: An allied character gains sturdy, and their attacks gain true strike and shove 1 </li><li>Farnese: An ally gains 1 blessing and +1 boon on all attacks and saves.</li></ul>",
				},
			],
			ultimateName: "Divine Investment",
			ultimateEffect: "You also gain the benefit of any chosen saint, lasting until the end of your next turn.",
		},
		abilities: {
			"Holy": {
				chapter: 1,
				action: [
					"1 Action",
					"AttacK",
					"Range 5",
				],
				tags: [
					"Combo",
				],
				description: "You ring the bell of purity and a tone rings out that soothes the peaceful and chastises the violent. A second ring from the bell shatters the tone from the first, breaking open the earth.",
				effects: [
					{
						type: "Effect",
						effect: "Foe is pacified",
					},
					{
						type: "Effect",
						effect: "Cure a character in range 2 of that foe.",
					},
					{
						type: "Charge",
						effect: "Grant 3 vigor to all other characters of your choice in range 2 of your foe.",
						subAbility: {
							name: "Combo: Hades",
							tags: [
								"Gains True Strike and Medium Blast",
							],
							effects: [
								{
									type: "Attack",
									effect: "Autohit: Fray damage",
								},
								{
									type: "Area Effect",
									effect: "Fray damage",
								},
								{
									type: "Terrain Effect",
									effect: "Create a pit under your target",
								},
							],
						},
					},
				],
				talents: {
					I: "After Hades resolves, gamble, then all pits in the area explode for a medium blast area effect, centered on them. Area effect: characters in at least one area take damage equal to half the gamble result.",
					II: "You may fly 1 before using Holy, or 3 when charged.",
				},
				mastery: {
					name: "Magnasancti",
					effect: "Holy creates a small blast terrain effect after resolving. Only one of these areas can be placed at once. Allies have flying in the area, and allies that end their turn in the area may gain 2 vigor.",
				},
			},
			"Felicity": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 5",
				],
				tags: [
					"Mark",
					"Combo",
				],
				description: "You ring the bell of fleeting guardians, and an ally feels their step lifted by invisible wings.",
				effects: [
					{
						type: "Mark",
						effect: "Mark an ally in range. That character gains a blessing and can fly 2. Whenever you spend a combo token, your marked character can fly 2.",
					},
					{
						type: "Charge",
						effect: "That ally gains two blessings instead.",
						subAbility: {
							name: "Combo: Fleet",
							tags: [],
							effects: [
								{
									type: "Effect",
									effect: "An ally in range 5 is blessed and may fly 4. For every foe or ally they pass over during this movement, they gain 2 vigor.",
								},
							],
						},
					},
				],
				talents: {
					I: "When an ally ends any movement from this ability, they can shove all adjacent characters 1.",
					II: "You can fly 1, then shove an adjacent character 1 when granting movement from this ability.",
				},
				mastery: {
					name: "Fantasia",
					effect: "Gain an alternate combo ability. You can choose this ability or Fleet when you spend a token:",
					subAbility: {
						name: "Combo: Fantasia",
						tags: [
							"2 Actions",
						],
						effects: [
							{
								type: "Effect",
								effect: "Remove an ally in range 5 from the battlefield. Return them to the battlefield in their original location or as close as possible at the start of their turn, then they may fly 1.",
							},
							{
								type: "Special",
								effect: "Reduce the action cost of this ability by 1 for every two blessing tokens your target has, down to a minimum of a free action.",
							},
						],
					},
				},
			},
			"Pandaemonium": {
				chapter: 1,
				action: [
					"1 Action",
					"AttacK",
					"Range 5",
					"Medium Blast",
				],
				tags: [
					"Combo",
				],
				description: "You sing a passage of the days of chaos and battle, where the tumult of the battlefield was like the churning of the sea, and divine lightning scathed the land.",
				effects: [
					{
						type: "Attack",
						effect: "Autohit: [D]+fray",
					},
					{
						type: "Area Effect",
						effect: "Remove all characters in the area, then place them back in any other space in the area.",
					},
					{
						type: "Charge",
						effect: "Increase area to Large Blast, and allies in the area gain 4 vigor.",
						subAbility: {
							name: "Combo: Purgatorio",
							tags: [],
							effects: [
								{
									type: "Attack",
									effect: "Autohit: [D]+fray",
								},
								{
									type: "Area Effect",
									effect: "Fray",
								},
								{
									type: "Effect",
									effect: "All pits in the area explode for a medium blast area effect, centered on them. Area effect: fray damage.",
								},
								{
									type: "Effect",
									effect: "Create a pit under the attack target",
								},
							],
						},
					},
				],
				talents: {
					I: "After Pandaemonium resolves, gamble. Shove all characters affected 1 space in any direction. On a 4+, shove them 1 again. On a 6, shove them 1 again.",
					II: "Purgatorio’s damage does not break pacified and its effect causes pits to appear under every pacified foe.",
				},
				mastery: {
					name: "Dulce Purgatorio",
					effect: "This ability deals bonus damage. Pandaemonium’s area effect and Purgatorio’s pit explosion effect extend to all pits on the battlefield.",
				},
			},
			"Aria": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"True Strike",
					"Delay",
				],
				description: "You pose, then deliver a striking performance that resonates through the soul.",
				effects: [
					{
						type: "End your turn and gain delay",
						effect: "your next turn must be slow. At the start of that turn, you deliver a stunning performance, affecting a small blast area effect centered on you. Foes in the area take fray damage twice and are sealed. Sealed or Pacified foes are shoved 1. Allies in the area are cured.",
					},
					{
						type: "Special",
						effect: "If you are damaged by a foe’s ability before the start of that turn, the area becomes a medium blast. If you are damaged again, it becomes a large blast.",
					},
				],
				talents: {
					I: "You may fly 1 when Aria’s special effect triggers.",
					II: "If Aria’s special effect triggers twice, gain defiance and also become unstoppable until the start of your turn.",
				},
				mastery: {
					name: "Power Chord",
					effect: "At round 4 or later, Aria gains charge: free action.",
				},
			},
			"Dervish": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 4",
				],
				tags: [
					"Combo",
				],
				description: "You sing of the comfort of companions, and the dawn that surely will follow.",
				effects: [
					{
						type: "Effect",
						effect: "You fly 1, then whisk an ally in range away with powerful winds, removing them from the battlefield and placing them in any space adjacent to you.",
					},
					{
						type: "Charge",
						effect: "Choose a second ally",
						subAbility: {
							name: "Combo: Dawn",
							tags: [],
							effects: [
								{
									type: "Effect",
									effect: "Gain aura 1 until the end of your next turn. While in the aura, yourself and allies gain +1 boon on saves and can save to end statuses and other effects at the start of your turns instead of the end.",
								},
							],
						},
					},
				],
				talents: {
					I: "A swirling aura 1 of winds surrounds you after taking this ability until the start of your next turn, granting you and allies inside counter.",
					II: "Before you use this ability, you can cause a wind blast, shoving all adjacent foes 1 and dealing 2 damage to them.",
				},
				mastery: {
					name: "Beacon of Hope",
					effect: "You can empower this ability to gain both effects at once and automatically activate their charge effects. This also counts as spending a combo token, though you don’t actually need to spend one. If you empower the ability this way, it cannot be used for the rest of combat.",
				},
			},
			"Symphony": {
				chapter: 1,
				action: [
					"2 Actions",
				],
				tags: [
					"True Strike",
				],
				description: "You ring the bell of thresholds, creating crystalline fragments of the ancient power that courses through the Chant.",
				effects: [
					{
						type: "Terrain Effect",
						effect: "Remove up to four blessings from characters anywhere to create pulsing motes of energy that descend, creating terrain spaces in free space on the map. None can be placed adjacent to each other or overlap. <ul><li>Any character that enters an affected space or starts their turn there detonates the mote, removing it and creating a small blast explosion as an area effect, centered on them. Foes inside take fray damage, and allies inside gain 2 vigor. </li><li>If the character was yourself or an ally, they are blessed and can fly 1. If that character was a foe, they also have a pit created under them.</li></ul>",
					},
					{
						type: "Charge",
						effect: "Create +2 more spaces.",
					},
				],
				talents: {
					I: "When motes explode, they deal 2 damage again to all foes inside and shove them 1 away from the center space if at least one other mote was already exploded this turn.",
					II: "Allies are cured after detonating their second mote in the same turn.",
				},
				mastery: {
					name: "Crescendo",
					effect: "If you create four or more motes with this ability, you can create a mote in range 5 as a free action as part of ending your turn for the rest of combat. This effect does not stack.",
				},
			},
			"Gentleness": {
				chapter: 2,
				action: [
					"1 Action",
				],
				tags: [
					"Stance",
				],
				description: "You radiate an aura of such powerful peace that all close to you, monster or man, find it impossible to raise a hand in violence.",
				effects: [
					{
						type: "Gain Stance",
						effect: "When you take this stance, you have aura 1. All characters (including yourself) in the aura gain +1 curse on attacks and take 1 divine damage each time they deal damage to another character.",
					},
					{
						type: "Refresh",
						effect: "Refresh or exit this stance at the start of your turn.",
					},
				],
				talents: {
					I: "Yourself and allies inside the aura also have counter in this stance.",
					II: "Characters cannot critically hit or be critical hit inside Gentleness’ aura, and also cannot gain, deal, or take bonus damage.",
				},
				mastery: {
					name: "Gentle Prayer",
					effect: "Gains Special Effect: When the aura refreshes, you may increase or decrease the aura size by +1, to a maximum of 3 or a minimum of 1. When you do, foes inside must save or be pacified.",
				},
			},
			"Monogatari": {
				chapter: 2,
				action: [
					"1 Action",
				],
				tags: [
					"Gamble",
				],
				description: "Some chanters also study the Book of Ages, the great mythic chronicle of heroes from the time of the Doom. This unorthodox text inherits some of their ability to sing the chant, granting it tangible power.",
				effects: [
					{
						type: "Effect",
						effect: "Sing a short passage from the book of ages. At the end of your turn, gamble and consult the following table to see which tale you sing. The song resonates in the air until this ability is used again. Yourself or allies that complete the described course of action from the song passage are blessed at the end of their turn they complete it and may fly 2. Characters can only fulfill this condition once per song.",
					},
					{
						type: "Charge",
						effect: "Roll one extra d6 when gambling and choose any result. <ol><li>A Tale of Fury: Reduce a character to 0 hp or reduce them below 50% hp if above. </li><li>A Tale of Travels: Move more than 4 spaces from your starting point on your turn </li><li>A Tale of Green and Pleasant Times: Do not attack </li><li>A Tale of Cunning: Use an interrupt </li><li>A Tale of Boon Companions: End your turn adjacent to an ally </li><li>A Tale of Triumph: Use an ability on an ally</li></ol>",
					},
				],
				talents: {
					I: "You can cause the effect to also apply to foes. Foes that fulfill the condition are sealed.",
					II: "You can spend any number of blessings on characters in range 2 to roll 1 extra d6 per blessing spent when gambling.",
				},
				mastery: {
					name: "Raconteur",
					effect: "Roll 1 extra d6 when gambling, and when gambling, you can choose any two results. Yourself and allies that complete both results in the same turn are also cured.",
				},
			},
			"Chastise": {
				chapter: 3,
				action: [
					"1 Action",
					"Attack",
					"Range 5",
				],
				tags: [
					"Combo",
				],
				description: "You ring the bell of true names, forbidding your foes in august tones against harming an ally.",
				effects: [
					{
						type: "Attack",
						effect: "Auto hit: Fray",
					},
					{
						type: "Effect",
						effect: "Foe is sealed",
					},
					{
						type: "Effect",
						effect: "Choose either yourself or an ally in range. Until the end of your foe’s next turn, if they damage any character chosen with an ability, they take 1 divine damage three times at the end of that turn. Whether this ability triggered or not, this effect then ends.",
					},
					{
						type: "Charge",
						effect: "Choose yourself and an ally in range.",
						subAbility: {
							name: "Combo: Charism",
							tags: [],
							effects: [
								{
									type: "Effect",
									effect: "Choose a foe in range. At the end of that foe’s next turn, either cure or bless allies in a small blast area centered on them (choose). If there were two or more allies in the area, then create a pit under that foe.",
								},
							],
						},
					},
				],
				talents: {
					I: "While either effect from this ability is active, your foe takes 1 divine damage after using any ability that damages another character.",
					II: "While either effect from this ability is active, if your foe defeats any character, they take 1 divine damage three times.",
				},
				mastery: {
					name: "Supreme Forbiddance",
					effect: "The first time you use this ability in a combat, any character chosen is immune to all damage from the chosen foe until the start of your next turn.",
				},
			},
		},
	},
	"Harvester": {
		class: "Mendicant",
		subtitle: "Arbiter of Life and Death",
		description: "Servants of Tsumi, the Moon Titan, the Harvesters are the death priests of Arden Eld. They travel from land to land, sanctifying burial sites, performing funeral rites, and helping lingering spirits move on. The land is full of the malice and unfulfilled wishes of the long suffering dead, and so the services of the harvesters are in high demand.<br><br> Tsumi is the protector of cycles, and so the Harvesters also perform fertility blessings, oversee harvest festivals, and see to the cultivation and protection of the land and nature. They plant flowers over battlefields, and tend groves of beautiful fruit trees planted over graveyards. This dual nature makes Harvesters fierce warriors, able to make the battle bloom or rot with a single swipe of their greatscythes.",
		traits: [
			{
				name: "Blessing of Rebirth",
				description: "Yourself and allies can spend 1 blessing when using any ability to grant it pierce and bonus damage. They may spend 3 blessings instead to additionally trigger any slay effects.",
			},
			{
				name: "Mark of Tsumi",
				description: "At the end of your turn, deal 2 piercing damage to all foes marked by you, and bless either yourself, or all allies marked by you.",
			},
			{
				name: "Gardener of Kin",
				description: "You can stack 2 marks on characters. Foes marked by you take +1 damage from summons.",
			},
			{
				name: "Balance",
				description: "All your abilities gain slay: cure yourself or any ally.",
			},
		],
		ultimateTrait: {
			name: "Defy the Cycle (2 actions, 1/expedition)",
			effect: "You call upon your power to forbid the natural order of life and death from working. Until the start of your next turn, characters cannot be reduced below 1 hp. Divine damage bypasses this ability.",
		},
		limitBreak: {
			name: "",
			resolve: 3,
			action: [
				"Free Action",
			],
			tags: [],
			description: "A flash of the scythe, and the line between life and death is blurred.",
			effects: [
				{
					type: "Summon",
					effect: "You slash an adjacent foe with your weapon, knocking their soul out of their body. Draw a line 4 area effect from your foe facing directly away from you and summon the soul in the last available space.",
					subAbility: {
						name: "Severed Soul",
						tags: [
							"Size 1",
							"Intangible",
							"Immobile",
						],
						effects: [
							{
								type: "Summon Effect",
								effect: "While they have their soul knocked out, foes can act normally. However, the soul can be targeted as if it was the body, transferring all damage or effects it would take to the body, no matter the distance or line or sight. Damage becomes divine. Abilities that are able to target both the body and soul of the foe (such as AoEs) can hit both.",
							},
						],
					},
				},
				{
					type: "",
					effect: "The soul lasts until the end of your next turn, or until the affected character is defeated.",
				},
			],
			ultimateName: "Soul Bloom",
			ultimateEffect: "If the foe is defeated while their soul is out, summon 4 plants anywhere on the battlefield.",
		},
		summons: {
			description: "Many harvester abilities summon thralls or create plants. When a thrall or plant is created, it can be summoned in any free space in range 2 unless a different range is listed. You can have a maximum of six active thralls, any any number of plants.",
			summons: [
				{
					name: "Thrall",
					tags: [
						"Size 1",
						"Intangible",
					],
					effects: [
						{
							type: "Summon Action",
							effect: "At the start of your turn, all your thralls may dash 2 spaces, ignoring difficult terrain, then dealing 1 piercing damage to an adjacent foe. Then, remove each thrall and replace it with a plant.",
						},
					],
				},
				{
					name: "Plant",
					tags: [
						"Terrain Effect",
					],
					effects: [
						{
							type: "Terrain Effect",
							effect: "A plant space is dangerous terrain that only affects foes, and has a blessing token on it, which can be picked up if yourself or an ally enters its space. When the blessing is removed, remove the plant.",
						},
					],
				},
			],
		},
		abilities: {
			"Sow": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
					"Range 4",
				],
				tags: [
					"Mark",
					"Pierce",
					"Combo",
				],
				description: "You throw out a poison seed that bursts into thorny death.",
				effects: [
					{
						type: "Attack",
						effect: "Auto hit: fray",
					},
					{
						type: "Effect",
						effect: "Your foe is sealed.",
					},
					{
						type: "Mark",
						effect: "You foe is marked. When marked, and after you attack your marked foe thereafter, bless yourself or an ally in range 3 of your target.",
						subAbility: {
							name: "Combo: Reap",
							tags: [],
							effects: [
								{
									type: "Attack",
									effect: "On hit: [D]+fray. Miss: Fray",
								},
								{
									type: "Effect",
									effect: "Summon a Thrall adjacent to your target.",
								},
								{
									type: "Slay",
									effect: "Repeat the effect",
								},
								{
									type: "Special",
									effect: "You can make this melee attack against the target marked by sow regardless of distance or line of sight. It also gains unerring if made this way.",
								},
							],
						},
					},
				],
				talents: {
					I: "Effect: If Sow’s marked foe is defeated, it can be transferred to a different foe in range 3 from that foe.",
					II: "Comeback: Reap’s Slay effect triggers.",
				},
				mastery: {
					name: "Spectral Scythe",
					effect: "Reap and Sow also create an arc 4 area effect drawn from your target as the origin space, that cannot include your target. Foes inside take 2 piercing damage, and allies inside gain 2 vigor.",
				},
			},
			"Growing Season": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 4",
				],
				tags: [
					"Mark",
				],
				description: "Blow magical spores in the air, which are disturbed by the chaos of combat. Where they fall, the fruit of life and death blooms.",
				effects: [
					{
						type: "Mark",
						effect: "Mark a character in range. Once a round after that character ends their turn, create a plant adjacent to their space.",
					},
					{
						type: "Effect",
						effect: "If that character is bloodied, repeat this effect. Foes are additionally pacified.",
					},
				],
				talents: {
					I: "Abilities used against a character marked by growing season gain slay: create an Eden vine terrain effect in an adjacent space. The vine is difficult terrain and a pit and creates a plant in its space at the start of the round if there isn't already a plant there.",
					II: "Abilities used against a character marked by growing season gain slay: create a height 1 blood tree object in adjacent space. The tree creates a plant on top of it at the start of the round if there isn't already a plant there.",
				},
				mastery: {
					name: "Soothing Spore",
					effect: "Foes marked by Growing Season are pacified+ while in or adjacent to spaces occupied by plants.",
				},
			},
			"Gravebirth": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Stance",
				],
				description: "Vine and root coil through the deep soil, bringing forth the restless dead.",
				effects: [
					{
						type: "Stance",
						effect: "When you enter this stance, or when it refreshes, Summon a thrall in free space in range 2. While in this stance, you have aura 2, with the following effects: • At the end of your turn, you may consume any blessing tokens in the aura to summon one thrall in the aura per blessing consumed. • At the start of your turn, you can prevent up to three thralls in the area from collapsing into plants.",
					},
					{
						type: "Refresh",
						effect: "Refresh this stance once a round when you trigger a slay effect.",
					},
				],
				talents: {
					I: "When you end your turn, all thralls of your choice burrow, removing them from the battlefield, then you may place them in free space in your aura.",
					II: "At the end of your turn, you may sacrifice 2 to summon an additional thrall.",
				},
				mastery: {
					name: "Recycle",
					effect: "While Gravebirth’s aura is active, as a free action you can cause any two thralls in the aura to collapse into plants to cure an ally in range 4.",
				},
			},
			"Harvest": {
				chapter: 1,
				action: [
					"2 Actions",
					"Attack",
					"Arc 6",
				],
				tags: [],
				description: "You swing with a blade as bright as the new moon.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: 2[D] + fray Miss: fray.",
					},
					{
						type: "Area Effect",
						effect: "Foes take fray damage. Allies are blessed.",
					},
					{
						type: "Slay",
						effect: "Summon a Thrall for each foe in the area, and deal 2 piercing damage again as an area effect to those foes.",
					},
				],
				talents: {
					I: "Allies in the area also gain 2 vigor, or 4 vigor if Harvest’s Slay effect triggers.",
					II: "Gains Range 2. Comeback: Range 5",
				},
				mastery: {
					name: "Harvest Moon",
					effect: "When this ability passes through a plant, you can cause that plant to explode, dealing 2 piercing damage in a small blast area effect centered on each plant, and granting its blessing character to yourself or any other ally in range 3 of that plant. Characters can only be damaged by one of these explosions a turn.",
				},
			},
			"Blood Grove": {
				chapter: 1,
				action: [
					"2 Actions",
					"Range 2",
				],
				tags: [
					"Terrain Effect",
					"Summon",
				],
				description: "The wilderness boils with explosive growth, fed by the blood of the battlefield.",
				effects: [
					{
						type: "Terrain effect",
						effect: "Grow a medium blast area of undergrowth, with its center space in range. The area is dangerous terrain for foes and disappears if you use this ability again.",
					},
					{
						type: "Effect",
						effect: "As long as you are in the area, summon a thrall in or adjacent to the area at the end of your turn for each of these conditions you fulfilled this turn: <ul><li>Triggered a slay effect </li><li>Sacrificed as part of an ability </li><li>Are bloodied</li></ul> Each condition can only trigger once.",
					},
				],
				talents: {
					I: "All spaces of the area cost 0 movement for thralls to enter.",
					II: "Once on your turn you, while inside the area, you can sacrifice 2 to extend the area by 2 spaces, adding to its total area on any edge.",
				},
				mastery: {
					name: "Hungry Grove",
					effect: "Each time you summon a thrall with blood grove, extend the area by 1 space, added to its total area, as long as those spaces are placed adjacent to the area when the effect is triggered.",
				},
			},
			"Rot": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 4",
				],
				tags: [
					"Combo",
					"Mark",
				],
				description: "Leaves shrivel. Hair Curls. Wounds fail to heal.",
				effects: [
					{
						type: "Mark",
						effect: "Mark a foe in range. While marked, that character cannot be cured, cannot gain or benefit from vigor, and gains +1 curse on saves. If that character is at 25% hp or lower when marked, they also lose defiance.",
						subAbility: {
							name: "Combo: Regenerate",
							tags: [],
							effects: [
								{
									type: "Mark",
									effect: "Mark an ally in range. While marked, that character has regeneration. If that character is at 25% hp or lower when marked, they also gain defiance.",
								},
								{
									type: "Special",
									effect: "This mark can be placed even if Rot is already active.",
								},
							],
						},
					},
				],
				talents: {
					I: "Characters marked by regenerate gain comeback: summon a plant in an adjacent space at the start of their turn.",
					II: "Foes that start their turn adjacent to a character marked by Rot take 2 piercing damage.",
				},
				mastery: {
					name: "Regrowth",
					effect: "Gain an alternate combo action:",
						subAbility: {
							name: "Regrowth",
							tags: [],
							effects: [
								{
									type: "Mark",
									effect: "Mark a character in range 4. If that character would be defeated before the start of your next turn, they are instantly rescued after being defeated, then gain a vigor surge and become unstoppable until the end of their next turn. Then, even if this effect didn’t trigger, summon a plant in an adjacent space to them and end this mark.",
								},
							],
						},
				},
			},
			"Crimson Bloom": {
				chapter: 2,
				action: [
					"1 Action",
					"Range 4",
				],
				tags: [
					"Mark",
					"Summon",
					"Power Die",
				],
				description: "You release a rapidly growing seed of the Thornwillow, the blood-fatted plant of the harvesters whose sap is a powerful intoxicant.",
				effects: [
					{
						type: "Mark",
						effect: "Mark a character in range. At the end of any turn that character took damage, or after they attack, set out a d6 power die or increase the die by 1. When the die would tick to 6, consume it. The marked character sacrifices 6, but then gains 6 vigor, deals bonus damage with all abilities, and becomes unstoppable until the end of their next turn.",
					},
					{
						type: "Effect",
						effect: "When the die is consumed, summon a plant, and pass this mark to a new character of your choice in in range 3 of the original character. You must pass the mark if possible. If there are no valid characters, the mark ends.",
					},
				],
				talents: {
					I: "If Crimson Bloom’s damage would reduce an ally to 1 hp or below, they also gain defiance.",
					II: "Foes at 25% hp or lower sacrifice 10 instead.",
				},
				mastery: {
					name: "Mother Bloodwillow",
					effect: "At round 4 or later, Crimson Bloom becomes a free action and its power die starts at 3 ticks.",
				},
			},
			"Fairy Ring": {
				chapter: 2,
				action: [
					"1 Action",
				],
				tags: [
					"End Turn",
					"Terrain Effect",
				],
				description: "You cast out a handful of aether-feeding fungi, holy spores that grow into a ringed garden of colorful and deadly mushrooms.",
				effects: [
					{
						type: "Terrain Effect",
						effect: "End your turn and create a ring of mushrooms, a burst 2 (self) terrain effect. The ring can be created overlapping any terrain and underneath characters. While the ring is active, gain the following interrupt. The ring lasts until this ability is used again.",
						subAbility: {
							name: "Spirit Away",
							tags: [
								"Interrupt 2",
							],
							effects: [
								{
									type: "Trigger",
									effect: "A foe enters or exits the area.",
								},
								{
									type: "Effect",
									effect: "Teleport that foe 2 and seal them. This interrupts but does not end their movement.",
								},
							],
						},
					},
				],
				talents: {
					I: "Foes cannot gain vigor inside of the ring, and lose all vigor if they start their turn there.",
					II: "You can use Spirit Away on allies. If you do, it doesn’t seal them.",
				},
				mastery: {
					name: "Spore Shroud",
					effect: "Whenever the rings’ interrupt activates, create a height 1 Megamushroom object anywhere inside or adjacent to the area. The object has a blessing token on it and counts as a plant, but isn’t removed if the token is removed.",
				},
			},
			"Dark Sliver": {
				chapter: 3,
				action: [
					"1 Action",
					"Attack",
					"Range 2",
				],
				tags: [],
				description: "The blade edges of the harvesters are so sharp they can cut the very soul.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: [D]+fray. Miss: fray damage.",
					},
					{
						type: "Terrain effect",
						effect: "Cut away a part of the target’s soul, choosing a free space in range 3 of your foe. If the foe is not occupying that space at the end of their next turn, they take 2 piercing damage, are pacified, and summon a plant in that space.",
					},
					{
						type: "Slay",
						effect: "Create a plant in range 3 of your foe.",
					},
				],
				talents: {
					I: "Comeback: Deal bonus damage, and increase all ranges by +1",
					II: "Sacrifice 2: Ability gains range 6",
				},
				mastery: {
					name: "Recycle",
					effect: "Dark Sliver can summon a mote of life instead of any regular plant. A mote of life is a plant, but becomes a terrain effect when its blessing is removed. Inside, any ally gains regeneration while standing in its space.",
				},
			},
		},
	},
	"Sealer": {
		class: "Mendicant",
		subtitle: "Holy Judge and Purger of Evil",
		description: "Traveling priests, monks, judges, and doctors, the Sealers roam the world from village to village, performing necessary rituals, marriages, ceremonies, and yearly festivals. They are a welcome sight in most villages, and most perform the important function of traveling judge and medium, acting as an impartial party translating for the will of the local spirits. They often travel with many blessed relics of the deities of the land or even portable shrines on their back.<br><br> In their other role, Sealers are legendary monster hunters and exorcists of unbelievable prowess and unshakeable faith. Whenever an especially bad blight or an arch demon appears, the Sealers are usually there to drive it back with ancient sealing magic, blessed brands, and flaming weapons.",
		traits: [
			{
				name: "Blessing of War",
				description: "Yourself or allies can spend a blessing when they use an ability to gain +1 boon on attacks and bonus damage with that ability. If they consume 3 blessings, it additionally triggers all exceed effects.",
			},
			{
				name: "Mantra of Sealing",
				description: "Your attacks bless all adjacent allies to you and grant them 2 vigor.",
			},
			{
				name: "Godly Smite",
				description: "You steadily gather power as you fight. You start combat with a mantra power die, a d6 that starts at 1, and ticks up by 1 at the start of every round, to a maximum of 6. You gain the following interrupt:",
				subAbility: {
					name: "Godly Smite",
					tags: [
						"Interrupt 1"
					],
					effects: [
						{
							type: "Trigger",
							effect: "You or an ally makes an attack roll, and you see the total result (after boons, curses, and other adjustments).",
						},
						{
							type: "Effect",
							effect: "Add the number on your mantra die to the attack roll, which changes the final result. That foe also takes damage again after the attack resolves equal to the number on your mantra die.",
						},
					],
				},
			},
			{
				name: "Martial Arts",
				description: "You have dodge",
			},
		],
		ultimateTrait: {
			name: "Great Spirit Festival (1 action, 1/expedition)",
			effect: "Bless all allies on the map and grant them 2 vigor. If they’re bloodied, repeat this effect.",
		},
		limitBreak: {
			name: "Passage to the Afterlife",
			resolve: 5,
			action: [
				"2 Actions",
				"Attack",
			],
			tags: [
				"Divine",
				"+1 Boon",
			],
			description: "You unleash the supreme Sealer war art, inflicting ten thousand blows and shattering the connections of your foe’s vital energy to their body, hurrying on the transmigration of immortal souls.",
			effects: [
				{
					type: "Attack",
					effect: "On hit: [D]+fray, three times. Miss: Once.",
				},
				{
					type: "Exceed",
					effect: "Deal [D]+fray two more times.",
				},
				{
					type: "Effect",
					effect: "You may teleport adjacent to the target before the attack if they’re in range 3. Every ally in range 3 of the target can also teleport adjacent to your target, or as close as possible. Your target then takes 2 additional divine damage, once, per adjacent ally.",
				},
			],
			ultimateName: "Reach Heaven Through Violence",
			ultimateEffect: "The teleport effect has the range of the battlefield for both allied characters and yourself. If your target is at or under 25% hp, they take 2 divine damage twice for each adjacent ally instead.",
		},
		abilities: {
			"God Hand": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
				],
				tags: [
					"Combo",
				],
				description: "Divine energy infuses you, allowing hammer-like blows that would fell a demon with even your bare hands.",
				effects: [
					{
						type: "Effect",
						effect: "Teleport 1",
					},
					{
						type: "Attack",
						effect: "On hit: [D]+fray. Miss: fray damage.",
					},
					{
						type: "Effect",
						effect: "Seal your foe, then bless yourself or ally in range 2",
					},
					{
						type: "Exceed",
						effect: "You and allies in range 2 gain 3 vigor",
						subAbility: {
							name: "Combo: Devil Hand",
							tags: [
								"+1 Boon"
							],
							effects: [
								{
									type: "Effect",
									effect: "Teleport 1",
								},
								{
									type: "Attack",
									effect: "On hit: [D]+fray. Miss: fray damage.",
								},
								{
									type: "Effect",
									effect: "Character explodes in a medium blast area effect centered on them, dealing 1 divine damage to all foes.",
								},
								{
									type: "Exceed",
									effect: "Repeat the effect",
								},
							],
						},
					},
				],
				talents: {
					I: "All versions of this ability gain Exceed: Gain evasion until the end of your next turn",
					II: "Increase teleports to 2, and all version of this ability gain Slay: gain or lose a combo token.",
				},
				mastery: {
					name: "Fists of Heaven and Hell",
					effect: "Add an alternate combo action. It gains all talent effects of this ability",
					subAbility: {
						name: "",
						tags: [
							"+1 Boon",
						],
						effects: [
							{
								type: "Effect",
								effect: "Teleport 1",
							},
							{
								type: "Attack",
								effect: "On hit: [D]+fray. Miss: fray damage",
							},
							{
								type: "Effect",
								effect: "Seal your foe, then bless yourself or an ally in range 2",
							},
							{
								type: "Effect",
								effect: "Character explodes in a medium blast area effect centered on them, dealing 1 divine damage to all foes.",
							},
							{
								type: "Exceed",
								effect: "Repeat all effects",
							},
						],
					},
				},
			},
			"Grand Seal": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 4",
				],
				tags: [
					"Mark",
				],
				description: "Bind an enemy in an astral seal, condemning them and crushing them under the weight of their own evil.",
				effects: [
					{
						type: "Mark",
						effect: "A foe in range becomes sealed and marked. While marked, after they use an ability that damages an ally of yours, they take 2 divine damage. A foe can pass a save at the end of their turn to end this mark.",
					},
				],
				talents: {
					I: "Bloodied foes gain +1 curse on saves while marked.",
					II: "Bloodied foes are also pacified+ while marked.",
				},
				mastery: {
					name: "Milk Sutra",
					effect: "When this mark ends, if there is a new foe in range 3 of your target, you may transfer it to that foe.",
				},
			},
			"Matsuri": {
				chapter: 1,
				action: [
					"2 Actions",
					"Attack",
				],
				tags: [],
				description: "Swing your weapon in a flaming arc that sends sprays of fire in bright displays, lighting up the sky.",
				effects: [
					{
						type: "Effect",
						effect: "Teleport 2. Allies in range 2 may teleport 1.",
					},
					{
						type: "Attack",
						effect: "On hit: 2[D] + fray. Miss: fray.",
					},
					{
						type: "Exceed",
						effect: "Create a large blast explosion area effect centered on your foe. Yourself and allies inside gain 3 vigor. Foes take 2 divine damage.",
					},
				],
				talents: {
					I: "Increase teleports by +1 and gains Slay: Repeat the teleport effect.",
					II: "Bloodied foes take bonus damage and must also save or be stunned.",
				},
				mastery: {
					name: "Blood Festival",
					effect: "The first time you use Matsuri in a combat, you may increase all its teleports by +2, it deals bonus damage, and it triggers all exceed effects.",
				},
			},
			"Spirit Shrine": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [],
				description: "Many sealers carry portable shrines to the local spirits, adding on talismans, images, icons, or offerings to whichever small god holds dominion over the areas they travel through. In a pinch, they can set these shrines down and beseech the spirits for aid.",
				effects: [
					{
						type: "",
						effect: "Create a shrine in a free adjacent space. The shrine can be placed on other objects, and lasts until this ability is used again without increasing its height (see below).",
						subAbility: {
							name: "Shrine Height",
							tags: [
								"1 Object"
							],
							effects: [
								{
									type: "Object effect",
									effect: "Aura 2. You can use this ability again while adjacent to your shrine to increase its size, increasing the height by +1. The shrine gains additional benefits equal to its total height, including other objects it is stacked on: • 1: Yourself and allies in the aura have cover from characters from the outside and gain +1 boon on attack rolls. • 2: Yourself and allies in the aura gain 2 vigor when you end your turn there. • 3+: Yourself and allies in the aura have evasion.",
								},
							],
						},
					},
				],
				talents: {
					I: "If you or an ally ends their turn inside the Shrine’s aura and didn’t attack, they are blessed and gain 2 vigor.",
					II: "Foes that use any ability inside the shrine’s aura can be teleported 1 after the triggering ability resolves.",
				},
				mastery: {
					name: "Spirit Patronage",
					effect: "Gain the following interrupt",
					subAbility: {
						name: "Grace of the Spirits",
						tags: [
							"Interrupt 1"
						],
						effects: [
							{
								type: "Trigger",
								effect: "An ally in the aura is damaged by an foe’s ability",
							},
							{
								type: "Effect",
								effect: "Your ally becomes immune to all damage from the triggering ability. Destroy the shrine, then deal 2 divine damage, once, to the foe per height of the shrine. You cannot place shrines for the rest of combat.",
							},
						],
					},
				},
			},
			"Sanctify": {
				chapter: 1,
				action: [
					"2 Actions",
					"Range 2",
				],
				tags: [],
				description: "You throw out a handful of glittering salt, scorching the spiritually impure.",
				effects: [
					{
						type: "Terrain Effect",
						effect: "You scatter salt in a medium blast area effect in range, creating a terrain effect in those spaces. Foes in the area effect take 1 divine damage. While in the area, foes take +1 curse on saves and are pacified if they start or end their turn there. Allies inside the area take +1 boon on saves. The area persists until you take this action again or until the end of combat.",
					},
					{
						type: "Effect",
						effect: "After using any ability that triggers an exceed effect, deal 1 divine damage to all foes in the area, and grant 2 vigor to all allies in the area.",
					},
				],
				talents: {
					I: "Bloodied foes must save if they attempt to enter the area. On a failed save, they cannot voluntarily enter the area until the start of their next turn.",
					II: "Bloodied allies inside gain 4 vigor for ending their turn inside instead.",
				},
				mastery: {
					name: "Elden Salt",
					effect: "You can place two areas with Sanctify without replacing the first. At round 4+, Sanctify becomes 1 action.",
				},
			},
			"Grand Banishment": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 4",
				],
				tags: [],
				description: "With a word and a quickly drawn talisman, you stomp your foot and forbid your foe from taking another step towards you.",
				effects: [
					{
						type: "Effect",
						effect: "Teleport 1, End your turn and choose a foe in range, sealing their movement with force of will. Until the end of that foe’s next turn, they take 3 divine damage after they or an ally uses any ability that moves them closer to you.",
					},
				],
				talents: {
					I: "Your chosen character treats you and any allies in range 2 of you as having cover.",
					II: "Bloodied foes can be teleported 2 at the end of any turn this ability’s damage activates.",
				},
				mastery: {
					name: "Horse and Ox Seal",
					effect: "When you take this ability, you can also choose to invert the effect for the duration, dealing damage to the chosen foe if they move away from you instead.",
				},
			},
			"Divine Aegis": {
				chapter: 2,
				action: [
					"1 Action",
					"Range 4",
				],
				tags: [
					"Mark",
				],
				description: "You place a holy seal over your ally, enveloping them in divine protection.",
				effects: [
					{
						type: "Mark",
						effect: "Mark an ally in range 3. While marked, any foe that attempts to use an ability that includes that ally as a target must first save. On a successful save, there are no further effects, and the mark remains active. On a failed save, the chosen ally is unstoppable and gains resistance to all damage from the triggering ability for its duration, then the mark fades.",
					},
				],
				talents: {
					I: "If your ally is at 25% hp or lower when marked, marking them becomes a free action.",
					II: "If your ally is at 25% hp or lower when marked, they also gain defiance.",
				},
				mastery: {
					name: "Shroud From Heaven",
					effect: "This mark can be activated twice before it fades.",
				},
			},
			"Justice": {
				chapter: 2,
				action: [
					"Interrupt 1",
				],
				tags: [
					"Combo",
				],
				description: "Invoking the spirits of the land and air, you move at impossible speed, doling out blows faster than the eye can see. A second blow scatters your foes and whisks away your allies.",
				effects: [
					{
						type: "Trigger",
						effect: "You score a Critical Hit or trigger an Exceed effect",
					},
					{
						type: "Area Effect",
						effect: "Burst 2 (self): Foes take 1 divine damage. Allies are blessed.",
					},
					{
						type: "Effect",
						effect: "Then, teleport 2.",
						subAbility: {
							name: "Combo: Judgement",
							tags: [
								"Interrupt 1",
								"Gamble",
							],
							effects: [
								{
									type: "Trigger",
									effect: "You score a Critical Hit or trigger an Exceed effect",
								},
								{
									type: "Effect",
									effect: "Gamble, then you may teleport yourself and each character in range 2 half that far. Foes are pacified.",
								},
							],
						},
					},
				],
				talents: {
					I: "Allies affected by either interrupt gain 2 vigor.",
					II: "You can teleport 1 space before and after triggering either interrupt.",
				},
				mastery: {
					name: "Gran Judicata",
					effect: "Add an alternate combo action:",
					subAbility: {
						name: "Combo: Gran Judicata",
						tags: [
							"Interrupt 1",
						],
						effects: [
							{
								type: "Trigger",
								effect: "You score a Critical Hit or trigger an Exceed effect",
							},
							{
								type: "Effect",
								effect: "Deal 4 divine damage to all foes on the battlefield above bloodied, and all bloodied allies are blessed and gain 2 vigor.",
							},
						],
					},
				},
			},
			"Open the Gates": {
				chapter: 3,
				action: [
					"1 Action",
					"Attack",
				],
				tags: [
					"Combo",
				],
				description: "This aptly named technique can be used to deliver an extremely powerful blow - but focusing the body’s aether in such a way takes a long time to recharge.",
				effects: [
					{
						type: "Effect",
						effect: "Teleport 1",
					},
					{
						type: "Attack",
						effect: "On hit: [D]+fray and foe is pacified.",
					},
					{
						type: "Miss",
						effect: "fray",
					},
					{
						type: "Exceed",
						effect: "Shove your foe 1, then teleport 1, then shove your foe 1, then teleport 1",
					},
					{
						type: "Effect",
						effect: "This attack gains +1 boon, cannot miss (turn any miss into a hit) and triggers any exceed effects the first time it is used in combat.",
						subAbility: {
							name: "Combo: Center the Temple",
							tags: [
								"1 Action",
								"Attack",
							],
							effects: [
								{
									type: "Effect",
									effect: "Teleport spaces equal to the round number before the attack",
								},
								{
									type: "Attack",
									effect: "On hit: [D]+fray. Miss: fray",
								},
								{
									type: "Exceed",
									effect: "Deal 1 damage again to your target. At round 4 or later, increase this damage to 6.",
								},
							],
						},
					},
				],
				talents: {
					I: "You may teleport an ally in range 2 instead of teleporting yourself with any of this ability’s teleports.",
					II: "Both versions of this ability gains a range equal to the round number.",
				},
				mastery: {
					name: "Burial Fist",
					effect: "Any version of this ability deals bonus damage and always triggers exceed effects at round 4 or later.",
				},
			},
		},
	},
	"Seer": {
		class: "Mendicant",
		subtitle: "Fortune Teller and Master of Fate",
		description: "The Seers are made up of all the orders of hedge witches, stargazers, corner prophets, folk healers, shamans, and all manner of individuals that find themselves attracted to reading the Great Arcana, the esoteric practice of reading destiny itself, the Great Wheel of Arden Eld that determines the final fate of all things.<br><br> Through ritual, ceremony, and unrelenting practice, Seers gain the ability to predict and even defy a person’s fate, using their Aether infused card decks to influence the turning of the Great Wheel and empower their allies with foresight, precision, and uncanny accuracy.",
		traits: [
			{
				name: "The Wheel of Fate",
				description: "Set up a deck made up of one suit of a 52 card standard playing card deck (so 13 cards). At the start of any combat, draw up to 5 cards if you have less. Your hand and deck persist through combats, and your maximum hand size is 7 (you must discard down to 7 cards at the end of your turn). Discarded cards go in a discard pile. Once you draw through your deck, shuffle the discard pile and draw it as your new deck (meaning there’s no replacement and you will eventually draw through the deck).",
			},
			{
				name: "Skein",
				description: "Draw a card at the start of your turn. If you didn’t attack, draw an extra card at the end of your turn as well.",
			},
			{
				name: "Foretell",
				description: "You can discard 1 blessing token on yourself or an ally before that ally uses any ability to tell their fortune as an effect. You discard a card from your hand and immediately apply the effects to your target, no matter the distance or if you can see them or not. If you have no cards in hand, draw the top card of your deck instead, apply its effects, then discard it.",
				subAbility: {
					name: "The Great Wheel",
					tags: [],
					effects: [
						{
							type: "2 - The Fool",
							effect: "Ally must dash 3 spaces in a straight line before using the ability.",
						},
						{
							type: "3 - The Scepter",
							effect: "Teleport your ally to an adjacent space to you after the action resolves.",
						},
						{
							type: "4 - The Ewer",
							effect: "Bless all allies in a small blast area centered on your ally.",
						},
						{
							type: "5 - The Devil",
							effect: "If the ability forces saves, foes get +2 curses to save against them.",
						},
						{
							type: "6 - The Sword",
							effect: "Ability gains pierce.",
						},
						{
							type: "7 - Death",
							effect: "Ally gains Defiance.",
						},
						{
							type: "8 - The Chariot",
							effect: "Ally becomes unstoppable and immune to all damage while moving during the ability.",
						},
						{
							type: "9 - The Papessa",
							effect: "Ally becomes pacified but is cured after the ability resolves.",
						},
						{
							type: "10 - The Emperor",
							effect: "Ally gains stealth after the ability resolves.",
						},
						{
							type: "J - The Star",
							effect: "Ally makes all attacks and saves with +1 Boon until the start of their next turn, including with the triggering ability.",
						},
						{
							type: "Q - The Moon",
							effect: "Ally gains Evasion until the start of their next turn",
						},
						{
							type: "K - The Sun",
							effect: "Ally gains Counter and Sturdy, but cannot gain or benefit from stealth or evasion until the start of their next turn",
						},
						{
							type: "A - The World",
							effect: "Ally becomes Unstoppable until the start of their next turn",
						},
					],
				},
			},
			{
				name: "Bend Fate",
				description: "You can discard any number of cards after you gamble to roll an extra die per card discarded, choosing any result. You can repeat this effect any number of times as long as you have cards, and you can choose to discard after you see each result.",
			},
			{
				name: "Karma",
				description: "Allies are immune to damage from your area effects. Any time you include an ally in an area effect that would damage them, after that ability resolves they gain 2 vigor and are blessed instead.",
			},
		],
		ultimateTrait: {
			name: "Chakravartin (2 actions, 1/expedition)",
			effect: "An ally in range 6 becomes unstoppable and immune to all damage until the end of their next turn.",
		},
		limitBreak: {
			name: "High Prophecy",
			resolve: 3,
			action: [
				"Free Action",
			],
			tags: [
				"Aura",
			],
			description: "A burning third eye of pure etheric energy appears on your forehead. Possibilities unfurl before you, laid out like infinite gleaming threads.",
			effects: [
				{
					type: "Aura",
					effect: "Until the start of your next turn, you gain aura 2. Every d6 any character in the aura rolls for boons, curses, or gambling is either a 6 or a 1 (you choose).",
				},
			],
			ultimateName: "Thoth",
			ultimateEffect: "While the aura is active, you are automatically missed by attacks, turn any of your attack misses into hits, and succeed all saves.",
		},
		summons: {
			description: "Many seer abilities summon a wild card. When a wild card is summoned, it can be summoned in range 2 if no other range is listed.",
			summons: [
				{
					name: "Wild Card",
					tags: [
						"Size 1",
						"Intangible",
					],
					effects: [
						{
							type: "Summon Effect",
							effect: "The card emits a small blast area effect centered on it, which is normally inactive. When any space of an area ability from you or an ally would touch the area, it can be activated, causing the card to explode, and extending the area effect of that ability to encompass the card’s area for the duration. Then, remove the card. <ul><li>Wild cards can be triggered by other wild cards. </li><li>Wild cards do not extend the persistent effects of any area abilities, such as creating terrain effects in their space, but only the effects that last for the duration of the ability.</li></ul>",
						},
					],
				},
			],
		},
		abilities: {
			"Sleight of Hand": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
					"Range 5",
					"Small Blast",
				],
				tags: [
					"Summon",
				],
				description: "A flash of bright color, and a card is stuck to your foe, bursting into arcane fire in a flash.",
				effects: [
					{
						type: "Attack",
						effect: "Auto-hit: fray damage",
					},
					{
						type: "Effect",
						effect: "Your foe is pacified.",
					},
					{
						type: "Area effect",
						effect: "Fray damage.",
					},
					{
						type: "Effect",
						effect: "Summon a wild card in range 2 of your foe.",
					},
				],
				talents: {
					I: "This ability does not break the pacified condition and deals 2 damage again to any pacified foes in the area.",
					II: "After this ability resoles, roll 1 more d6 the next time you gamble this turn. Charge: 2 more d6s",
				},
				mastery: {
					name: "King of Swords",
					effect: "After using this ability, you gain six spectral blades that hover behind you, using a d6 power die starting at 6 to track them. At the end of your turn, gamble. If you roll under the number of blades remaining, a blade flies out and deals 2 divine damage to a foe in range 6. Using this ability again with blades active restocks them.",
				},
			},
			"Chaos Tarot": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 5",
					"Small Blast",
				],
				tags: [
					"Summon",
				],
				description: "You flick a beautifully illustrated ethereal card onto the battlefield, laden with the threads of potential.",
				effects: [
					{
						type: "Area effect",
						effect: "Gamble, then apply the listed effect in the area. <ol><li>Card explodes for fray damage. </li><li>All characters in the area are teleported 2 </li><li>Create two spaces of difficult terrain in the area. </li><li>Bless up to two characters in the area </li><li>Seal up to two characters in the area. </li><li>Choose two</li></ol>",
					},
					{
						type: "Summon",
						effect: "Then, summon a wild card in the area.",
					},
				],
				talents: {
					I: "You can consume any number of blessings on character in Chaos Tarot’s area before gambling to roll 1 extra d6 per blessing consumed.",
					II: "You can move Chaos Tarot’s area up to 2 spaces in any direction before applying the gamble effect. Charge: 4 spaces",
				},
				mastery: {
					name: "Royalty Gold",
					effect: "Instead of summoning a wild card with this ability, you can instead end your turn and summon a Master Card. You can only have one Master Card active at once. The Master Card acts as a wild card, but also gains the gamble effect of Chaos Tarot, which it grants to any area ability that triggers it. It is consumed as normal after being activated.",
				},
			},
			"Astra": {
				chapter: 1,
				action: [
					"2 Actions",
					"Attack",
					"Line 5",
				],
				tags: [
					"Combo",
				],
				description: "You call down the heavens themselves on your foes.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: [D] + fray damage. Miss: fray.",
					},
					{
						type: "Area effect",
						effect: "Fray",
					},
					{
						type: "Effect",
						effect: "Foe explodes in a medium blast area effect, centered on them. Gamble, then deal that much damage again to all characters in the area. On a 4+, create two spaces of difficult terrain in the area. On a 6, a meteor also lands, creating a height 1 meteor object in any part of the area and dealing 2 damage to adjacent characters when it lands.",
					},
					{
						type: "Effect",
						effect: "You can remove any number of blessings from allies in the area to roll 1 extra d6 per blessing removed when gambling.",
						subAbility: {
							name: "Combo: Fortuna",
							tags: [
								"Range 5",
								"Medium Blast",
							],
							effects: [
								{
									type: "Attack",
									effect: "Auto hit: [D]+fray",
								},
								{
									type: "Area Effect",
									effect: "Foes take fray damage. Allies gain 3 vigor and are blessed.",
								},
								{
									type: "Summon",
									effect: "Summon a wild card in the area",
								},
							],
						},
					},
				],
				talents: {
					I: "Any version of this ability explodes with meteor showers when used, creating two spaces of difficult terrain in the area. Charge: Also create a height 1 meteor object in any part of the area, dealing 2 damage to adjacent foes when it lands.",
					II: "If two or more allies are caught in the area of this ability, increase all medium blasts to large blasts, and this ability deals bonus damage.",
				},
				mastery: {
					name: "The Chalice",
					effect: "After you use any version of this ability, deal 2 divine damage, once, to a foe in the area for each blessed ally in the area, up to a maximum of three times. Foes can be damaged more than once by this effect.",
				},
			},
			"Polaris": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 5",
				],
				tags: [],
				description: "A distant glint in the heavens, portents of the devastation to come.",
				effects: [
					{
						type: "Terrain Effect",
						effect: "Choose a space on the battlefield in range 5. While you have at least one Polaris space active, you may gamble at the end of any turn after yours with the following effects:",
					},
					{
						type: "Gamble",
						effect: "A meteor lands in every space chosen by Polaris, exploding. The effects of each space vary depending on how many spaces are active. Each effect other than the blast size stacks: <ol><li>Small blast area effect, deals damage equal to the gamble result. </li><li>Medium Blast, deals +2 damage </li><li>Large Blast, deals +2 damage, and characters in center spaces are stunned.</li></ol> Then, remove all spaces.",
					},
				],
				talents: {
					I: "You can cause one of your Polaris to follow a character as a mark instead of a space.",
					II: "Create a space of difficult terrain under the center space of each Polaris space after it resolves. On a gamble result of 4+, create either a height 1 meteor object or a pit instead.",
				},
				mastery: {
					name: "Moon Silver Princess",
					effect: "At round 4+, Polaris becomes a free action.",
				},
			},
			"Sisyphus": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 5",
				],
				tags: [
					"Mark",
				],
				description: "You bend a character’s fate, reversing causality so that the very ground warps under their feet.",
				effects: [
					{
						type: "Mark",
						effect: "Mark a character in range. While marked, note their starting position at the start of their turn. If they’re in range 3 of their starting position at the end of their turn, you may remove them from the battlefield and return them to their starting position, or as close as possible if it’s occupied. Then, a foe can save, ending this mark on a success.",
					},
				],
				talents: {
					I: "If they’re bloodied, foes gain +1 curse on the save, and are also pacified after being returned to their starting location.",
					II: "Allies are blessed after being moved with Sisyphus and gain 2 vigor. If they’re at 25% hp or lower, they can also be cured.",
				},
				mastery: {
					name: "Black Knight Grave",
					effect: "Sisyphus triggers no matter how far away a character is from their starting position at the end of their turn.",
				},
			},
			"Gran Reversa": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Stance",
					"Aura",
					"Interrupt",
					"Power Die",
				],
				description: "Causality unmakes itself around you, as wounds heal instantly.",
				effects: [
					{
						type: "Stance",
						effect: "Gain aura 2, and a d4 power die, starting at 4. While in this stance, gain the following interrupt:",
						subAbility: {
							name: "Reverse Fate",
							tags: [
								"Interrupt 1",
							],
							effects: [
								{
									type: "Trigger",
									effect: "An ally in the aura is targeted by a foe’s ability.",
								},
								{
									type: "Effect",
									effect: "Tick down your power die by any amount. Gamble with a number of d6s equal to the number of ticks you spent, then that ally gains vigor equal to double the gamble result. However, at the end of the current turn, your ally loses all vigor.",
								},
							],
						},
					},
					{
						type: "Refresh",
						effect: "You may exit or refresh this stance at the start of your turn. When you refresh this stance, tick the die up by 1.",
					},
				],
				talents: {
					I: "Your power die from this ability starts at d6, with 6 charges.",
					II: "If your ally was bloodied, instantly regain a tick on this die after this ability resolves.",
				},
				mastery: {
					name: "Misericordia",
					effect: "Vigor granted by Gran Reversa can increase a character’s total vigor over their maximum.",
				},
			},
			"Eclipse": {
				chapter: 2,
				action: [
					"1 Action",
					"Range 6",
				],
				tags: [
					"Delay",
					"End Turn",
					"Terrain Effect",
				],
				description: "",
				effects: [
					{
						type: "End your turn and create a Terrain Effect",
						effect: "Create a burning brand of star fire in range, dangerous terrain, then gain delay: Your next turn must be slow. At the start of that turn, check if there is a character standing in that space: <ul><li>If there is, that character takes 2 divine damage and is sealed. </li><li>If there isn’t, it explodes for a large blast area effect centered on that space, scattering star fire everywhere. All characters in the area take 2 divine damage, and create a space of dangerous terrain under every foe in the area.</li></ul> Then, end the effect.",
					},
				],
				talents: {
					I: "If eclipse explodes, create a fiery pit in its center space. The pit is also dangerous terrain. Characters adjacent to the pit are sealed when it is created.",
					II: "If eclipse explodes, it creates a shower of bolides, dealing 3 damage again to up to three characters in its area effect.",
				},
				mastery: {
					name: "The Helm",
					effect: "If you choose, at the start of your turn, Eclipse’s effect does not expire after activating. Instead, you can repeat its delay effect at the end of your turn without ending your turn or creating a new area. The area also disappears if you use this ability again.",
				},
			},
			"Wish": {
				chapter: 2,
				action: [
					"Interrupt 1",
				],
				tags: [],
				description: "You struggle against fate itself, undoing causality and defying the stars.",
				effects: [
					{
						type: "Trigger",
						effect: "An ally on the battlefield takes damage from a foe equal to 25% of their max hp or more",
					},
					{
						type: "Effect",
						effect: "Reverse the flow of causality. That damage cannot reduce your ally past 1 hp, and they are cured after it resolves. The stress of taking this action causes you to sacrifice 25% of your maximum HP.",
					},
				],
				talents: {
					I: "If your ally is bloodied, they are also blessed after this interrupt resolves and may dash 2",
					II: "If this damage would have reduced your ally to 0 hp, also cure yourself after this ability resolves",
				},
				mastery: {
					name: "Star Scorned Hermit",
					effect: "If the damage would have reduced your ally to 0 hp, they also gain defiance, then become unstoppable until the end of their next turn.",
				},
			},
			"The Tower": {
				chapter: 3,
				action: [
					"1 Action",
					"Attack",
					"Range 5",
				],
				tags: [
					"Gamble",
				],
				description: "You invoke the ultimate power of the tower card, sealing a foe’s fate. In short order, untold calamity befalls them.",
				effects: [
					{
						type: "Attack",
						effect: "Autohit: 1 damage and foe is sealed.",
					},
					{
						type: "Area Effect",
						effect: "At the end of that foe’s turn, gamble. A massive meteor hits for a large blast area effect centered on them, dealing damage equal to the number on the gamble die +2 to all characters.",
					},
					{
						type: "Terrain effect",
						effect: "Then, create a height 1 meteor object in the area.",
					},
				],
				talents: {
					I: "Roll an extra 1d6 when gambling for this ability. Charge: Also gains range 10",
					II: "The meteor scatters debris when landing, creating two spaces of difficult terrain in the area, which could also be created under characters.",
				},
				mastery: {
					name: "Superbolide",
					effect: "If the chosen character is at 25% hp or lower, they take double damage from Eclipse’s meteor effect, and the effect also ignores defiance.",
				},
			},
		},
	},

	// Blue Jobs
	"Enochian": {
		class: "Wright",
		subtitle: "Unbridled Destruction",
		description: "The Enochian Orders of wrights are the most chaotic of the mage orders. They have no official organization, most of their members being hedge wizards or self taught. Many Enochians disdain authority and work for hire, sleeping and eating where they can and relying on the communities they work for to support them. Those that work on contract with guilds, armies, or mercenary companies tend to value their independence.<br><br> The power that condenses inside an Enochian is related to the element of fire, a wild spark that grows and wanes with their emotions and energy, but with control can be focused into power that can carve mountains, scorch forests, and boil rivers. In times of desperation, the Enochians can feed this power with their own life force, a dangerous practice that the other orders of wrights look down upon. The Enochians, for their part, see other wrights as stiff and uncreative. They’d rather do it their way, after all.",
		traits: [
			{
				name: "Inner Furnace",
				description: "Once a round, you may burn your own life force when you Infuse an ability. You can sacrifice 25% of your max hp to reduce the Aether cost of that ability by 2.",
			},
			{
				name: "Embersoul",
				description: "Start combat with regeneration and defiance. Regain regeneration if rescued.",
			},
			{
				name: "Phoenix Rage",
				description: "At the start of round 5, become suffused with immortal flame. Gain defiance at the start of each of your turns, and when you would take a wound, gamble. On a 4+, ignore it. If this is your last wound, this roll becomes a 2+ instead.",
			},
			{
				name: "Soulfire",
				description: "Comeback: Your threshold to critical hit becomes 18+, and your threshold to exceed becomes 13+. If you’re at 1 hp, these thresholds are reduced to 15+ and 10+.",
			},
		],
		ultimateTrait: {
			name: "Bright Soul",
			effect: "If you are defeated, you can choose to burn off all your aether to cause a massive Burst 2 (self) explosion area effect, dealing 4 piercing damage, then 4 piercing damage a number of times again to all characters inside equal to the amount of aether you burned.",
		},
		limitBreak: {
			name: "Gigaflare",
			resolve: 4,
			action: [
				"2 Actions",
			],
			tags: [
				"Divine",
				"Unerring",
				"True Strike",
			],
			description: "I, who stand at the apex of things,<br>Thou, who are in the deepest pits of despair,<br>Let thy very bones become ash!.<br>O Flame, let the air become death!<br>Ignite, and be banished to Hell!",
			effects: [
				{
					type: "Effect",
					effect: "You summon the eldflame, the primeval force of creation, dealing [D]+fray divine damage to every character, on the battlefield, ignoring line of sight. Characters in range 2 of you are exempt from this ability.",
					subAbility: {
						name: "Infuse 6: Tetraflare",
						tags: [],
						effects: [
							{
								type: "",
								effect: "Deal [D] + fray twice instead.",
							},
						],
					},
				},
			],
			ultimateName: "Infuse 8: Meteor",
			ultimateEffect: "6 resolve<br> Deal [D]+fray four times instead.<br> <b>Special effect:</b> You can pay the resolve, aether, and action cost of this spell with your entire life force, dying after this action resolves, obliterating your body, and scattering your soul. If you do, it deals 999 divine damage instead.",
		},
		abilities: {
			"Pyre": {
				chapter: 1,
				action: [
					"2 Actions",
					"Attack",
					"Range 6",
					"Medium Blast",
				],
				tags: [],
				description: "Power curls into a writhing ball in your hand, before it’s unleashed on your enemies.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: 2[D] + fray. On miss: fray.",
					},
					{
						type: "Area effect",
						effect: "fray",
					},
					{
						type: "Comeback or Exceed",
						effect: "After the ability resolves, the area explodes again, dealing 2 piercing damage to all characters.",
						subAbility: {
							name: "Infuse 3: Pyrotic",
							tags: [
								"Increase range to 10 and blast size to Large Blast."
							],
							effects: [
								{
									type: "",
									effect: "Create a pit under the attack target after this ability resolves.",
								},
							],
						},
					},
				],
				talents: {
					I: "Comeback: Allies are immune to damage from this ability.",
					II: "Exceed: You may shove all characters in the area 2 spaces.",
				},
				mastery: {
					name: "Magnapyre",
					effect: "Magnapyre benefits from Pyre talents.",
					subAbility: {
						name: "Infuse 6: Magnapyre",
						tags: [
							"2 Actions",
							"Attack",
							"Range 12",
							"Large Blast",
						],
						effects: [
							{
								type: "Attack",
								effect: "On hit: 2[D] + fray. On miss: [D]+fray.",
							},
							{
								type: "Area effect",
								effect: "[D]+fray",
							},
							{
								type: "Effect",
								effect: "Create a pit under your attack target",
							},
							{
								type: "Effect",
								effect: "After the ability resolves, the area explodes again, inflicting 2 piercing damage to all characters.",
							},
							{
								type: "Comeback or Exceed",
								effect: "The area explodes again, dealing 2 piercing damage to all characters.",
							},
						],
					},
				},
			},
			"Elden Rune": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [],
				description: "You carve a burning rune of power into the very ground beneath you.",
				effects: [
					{
						type: "Terrain Effect",
						effect: "Inscribe an Elden Rune on the space underneath you. While standing on an Elden Rune space, the range of all abilities with a listed range is increased by +3. The rune lasts until the end of the scene. A foe can scrub out an Elden Rune by entering or exiting its space.",
					},
					{
						type: "Effect",
						effect: "You can sacrifice 2 to cast a rune down as a free action.",
						subAbility: {
							name: "Infuse 3: Great Rune",
							tags: [],
							effects: [
								{
									type: "Grant the following effect to your rune",
									effect: "your attacks also shatter their main target while standing in this rune.",
								},
							],
						},
					},
				],
				talents: {
					I: "You can teleport up to 3 spaces into an Elden Rune space as a free action.",
					II: "While standing in an Elden Rune, the infuse costs of your spells are reduced by 1, to a minimum of 1",
				},
				mastery: {
					name: "Arkenrune",
					effect: "You can put an Arkenrune down instead of a regular Elden Rune, but only one at a time, replacing the last Arkenrune you placed. Arkenrunes can’t be scrubbed out, extend to a small blast area, and their benefits also extend to allies.",
				},
			},
			"Lance": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
					"Range 8",
				],
				tags: [
					"Pierce",
				],
				description: "A flash scorches the eyeballs, and a thin line burns through rock, flesh, and armor",
				effects: [
					{
						type: "Attack",
						effect: "On hit: [D] + fray. Miss: fray.",
					},
					{
						type: "Effect",
						effect: "Foe is vulnerable.",
					},
					{
						type: "Area Effect",
						effect: "Fray",
					},
					{
						type: "Effect",
						effect: "Line of sight can’t be blocked by objects, and ignores cover granted by objects or terrain.",
					},
					{
						type: "Comeback or Exceed",
						effect: "Also deals bonus damage for every unique object it passed through.",
						subAbility: {
							name: "Infuse 3: Volvaga",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Gains width +1 and may melt any objects of your choice in its path, removing them.",
								},
							],
						},
					},
				],
				talents: {
					I: "When this ability passes through an object, it releases a soul ember, dealing 1 piercing damage to a character in range 3 of that object. Each character can only be struck by one ember by a single use of this ability.",
					II: "If you are at 1 hp or lower, this ability deals maximum base damage (before critical hits).",
				},
				mastery: {
					name: "Great Spirit Lance",
					effect: "Great Spirit Lance benefits from Lance talents",
						subAbility: {
							name: "Infuse 6: Great Spirit Lance",
							tags: [
								"2 Actions",
								"Attack",
								"Range 10",
								"Width 3",
							],
							effects: [
								{
									type: "Attack",
									effect: "On hit: 2[D] + fray. Miss: [D]+fray",
								},
								{
									type: "Area Effect",
									effect: "[D]+fray",
								},
								{
									type: "Effect",
									effect: "Line of sight can’t be blocked by objects, and ignores cover granted by objects or terrain.",
								},
								{
									type: "Effect",
									effect: "After the ability resolves, every foe or ally in the area explodes, taking 2 piercing damage as an area effect. If you catch at least three foes or allies in the area, every foe or ally in the area takes 2 piercing damage twice instead.",
								},
							],
						},
				},
			},
			"Soul Burn": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Stance",
				],
				description: "You stoke the furnace with the very essence of your being.",
				effects: [
					{
						type: "Stance",
						effect: "Burn your own life force into a fierce blaze. In this stance: <ul><li>You sacrifice 2 at the end of your turn. </li><li>Your abilities automatically activate any comeback triggers. </li><li>After you sacrifice with this ability, or after any other of your abilities with a sacrifice effect resolves, you can spark a soul ember at a character in range 5, dealing 1 piercing damage.</li></ul>",
					},
					{
						type: "Refresh",
						effect: "Refresh or exit this stance at the start of your turn.",
						subAbility: {
							name: "Infuse 4: Incandius",
							tags: [],
							effects: [
								{
									type: "",
									effect: "When entering this stance, shove all adjacent characters 3 and spark a soul ember at them, dealing 1 piercing damage to them. Collide: Characters are vulnerable.",
								},
							],
						},
					},
				],
				talents: {
					I: "If a foe is struck by two or more soul embers from this ability in the same turn, they become vulnerable.",
					II: "Foes that end their turn adjacent to you while Soul Burn is active take 1 piercing damage and are shoved 1.",
				},
				mastery: {
					name: "Soul Spark",
					effect: "<b>Free Action:</b> You can willingly siphon off your burning life force to empower your next ability sacrificing 4, then ending the stance.<br><br>The ability deals bonus damage, cannot miss (turn any attack miss into a hit), activates all exceed effects, and foes gain +1 curse on any saves.",
				},
			},
			"Blazing Bond": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 4",
				],
				tags: [
					"Mark",
				],
				description: "You link the soul Aether of you and a companion with a chain of pure fire aether, drawing from the strength of one to bolster the other.",
				effects: [
					{
						type: "Mark",
						effect: "An ally in range is marked by you. While affected by this mark and in range, gain the following interrupt:",
						subAbility: {
							name: "Heartfire",
							tags: [
								"Interrupt 2",
							],
							effects: [
								{
									type: "Trigger",
									effect: "You or your ally takes damage or sacrifices hp.",
								},
								{
									type: "Effect",
									effect: "You can choose to reduce that damage by 3, as if by armor, or the sacrifice cost by 3. If you do, the other partner sacrifices 3.",
								},
								{
									type: "Comeback",
									effect: "Reduce partner sacrifice to 1.",
								},
							],
						},
					},
				],
				talents: {
					I: "While marked, you can teleport yourself or your ally 2 spaces at the end of your turn, as long as you end closer to each other.",
					II: "Comeback: Grant both you and your ally defiance when taking this action.",
				},
				mastery: {
					name: "Great Soul Bond",
					effect: "If one of the partners would take damage from an ability that would reduce them below 1 hp, the other can reduce themselves to 1 hp to grant that ally immunity to all damage from the triggering ability. The bond then snaps, ending this mark.",
				},
			},
			"Aethershard": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 6",
				],
				tags: [
					"Object",
				],
				description: "You crystallize ambient Aether with force of will, forcing it to take a useful form",
				effects: [
					{
						type: "Object",
						effect: "Sacrifice 3 and summon an Aethershard in a free space in range 6.",
						subAbility: {
							name: "Aethershard",
							tags: [
								"Height 1 object"
							],
							effects: [
								{
									type: "Summon Effect",
									effect: "When you include the Aethershard in the area effect of any ability, the ability resonates with the shards, dealing 2 piercing damage as an area effect, once, to 210 of 501all characters in the area for every one of your Aethershards caught in the same ability. Then destroy all Aethershards activated this way and gain 1 Aether.",
								},
							],
						},
					},
					{
						type: "Comeback",
						effect: "Reduce sacrifice to 1",
					},
				],
				talents: {
					I: "When you take any action that spends Aether, you can first remove one of your aethershards, then place it in any free space up to range 2 from its original location",
					II: "Your abilities gain pierce against characters adjacent to Aethershards",
				},
				mastery: {
					name: "Aethershift",
					effect: "If you start or end your turn adjacent to an Aethershard, gain phasing until the end of your next turn. The spaces of objects cost a maximum of 0 spaces for you to enter for the same duration.",
				},
			},
			"Implode": {
				chapter: 2,
				action: [
					"1 Action",
					"Range 6",
				],
				tags: [
					"End Turn",
					"Delay",
				],
				description: "You burn away the air itself, creating a sucking void that rips your foes into its howling embrace.",
				effects: [
					{
						type: "End your turn and Delay",
						effect: "Choose a space in range. Your next turn must be slow, but at the start of that turn, that space explodes with gravitational energy, shoving all characters in a large blast area effect around it as close as possible towards it. Characters are shoved in any order you like. Any character that is in the center space when this ability activates must save or be stunned.",
					},
					{
						type: "Comeback",
						effect: "Free Action",
						subAbility: {
							name: "Infuse 4: Null",
							tags: [],
							effects: [
								{
									type: "",
									effect: "All characters adjacent to the area effect are also affected.",
								},
							],
						},
					},
				],
				talents: {
					I: "Any character in the center space is also shattered when this ability activates.",
					II: "The center space also becomes a pit.",
				},
				mastery: {
					name: "Waking Void",
					effect: "You can choose a character with this ability instead of a space, but it doesn’t stun the center character. If that character is defeated, Implode immediately activates.",
				},
			},
			"Pyroclast": {
				chapter: 2,
				action: [
					"1 Action",
					"Range 6",
				],
				tags: [],
				description: "Taking a page from the geomancers, Enochians can send a pulse of fire aether into the earth itself, causing tectonic upheaval.",
				effects: [
					{
						type: "Effect",
						effect: "Choose yourself or a character in range. At the end of that character’s next turn, the ground beneath them erupts. Create a height 1 magma spire object under them, pushing them up. All characters adjacent to that object, but not the original character, are shoved 1 and take 2 piercing damage.",
					},
					{
						type: "Comeback",
						effect: "You may choose yourself and another character",
						subAbility: {
							name: "Infuse 3: Pyrospire",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Terrain space becomes height 3",
								},
							],
						},
					},
				],
				talents: {
					I: "Also cause a magma eruption adjacent to your target, creating 2 spaces of dangerous terrain.",
					II: "You may sacrifice 2 to immediately shatter your target as part of this ability.",
				},
				mastery: {
					name: "Magmotic",
					effect: "Instead of creating a spire, you can create a magma-filled Pit. The pit is additionally dangerous terrain. When it appears, the eruption causes a medium blast area effect centered on your target that inflicts 2 piercing damage.",
				},
			},
			"Blackstar": {
				chapter: 3,
				action: [
					"2 Actions",
					"Attack",
					"Range 8",
					"Large Blast",
				],
				tags: [
					"Pierce",
				],
				description: "You burn and condense your own aether into super condensed form, creating a crackling black 211 of 501orb that inflicts maximum destruction. Without the time to stabilize this attack, its use can rip away your very life force.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: 2[D]+fray. Miss: [D]+Fray",
					},
					{
						type: "Area effect",
						effect: "[D]+fray",
					},
					{
						type: "Effect",
						effect: "Attack target is shattered.",
					},
					{
						type: "Comeback or Exceed",
						effect: "Deals bonus damage, creates a pit under the center space, and up to three space of difficult terrain in the area.",
					},
					{
						type: "Special Effect",
						effect: "Also Sacrifice 50% of your max hp unless the round number is 6 or higher.",
						subAbility: {
							name: "Infuse 5: Astral Blackstar",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Ignore Blackstar’s round requirement",
								},
							],
						},
					},
				],
				talents: {
					I: "If Blackstar’s special effect triggers, capture your fleeing soul aether and gain 1 aether after this ability resolves.",
					II: "If Blackstar’s special effect triggers, gain 5 vigor after this ability resolves.",
				},
				mastery: {
					name: "Great Spirit Bomb",
					effect: "When you use Blackstar, if it’s special effect triggers, you can split sacrifice into 25% max hp to yourself, and 25% to an ally in range 4.",
				},
			},
		},
	},
	"Geomancer": {
		class: "Wright",
		subtitle: "Guardian of the Pure Earth",
		description: "Geomancers belong to an old order of mystics, doctors, alchemists, and esoteric martial artists called the Keepers of the Elden Gate. These scholarly wrights are concerned with health and the flow of energy, not just through the body, but through the very earth itself. They consider themselves physicians of the highest order - their patient being the eternal land of Arden Eld.<br><br> These studious wrights attune themselves to earth Aether, aligning the energy channels of their body to crystalline perfection with vigorous exercise and sometimes bizarre health regimes. In battle, the land itself is their ally, spitting forth poisonous gases, cavernous upheavals of earth, and great spires of rock to crush their foes.<br><br> None are more concerned with the Churn than the geomancers, who view it as the greatest sickness known to Kin, and will take any opportunity to fight or study it with exuberance.",
		traits: [
			{
				name: "Aftershock",
				description: "When you use any attack, you can cause an aftershock in the space under your target. Gain Delay: Your next turn must be slow, but at the start of that turn, the aftershock explodes in a burst 1 area effect centered on that space, dealing piercing fray damage to characters within (other than you). If the area effect catches an object in the area, it deals piercing fray damage twice instead.<br>Unlike most other delay effects, aftershock does not end your turn, and can stack with other delay effects.",
			},
			{
				name: "Resonance",
				description: "When you make an attack against a character at exactly range 3, it deals bonus damage, gain 1 Aether, and gain 3 vigor after the ability resolves.",
			},
			{
				name: "Orogenic Rage",
				description: "At the start of round 5 and for the rest of combat, become unstoppable and your aftershocks deal double damage.",
			},
			{
				name: "Stone Double",
				description: "When you first vacate a space on your turn, you can leave a height 1 statue object behind in the space you vacate.",
			},
		],
		ultimateTrait: {
			name: "Stoneswim",
			effect: "You have phasing, for objects, and the spaces of objects always cost a maximum of 1 movement for you to enter.",
		},
		limitBreak: {
			name: "Cataclysm",
			resolve: 3,
			action: [
				"1 Action",
			],
			tags: [
				"Divine",
			],
			description: "I, protected by the holy trigram,<br>Summon the ten thousand molten metal kings.<br>Run amok with thy furies, and rend the immortal stone,<br>Turn Heaven and Earth!",
			effects: [
				{
					type: "Effect",
					effect: "End your turn. You dive into the earth and off the battlefield. Remove yourself from play. Target a line area 3 spaces wide from one side of the battlefield to the next.",
				},
				{
					type: "Then gain Delay",
					effect: "Your next turn must be slow. At the start of that turn, you cause a rolling wave of earth to sweep across this area, from one side to the next. Characters within take [D] + fray as an effect and are shoved 1 in the direction of the line.",
				},
				{
					type: "Effect",
					effect: "After the first effect resolves, all objects in the area release an explosion for a medium blast area effect centered on them, dealing [D]+fray as an area effect. Characters hit by two or more explosions take 2[D]+fray instead.<br><br> When this ability resolves, place yourself in any unoccupied space in the area.",
				},
			],
			ultimateName: "Molten Core",
			ultimateEffect: "After taking this move, you emerge with a shield of molten rock covering you. You gain unstoppable and resistance until the end of your next turn.",
		},
		abilities: {
			"Bio": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
					"Range 8",
					"Small Blast",
				],
				tags: [
					"Pierce",
				],
				description: "The earth splits, excising poison from its depths, belching poisonous metals and gases.",
				effects: [
					{
						type: "Effect",
						effect: "Attack target is shattered.",
					},
					{
						type: "Attack",
						effect: "On hit: [D] + fray. Miss: fray.",
					},
					{
						type: "Area effect",
						effect: "Fray",
					},
					{
						type: "Charge",
						effect: "Create a space of dangerous terrain in the center space of the area, and under every foe in the area.",
						subAbility: {
							name: "Infuse 3: Biotic",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Increase blast size to medium blast, and shatters all characters inside.",
								},
							],
						},
					},
				],
				talents: {
					I: "You may also cause pits, objects you created, and difficult terrain caught in the area to become dangerous terrain.",
					II: "You may cause existing dangerous terrain spaces in the area to boil with poison after this ability resolves. Characters in or adjacent to one or more of those spaces take 2 piercing damage as an area effect.",
				},
				mastery: {
					name: "Magnabio",
					effect: "Magnabio benefits from bio talents",
					subAbility: {
						name: "Infuse 6: Magnabio",
						tags: [
							"2 Actions",
							"Attack",
							"Range 8",
							"Large Blast",
						],
						effects: [
							{
								type: "Attack",
								effect: "On hit: 2[D] + fray. Miss: [D] + fray.",
							},
							{
								type: "Area effect",
								effect: "[D] +fray",
							},
							{
								type: "Terrain Effect",
								effect: "Create a medium blast toxic cloud terrain effect centered on the center space. The area is dangerous terrain and characters inside the area are shattered+. The cloud lasts until this ability is used again.",
							},
						],
					},
				},
			},
			"Dragon Dive": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 6",
				],
				tags: [
					"End Turn",
					"Delay 6",
				],
				description: "The earth is an old friend to geomancers, and will allow them passage as easily as slipping into water.",
				effects: [
					{
						type: "Effect",
						effect: "Choose a character in range, end your turn, and gain Delay: You must take a slow turn next round. At the start of that turn, you dive into the earth, removing yourself from the battlefield and placing yourself within range 3 of that character. They don’t have to be in range or line of sight.",
					},
					{
						type: "Area Effect",
						effect: "When you explode upwards, you release a burst 1 area effect centered on you, shoving 1 and dealing 2 piercing damage to all characters.",
						subAbility: {
							name: "Infuse 3: Boulder Kick",
							tags: [],
							effects: [
								{
									type: "",
									effect: "The area effect released becomes range 3, burst 1 (target). If only one character is caught in the area, they take 2 piercing damage twice instead and are shoved 2.",
								},
							],
						},
					},
				],
				talents: {
					I: "Gain Collide: Character is vulnerable.",
					II: "You may burst out of the ground and fly 3 after Dragon Dive’s delay effect resolves.",
				},
				mastery: {
					name: "Double Dragon",
					effect: "You can pull an adjacent willing ally with you during Dragon Dive, removing them when it triggers, then placing them in any adjacent space after the ability resolves.",
				},
			},
			"Geo": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
					"Arc 6",
				],
				tags: [],
				description: "The stomp of a foot or the slap of a palm is magnified a hundred fold into rumbling death.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: 2[D] + fray. Miss: fray.",
					},
					{
						type: "Area Effect",
						effect: "fray",
					},
					{
						type: "Terrain Effect",
						effect: "Create a height 1 boulder object in free space anywhere in the area after the attack resolves.",
					},
					{
						type: "Charge",
						effect: "Attack target explodes in a medium blast area effect, dealing 2 piercing damage again to all characters and creating a pit under them.",
						subAbility: {
							name: "Infuse 4: Geotic",
							tags: [
								"Arc 8"
							],
							effects: [
								{
									type: "",
									effect: "Deals bonus damage to characters standing in difficult terrain, pits, or dangerous terrain, and automatically triggers the charge effect against a foe standing in those spaces.",
								},
							],
						},
					},
				],
				talents: {
					I: "When a boulder or pit is created with this ability, you may shove all adjacent characters 1 away from it. Collide: character has a space of difficult terrain created under them.",
					II: "Boulders can be created under characters, and you may choose to make characters you create boulders under immune to damage from this ability",
				},
				mastery: {
					name: "Magnageo",
					effect: "Magnageo benefits from geo talents",
					subAbility: {
						name: "Infuse 6: Magnageo",
						tags: [
							"2 Actions",
							"Attack",
							"Arc 10",
						],
						effects: [
							{
								type: "Attack",
								effect: "On hit: 2[D] + fray. Miss: [D] + fray.",
							},
							{
								type: "Effect",
								effect: "Foe explodes in a large blast area, extending the area effect.",
							},
							{
								type: "Area effect",
								effect: "[D] +fray",
							},
							{
								type: "Terrain Effect",
								effect: "Creates a massive crater. Create a boulder object in every side space of a small blast area centered on the attack target, with a pit in the center space. These terrain effects can be created under characters.",
							},
						],
					},
				},
			},
			"Helix Heel": {
				chapter: 1,
				action: [
					"1 Action",
					"Line 3",
				],
				tags: [],
				description: "",
				effects: [
					{
						type: "Effect",
						effect: "If an object is in the end space of the line, you can extend this line by 3 more spaces in any direction, drawn from the object. If a new object is at the end space of this line, you can keep extending the line by 3 spaces this way each time, but can only extend it once per object.",
					},
					{
						type: "Effect",
						effect: "Then, all objects this line passed through resonate, releasing a burst 1 area effect centered on them and dealing 2 piercing damage to all characters inside.",
					},
					{
						type: "Charge",
						effect: "Shatter any foe damaged by this ability.",
					},
				],
				talents: {
					I: "When Helix Heel bounces off an object, you can shove it 1 in any direction before extending the line.",
					II: "After Helix Heel resolves, fly 1 or teleport 1 space for each bounce (up to three times)",
				},
				mastery: {
					name: "Spiral Crusher",
					effect: "You can bounce Helix Heel off characters instead. Characters that it bounces off are shoved 1 away from you after the ability resolves. Collide: Create a pit under the colliding character.",
				},
			},
			"Terraforming": {
				chapter: 1,
				action: [
					"2 Actions",
					"Range 6",
				],
				tags: [],
				description: "The key of creation is turned, and the land is shaped like clay, as the Titans once did.",
				effects: [
					{
						type: "Effect",
						effect: "Target a burst 2 (target) area in range and choose two of the following terrain effects to create in that area. You cannot select the same effect more than once. Effects cannot be created in spaces occupied by characters. <ul><li>Create two height 1 boulder objects </li><li>Create two pits </li><li>Destroy any of your created objects in the area or raise the height of any existing objects by +1 </li><li>Create a line 3 area of difficult terrain with at least one space in the area </li><li>Remove any difficult or dangerous terrain of your choice in the area</li></ul>",
					},
					{
						type: "Charge",
						effect: "Choose four effects",
						subAbility: {
							name: "Infuse 2: Earthblood",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Sink into the ground, removing yourself from the battlefield and placing yourself in any space in the area after the ability resolves.",
								},
							],
						},
					},
				],
				talents: {
					I: "Charge: effects can also be placed in any space adjacent to the area.",
					II: "You can also create up to 3 spaces of dangerous terrain in the area as a choosable effect",
				},
				mastery: {
					name: "Ancient Eruption",
					effect: "As part of using this ability, you may end your turn, and gain delay: Your next turn must be slow, but at the start of that turn, you may shove all characters 2 spaces towards or away from the center space of the area created by Terraforming. It then explodes, dealing 2 piercing damage twice to all characters inside.",
				},
			},
			"Obsidian Flesh": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Stance",
					"Power Die",
				],
				description: "Like the deepest magma in the earth’s crust, your flesh becomes more stony when struck, eventually becoming covered in a gleaming obsidian shell.",
				effects: [
					{
						type: "Stance",
						effect: "While in this stance, set out a d6 power die at 1. Tick it up after a foe uses an ability that damages you. At 4+, gain resistance. If the die is at maximum and you would tick it up again, this stance immediately ends and you become stunned.",
					},
					{
						type: "Refresh",
						effect: "Refresh this stance at the start of your turn. When the stance refreshes, you may tick the die up or down by 1.",
					},
				],
				talents: {
					I: "If this ability ticks over, it doesn't end until the end of the current turn.",
					II: "When this ability ends, you may have the shell explode off you, dealing 2 piercing damage in a range 2, burst 1 area effect and shoving characters inside 1.",
				},
				mastery: {
					name: "Diamond Soul",
					effect: "You have regeneration while in this stance, and when it refreshes, you can tick the die up or down by 2.",
				},
			},
			"Realignment": {
				chapter: 2,
				action: [
					"2 Actions",
				],
				tags: [],
				description: "Using your knowledge of innumerable anatomies, you quickly rearrange energy channels in your target to heal them - forcefully.",
				effects: [
					{
						type: "Effect",
						effect: "You hit a precise pressure point on an adjacent character, purging toxins from their body. A character must be affected by at least 1 status to be targeted by this ability. End all statuses on the character and create a range 2, burst 1 area effect from your target. Characters within take piercing fray damage once for each effect purged, to a maximum of four times. If your target is a foe, you can also shatter them.",
					},
					{
						type: "Charge",
						effect: "Also end any marks of your choice on your target, counting as purging an effect.",
						subAbility: {
							name: "Infuse 2: Medicine Palm",
							tags: [],
							effects: [
								{
									type: "",
									effect: "The chosen character also immediately gains a vigor surge, but loses all vigor at the end of their next turn.",
								},
							],
						},
					},
				],
				talents: {
					I: "Characters in the area take piercing fray damage again one more time if your target is bloodied.",
					II: "Create a space of dangerous or difficult terrain in the area for each effect purged.",
				},
				mastery: {
					name: "Jade Needle",
					effect: "Characters in the affected area must save or also be affected by every status that was just purged.",
				},
			},
			"Midas": {
				chapter: 2,
				action: [
					"Interrupt 1",
					"Range 5",
				],
				tags: [],
				description: "In a flash, flesh becomes unyielding stone.",
				effects: [
					{
						type: "Trigger",
						effect: "You or a willing ally in range is targeted by a foe’s ability, that ability resolves, and they are not defeated.",
					},
					{
						type: "Effect",
						effect: "You transmute yourself or your ally into solid stone, metal, or gemstone. After the triggering ability resolves, remove that character from the battlefield and replace them with a height 1 statue object. At the start of their next turn, or if the object is removed sooner, replace the object with the original character. Any characters or objects on top of the statue when it is replaced are placed in a free adjacent space or as close as possible.",
					},
					{
						type: "Special",
						effect: "If you use this ability twice on the same character in the same combat, do not return them to the battlefield until combat is over. Until then, they count as defeated.",
					},
				],
				talents: {
					I: "When your chosen character is returned, their statue remains on the battlefield as a broken shell object. Place them in an adjacent space to it instead.",
					II: "When your chosen character returns, the shell explodes off them, shoving all adjacent characters 1. If that character was at 25% hp or lower, also deal piercing fray damage to all characters in a burst 1 area centered on them as an area effect.",
				},
				mastery: {
					name: "Stone Resonance",
					effect: "Any time a statue created by this ability is caught in an area affect from any character, you may choose one of the following: <ul><li>Deal 2 piercing damage to all character in the area effect again. </li><li>Shelter all adjacent characters to the statue from the area effect, granting them cover against its effects and +1 boon on any saves.</li></ul>",
				},
			},
			"Quaking Palm": {
				chapter: 3,
				action: [
					"1 Action",
					"Attack",
					"Range 3",
				],
				tags: [
					"Pierce",
				],
				description: "You hit your target with a pressure wave, setting up lethal vibrations in their body that are strong enough to crack the earth beneath their feet.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: [D]+1. Miss: 1.",
					},
					{
						type: "Effect",
						effect: "Foe is vulnerable.",
					},
					{
						type: "Effect",
						effect: "Set up lethal vibrations in a foe’s body. When they end their next turn, they take 1 piercing damage once for every object adjacent to them, up to a maximum of 4 times. Then, this effect ends.",
					},
					{
						type: "Charge",
						effect: "Vibrations also damage all characters in a burst 1 area effect centered on the character",
						subAbility: {
							name: "Infuse 3: Primal Burst",
							tags: [],
							effects: [
								{
									type: "",
									effect: "After this ability resolves, you may shove the affected character 1 space for each time the effect triggered. These shoves can be in any direction.",
								},
								{
									type: "Collide",
									effect: "Foe must save or be stunned.",
								},
							],
						},
					},
				],
				talents: {
					I: "While Quaking Palm’s effect is active, after that character uses any ability that moves them, create a difficult terrain space in any free space adjacent to them.",
					II: "While Quaking Palm’s effect is active, after that character uses any ability that moves them, dealing 1 piercing damage to all foes adjacent to that character.",
				},
				mastery: {
					name: "Pure Haeon",
					effect: "Quaking Palm’s effect triggers for each object in range 2 instead of adjacent.",
				},
			},
		},
	},
	"Spellblade": {
		class: "Wright",
		subtitle: "Swordmaster, Wind Dancer",
		description: "Spellblades are a martial order of highly trained wrights. Many of them come from the Guild Academies in the great cities of Arden Eld, where they often take prestigious posts in the local militias and city watch. Other wrights tend to view Spellblades as stiff, unfeeling military types, but spell blades themselves know they are consummate professionals and unparalleled masters of their art.<br><br> The lightning Aether that the spellblades wield is highly volatile, and requires intense training and focus to control. Once a spell blade has learned their craft, however, the speed, power, and precision at which they can act is intoxicating, crossing great spans of space in an instant, riding the Aetherial currents with a flash of gleaming steel.",
		traits: [
			{
				name: "Aether Deflection",
				description: "Interrupt 1: Trigger: You are targeted by an ability from a character in range 2. Effect: Gain resistance against damage from that ability. You only have one use of this interrupt per combat. However, you can spend 2 Aether any time to regain it.",
			},
			{
				name: "Conqueror’s Edge",
				description: "The Infuse cost of your abilities is reduced by 1 if there’s a foe in range 2. Additionally, many of your infuses can be triggered as slay effects instead, and you may infuse 3 Aether to trigger the slay effect of any ability. Abilities with infuse or slay effects cannot trigger both at once.",
			},
			{
				name: "Storm Hilt Rage",
				description: "At the start of round 5 and for the rest of combat, any effects that teleport you have the range of the battlefield, and you may teleport to any space before using any ability.",
			},
			{
				name: "Klingenkunst (free action)",
				description: "Teleport 2. This ability can interrupt other abilities or movement on your turn with stopping them.",
			},
		],
		ultimateTrait: {
			name: "Great Wind Riding",
			effect: "Once a turn, when you teleport, you can also teleport an adjacent ally with you, placing them in a free adjacent space after your teleport resolves.",
		},
		limitBreak: {
			name: "Gran Levincross",
			resolve: 4,
			action: [
				"2 Actions",
			],
			tags: [
				"Divine",
			],
			description: "I summon thee, bloody gods of the cutting art,<br>Let the might of the divine realm crash upon the piteous earth,<br>Strike eighty thousand blows at once,<br>And split the air asunder!",
			effects: [
				{
					type: "Effect",
					effect: "Your blade extends and you make two massive cuts across the map, splitting the walls between worlds. Draw a cross section across the map, splitting it into four sections of any size. Deal [D]+fray divine damage to all characters caught in the cross, then remove all characters out of the affected area and place them in the nearest free space of your choice. Characters can pass a save to choose which side they end up on.<br><br> The affected area becomes a crackling wall of lightning that does not block line of sight, but blocks all movement except teleporting. This effect ends at the end of the next round.<br><br> Allies can use a free action to teleport across the wall from an adjacent space, placing them on the closest adjacent space on the other side.<br><br> If any version of this ability has no valid space in which teleport a character to, still deal damage, but this ability doesn’t create the lightning wall.",
					subAbility: {
						name: "Slay or Infuse 3: Ragnarök",
						tags: [],
						effects: [
							{
								type: "Area Effect",
								effect: "After this ability resolves, scathing divine lightning hits a quarter of the map of your choice. Characters within take [D]+fray Divine damage.",
							},
						],
					},
				},
			],
			ultimateName: "Infuse 6: Götterdämmerung",
			ultimateEffect: "<b>Area effect:</b> After this ability resolves, scathing divine lightning hits every quarter of the map but one of your choice. Characters within take 2[D] +fray Divine damage.",
		},
		abilities: {
			"Blitz": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
					"Range 3",
				],
				tags: [
					"Pierce",
				],
				description: "A thousand needles of light, each striking a perfect blow.",
				effects: [
					{
						type: "Effect",
						effect: "Teleport 1, then deal 1 piercing damage to a foe in range 3, then teleport 1, then deal 1 piercing damage to a foe in range 3.",
					},
					{
						type: "Attack",
						effect: "On hit: [D]. Miss: 1 damage.",
					},
					{
						type: "Effect",
						effect: "Foe is vulnerable",
						subAbility: {
							name: "Slay or Infuse 3: Gran Blitz",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Repeat the first effect",
								},
							],
						},
					},
				],
				talents: {
					I: "When used against a bloodied foe, blitz creates two lightning dangerous terrain spaces in free space in range 2 of them.",
					II: "You can grant Blitz’s first effect to any ally in range 2 instead.",
				},
				mastery: {
					name: "Gungnir",
					effect: "The last teleport you make with Blitz creates a small blast terrain effect of crackling lightning in free space, with at least one space adjacent. The area is dangerous terrain. At the start and end of your turn, you may deal 1 piercing damage to all characters in the area. The area disappears if a new one is created.",
				},
			},
			"Odinforce": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Power Die",
					"Stance",
				],
				description: "You thrust your weapon skyward, and pierce the heavens.",
				effects: [
					{
						type: "Stance",
						effect: "Shoot a flurry of lightning bolts into the air and set out a d6 power die, starting at 3. When you enter this stance, or any time you teleport, you may call a bolt down, dealing 1 piercing damage to a foe in range 3 as an area effect, then reducing your power die by 1. This effect can trigger any number of times a turn. If you run out of bolts, Odinforce ends.",
					},
					{
						type: "Effect",
						effect: "When you trigger a slay effect, gain +2 more bolts.",
					},
					{
						type: "Refresh",
						effect: "This stance automatically refreshes at the start of your turns. When this stance refreshes, gain 2 more bolts, to a maximum of 6.",
					},
				],
				talents: {
					I: "If you end a turn without attacking, gain +2 more Odinforce bolts.",
					II: "Comeback: Odinforce gains 4 bolts instead of 2 on refresh.",
				},
				mastery: {
					name: "Levinblades",
					effect: "At round 4 or later, if you’re in this stance, you may spend 1 action and end it to deal 1 piercing damage six times, to a character in range 6, ignoring cover. If you do so, you can’t use the stance again for the rest of combat.",
				},
			},
			"Nothung": {
				chapter: 1,
				action: [
					"2 Actions",
					"Attack",
					"Range 2",
					"Arc 4",
				],
				tags: [],
				description: "You summon a blade of pure lightning energy, sweeping it in a shining arc.",
				effects: [
					{
						type: "Effect",
						effect: "Teleport 1",
					},
					{
						type: "Attack",
						effect: "On hit: 2[D] + fray. Miss: fray.",
					},
					{
						type: "Area Effect",
						effect: "Fray",
					},
					{
						type: "Effect",
						effect: "Teleport 1, then deal 1 piercing damage again to your target for every foe or ally adjacent to them, to a maximum of four times.",
						subAbility: {
							name: "Slay or Infuse 3: Gram",
							tags: [],
							effects: [
								{
									type: "Effect",
									effect: "After the ability resolves, release a flurry of slashes in a burst 2 (self) area effect, dealing 1 piercing damage, twice, to all foes.",
								},
							],
						},
					},
				],
				talents: {
					I: "When used against a bloodied foe, Nothung deals bonus damage, and deals 1 piercing damage again to its target on hit.",
					II: "Comeback: Increase teleport to 4",
				},
				mastery: {
					name: "Excalibur",
					effect: "All 1 piercing damage listed by this ability becomes divine.",
				},
			},
			"Ätherwand": {
				chapter: 1,
				action: [
					"1 Action",
					"Range 4",
				],
				tags: [
					"Terrain Effect",
				],
				description: "You summon the highwinds to batter your foes.",
				effects: [
					{
						type: "Terrain Effect",
						effect: "Swipe your weapon to create a line 3 area of crackling winds in range, with the following features: <ul><li>The area is difficult terrain. </li><li>Allies may use any space of the area for cover as if it were height 1 terrain. </li><li>Foes that end their turn in the area are shattered. </li><li>Once a round, when you include any space of the ätherwand in an area effect, you can infuse the triggering ability with stormy power, teleporting all characters targeted by that ability and any characters in the wall 1 space.</li></ul> The area lasts until created again.",
						subAbility: {
							name: "Infuse X: Äthersturm",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Infuse X aether, and extend the area by 1 spaces for every Aether infused, up to a maximum of +3 spaces.",
								},
							],
						},
					},
				],
				talents: {
					I: "When you use this ability again, it doesn’t replace the old area, but extends it, as long as at least one space of the new area is adjacent to the old.",
					II: "At the start of your turn, you can move the area 1 space in any direction. If it moves into the space of a character, it shoves them 1.",
				},
				mastery: {
					name: "Hellerwind",
					effect: "You can create a powerful gale instead. If you do, you can’t extend or move the area, but it becomes impassable terrain.",
				},
			},
			"Fulminate": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Mark",
				],
				description: "You charge your target with unstable magnetic energy, causing unstoppable attractive force.",
				effects: [
					{
						type: "Mark",
						effect: "A character in range 6 is marked. The character gains aura 2 while marked. At the start of your turn, or when marking your character, you may teleport all characters in the aura 1 space, all ending either closer or further away from the character than they started.",
					},
				],
				talents: {
					I: "When marking a character, you can increase the area to 3, and the teleport to 2, but it only affects allies.",
					II: "When marking a character, you can condense the aura to 1, but increase the teleport to 2 spaces instead.",
				},
				mastery: {
					name: "Hand of Tyr",
					effect: "Ranged attacks against the target change depending on whether you marked a foe or ally. <ul><li>On a foe, attacks are pulled towards it. They have no maximum range if they have a listed range and target the foe, deal bonus damage, and ignore cover. </li><li>On an ally, attacks made from range 2 or greater cannot critical hit (turn any critical hit into a regular hit), cannot deal bonus damage, and gain +1 curse</li></ul>",
				},
			},
			"Bifröst": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [],
				description: "You slash a line of rampant multicolored lightning aether, a blinding arch of light that can carry you or your allies to safety.",
				effects: [
					{
						type: "Area Effect",
						effect: "Sweep your blade to cut a line 3 crackling lightning arch, dealing 2 piercing damage to all characters in the area.",
					},
					{
						type: "Terrain Effect",
						effect: "The arch remains in the air. Yourself and allies that enter any space in or adjacent to the area can grab on to it as a free action ability to immediately teleport to any other free space in or adjacent to the area. Then the area is consumed, removing it.",
						subAbility: {
							name: "Slay or Infuse 3: Heimdall",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Create a new line 3 terrain effect, which cannot overlap the first. This second effect does not deal damage but has the same terrain effect as the first.",
								},
							],
						},
					},
				],
				talents: {
					I: "The teleport from Bifröst can interrupt other actions and does not stop movement.",
					II: "Bifröst areas grow by 2 spaces, added anywhere to the total area in any pattern, at the end of each round. When they grow, deal 1 piercing damage to all characters inside.",
				},
				mastery: {
					name: "Path to Erenhelion",
					effect: "Bifröst bounces if its end space lands in the space of an object, creating a second line 3 area that extends the total area effect and terrain effect area.",
				},
			},
			"Rampant Nail": {
				chapter: 2,
				action: [
					"1 Action",
					"Range 3",
				],
				tags: [
					"Power Die",
				],
				description: "A weapon of pure lightning energy impales itself into the earth, flying from a phantom arsenal, and crackling with potential.",
				effects: [
					{
						type: "Terrain Effect",
						effect: "You impale a fierce spike of lightning aether in a space in range. The spike lasts until activated (see below) or a new spike is summoned.",
						subAbility: {
							name: "Lightning Spike",
							tags: [],
							effects: [
								{
									type: "Terrain Effect",
									effect: "The spike has aura 2. Whenever you or an ally deals 3 or less damage to a character in the aura, gain a d6 power die at 1, or tick the power die by up 1. At the start of any turn the die is at maximum, the spike becomes charged with energy. While charged, you can cause the spike to explode as a free action ability, dealing 1 piercing damage, twice to all characters in the aura asan area effect, shattering them, and shoving them 1 away from it. The spike is then removed.",
								},
							],
						},
					},
					{
						type: "",
						effect: "",
						subAbility: {
							name: "Slay or Infuse 3: Ruinös",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Re-summon the nail after it detonates, discarding the first power die.",
								},
							],
						},
					},
				],
				talents: {
					I: "While the nail is active, a small blast area centered on the nail is dangerous terrain.",
					II: "At the start of your turn, tick the power die up by 1 for every bloodied foe or ally in the area.",
				},
				mastery: {
					name: "Voracious Nail",
					effect: "Characters that start their turn adjacent to the nail become vulnerable. Vulnerable characters are vulnerable+ instead while inside the nail’s aura.",
				},
			},
			"Sturmreiten": {
				chapter: 2,
				action: [
					"Interrupt 1",
				],
				tags: [],
				description: "You transmute yourself and your gear into pure lightning Aether, coursing through the boundaries between worlds in a moment.",
				effects: [
					{
						type: "Trigger",
						effect: "You are damaged by foe’s ability, and the ability resolves.",
					},
					{
						type: "Effect",
						effect: "Draw a line 3 area effect, then teleport to the end space. If you can’t teleport there, this ability can’t be used. All other characters in the area take 2 piercing damage.",
					},
				],
				talents: {
					I: "You may teleport one adjacent ally with you to any free adjacent space after this interrupt resolves.",
					II: "Comeback: You may extend Sturmreiten’s area by another line 3 area, drawn in a different direction.",
				},
				mastery: {
					name: "Mjöllnir",
					effect: "Create an arc 5 area any time you would create an area with this ability instead.",
				},
			},
			"Drifting Leaf": {
				chapter: 3,
				action: [
					"2 Actions",
					"Attack",
					"Line 6",
				],
				tags: [],
				description: "Agile and alert, your swordcraft spells doom for your foe. When they go to retaliate, you were never there.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: 2[D]+fray, Miss: fray damage.",
					},
					{
						type: "Effect",
						effect: "Foe is shattered.",
					},
					{
						type: "Area Effect",
						effect: "Fray",
					},
					{
						type: "Effect",
						effect: "After the attack resolves, teleport 1, then gain the Leaf on the Wind interrupt until the start of your next turn.",
						subAbility: {
							name: "Leaf on the Wind",
							tags: [
								"Interrupt 2",
							],
							effects: [
								{
									type: "Trigger",
									effect: "A foe enters a space adjacent to you",
								},
								{
									type: "Effect",
									effect: "Teleport 2, then deal 1 piercing damage to that foe.",
								},
							],
						},
					},
					{
						type: "",
						effect: "",
						subAbility: {
							name: "Slay or Infuse 3: Phantom Blade",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Until the start of your next turn, this interrupt has unlimited uses.",
								},
							],
						},
					},
				],
				talents: {
					I: "Drifting Leaf deals bonus damage against bloodied foes, and its interrupt deals 1 piercing damage, twice to them instead.",
					II: "You may teleport your foe to any space adjacent to you instead of teleporting yourself 1 instead when this interrupt triggers.",
				},
				mastery: {
					name: "Great Cyclone",
					effect: "At round 4 or later, Drifting Leaf’s infuse is always active.",
				},
			},
		},
	},
	"Stormbender": {
		class: "Wright",
		subtitle: "Dire Navigator, Master of the Waves",
		description: "The seas of Arden Eld are its most treacherous terrain. Boiling over with monsters, and wracked with unnatural and freakish weather, most folk prefer to give them wide berth. However, there are still those brave and hardy souls that live on the islands around Arden Eld, and the merchants, sailors, and travelers that rely on the sea for fast passage and the movement of cargo, the lifeblood of the continent’s great cities.<br><br> The storm benders are the great masters of the sea, the supreme navigators that make sailing even possible around Arden Eld. Water-attuned wrights, they are most at home on a deck, or clambering the rigging. Each of them are sailors of the highest caliber, coming from all over - old trade guilds, islander clans, and nautical churner enclaves.<br><br> Bending the essence of the sea to their beck and call, the storm benders can clear the skies with a swipe of their hands, feel the currents ahead for aquatic monsters, turn weather away from the hull of the ship, and blow wind into its sails. It doesn’t matter that many of them dabble in a little light piracy on the side - they are the undisputed masters of their element, and they wouldn’t have it any other way.",
		traits: [
			{
				name: "Selkie",
				description: "You have a bound elemental. At the start of any combat, summon it in range 3.",
				subAbility: {
					name: "Selkie",
					tags: [
						"Size 1",
						"Intangible",
						"Flying",
					],
					effects: [
						{
							type: "Summon Effect",
							effect: "Your Selkie can share space with characters, and is also considered a terrain effect.",
						},
						{
							type: "Summon Action",
							effect: "The Selkie may fly 3 at the end of your turn. Any character standing in the Selfie’s space when it moves is removed from the battlefield, then placed back in its space, or adjacent to it if that space is occupied.",
						},
					],
				},
			},
			{
				name: "Dash on the Rocks",
				description: "1/round when you cause a character to collide, you may gain 1 aether and deal 1 piercing damage as a burst 1 area effect centered on that character.",
			},
			{
				name: "Sea Legs",
				description: "You deal bonus damage to characters in pits, difficult, or dangerous terrain. While inside any of your own terrain effects, you have flying.",
			},
			{
				name: "Pelagic Rage",
				description: "At the start of round 5 and for the rest of combat, you are buoyed up by a huge swell of elemental water. You gain aura 2. Yourself and allies in the aura gain flying and cover from all direction, and the area is difficult and dangerous terrain for foes.",
			}
		],
		ultimateTrait: {
			name: "Whirlgang",
			effect: "You are highly attuned to the ambient air currents and can command them at will. At the start of your turn, yourself and every ally in range 2 of you may fly 1 in the same direction as an effect.",
		},
		limitBreak: {
			name: "Elemental",
			resolve: 3,
			action: [
				"Free Action",
			],
			tags: [],
			description: "On account of the magic that is in my body,<br>Turn aside, detested of Sea and Storm,<br>Thou wretch, go with thy face diverted!<br>I call the elements into the temple of my body.<br>Be scattered like dust, and feed the wind!",
			effects: [
				{
					type: "Effect",
					effect: "You take on a fearsome elemental form, gaining the following benefits for the rest of combat:<br><br> While you are an Elemental: <ul><li>You gain flying and phasing. </li><li>You release aura 2 around you. The area is a terrain effect that moves with you that is difficult and dangerous terrain for foes, and allies gain cover from all directions in the area. </li><li>You can share space with characters. You have resistance to any character sharing your space, and allies have resistance while sharing your space.</li></ul>",
				},
			],
			ultimateName: "Shield of the Four Winds",
			ultimateEffect: "If you so choose, when an ally would be shoved, teleported, or removed from your area, you can completely prevent that ally from being moved. This effect can trigger only once a round.",
		},
		summons: {
			description: "Many stormbender abilities summon a Salt Sprite. When a Salt Sprite is summoned, it can be summoned in range 2 unless a different range is specified. You can have a maximum of six active Salt Sprites.",
			summons: [
				{
					name: "Salt Sprite",
					tags: [
						"Size 1",
						"Intangible",
						"Immobile",
					],
					effects: [
						{
							type: "Summon Effect",
							effect: "The Sprite is both a summon and terrain effect. It can share spare with other characters, and its area counts as difficult terrain.",
						},
						{
							type: "Effect",
							effect: "When a character is shoved into the sprite’s area, it triggers collide effects and awakens it. Allies shoved into its space can fly 2. Foes are shoved 2 in any direction. Then, remove the sprite.",
						},
					],
				},
			],
		},
		abilities: {
			"Rime": {
				chapter: 1,
				action: [
					"2 Actions",
					"Attack",
					"Line 6",
				],
				tags: [
					"Summon",
				],
				description: "You pull an enormous weapon made of pure ice out of the air, and hurl it through foes.",
				effects: [
					{
						type: "Attack",
						effect: "On hit: 2[D]+fray. Miss: Fray",
					},
					{
						type: "Area Effect",
						effect: "Fray",
					},
					{
						type: "Effect",
						effect: "Shove all characters 1 to either side of the line. You can shove in different directions for all characters. Then shove the attack target 1 and summon a salt sprite in any space in range 2 from them.",
					},
					{
						type: "Collide",
						effect: "Summon a Salt Sprite",
						subAbility: {
							name: "Infuse 3: Dagon",
							tags: [],
							effects: [
								{
									type: "",
									effect: "This ability gains range 6, and gains collide: creates a watery pit under this character after this ability resolves.",
								},
							],
						},
					},
				],
				talents: {
					I: "If the end space of Rime hits a pit or object, the weapon bounces back and deals 1 piercing damage, twice, as an area effect to all affected characters again.",
					II: "If the end space of Rime hits a pit or object, it explodes into a shower of icicles, dealing 1 piercing damage to one or two characters as an area effect in range 3 of that pit or object, and summoning a salt sprite adjacent to each of those characters.",
				},
				mastery: {
					name: "Magnarime",
					effect: "",
					subAbility: {
						name: "Infuse X: Magnarime",
						tags: [],
						effects: [
							{
								type: "",
								effect: "Rime can be infused with massive aether, becoming Infuse X. If so: <ul><li>The area gains range 6 and becomes Arc 4, plus one per aether infused. </li><li>Summon a pit in the area after the ability resolves for every two aether infused. </li><li>Deal 1 piercing damage to all characters in the area again after the ability resolves for every two aether infused.</li></ul>",
							},
						],
					},
				},
			},
			"Tsunami": {
				chapter: 1,
				action: [
					"2 Actions",
				],
				tags: [
					"Terrain Effect",
				],
				description: "The stormbenders can ride swells of water as easily as any terrestrial steed. For those not as gifted, the experience is less pleasant.",
				effects: [
					{
						type: "Terrain Effect",
						effect: "Create a huge swell of elemental water. The area is a medium blast terrain effect that is difficult and dangerous terrain that you may place anywhere as long as its edge is adjacent to an edge of the map.<br><br> When you use this ability, choose another edge of the map. When you use this ability, and the start of your turns, your tsunami moves 4 spaces in a straight line towards that edge. When a space of the tsunami would move off the map, the effect ends.<br><br> Any non-flying characters in Tsunami when it moves are dragged with it, shoving them. If they are blocked by obstructions, they collide which could cause Tsunami to move on without them.",
					},
					{
						type: "Collide",
						effect: "Character is shattered.<br><br> All your Tsunamis disappear if you use this ability again, or they reach an edge of the map.",
						subAbility: {
							name: "Infuse 1: Stormlash",
							tags: [
								"Free Action",
							],
							effects: [
								{
									type: "",
									effect: "Choose an edge of the map. Your active tsunamis move 2 spaces in that direction.",
								},
							],
						},
					},
				],
				talents: {
					I: "Tsunami creates a pit in its center space after completing its movement. The pit remains even if Tsunami moves on.",
					II: "Foes inside Tsunami take +1 curse on saves.",
				},
				mastery: {
					name: "Legendary Storm",
					effect: "At round 4+, Tsunami becomes 1 action, moves anywhere from to 1 to 4 spaces instead of a flat 4, and also affects flying foes.",
				},
			},
			"Cryo": {
				chapter: 1,
				action: [
					"1 Action",
					"Attack",
					"Line 8",
				],
				tags: [
					"Pierce",
				],
				description: "You shoot a spear of frozen water aether at your foe, stirring up ambient water aether in the air.",
				effects: [
					{
						type: "Effect",
						effect: "Foe is shattered and shoved 1 towards you.",
					},
					{
						type: "Attack",
						effect: "Auto hit: 1 damage.",
					},
					{
						type: "Area Effect",
						effect: "1 damage",
					},
					{
						type: "Effect",
						effect: "Gain 1 Aether",
					},
					{
						type: "Effect",
						effect: "If any character is already shattered, create a pit under them.",
						subAbility: {
							name: "Infuse 3: Cryotic",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Change area to Line 8, increase damage to fray damage, and gains effect: summon a salt sprite for every character in the area adjacent to those characters.",
								},
							],
						},
					},
				],
				talents: {
					I: "At round 4 or later, this ability generates +1 Aether when used.",
					II: "At round 4 or later, this ability shatters all characters in its area.",
				},
				mastery: {
					name: "Magnacryo",
					effect: "Magnacryo benefits from all Cryo Talents",
					subAbility: {
						name: "Infuse X: Magnacryo",
						tags: [
							"2 Actions",
							"Line 4",
							"Attack",
							"Pierce",
						],
						effects: [
							{
								type: "Special",
								effect: "Increase the line length by 2 and attack deals bonus damage for every two aether spent",
							},
							{
								type: "Attack",
								effect: "On hit: 2[D] + fray. Miss: [D]+fray.",
							},
							{
								type: "Effect",
								effect: "Attack target is shattered.",
							},
							{
								type: "Area Effect",
								effect: "[D]+fray",
							},
							{
								type: "Effect",
								effect: "The attack target is impaled with an icy harpoon, then shoved along the line as far as possible towards you, until they collide or are stopped by an obstruction.",
							},
						],
					},
				},
			},
			"Geyser": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Object",
					"Summon",
				],
				description: "You awaken the water aether lying dormant in the land or sea, causing it to surge up in a vigorous burst.",
				effects: [
					{
						type: "Object Effect",
						effect: "Summon a height 1 geyser object in a free space in range 4. If any character either starts or ends their turn on a geyser, you can cause it to erupt, removing that character from the battlefield, then placing them one or two spaces away. Then, remove the geyser.",
					},
					{
						type: "Effect",
						effect: "After the geyser is removed, summon a Salt Sprite in its space.",
						subAbility: {
							name: "Infuse 3: Volcanic Geyser",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Create a Volcanic Geyser instead. When it erupts, it removes and places all characters in a medium blast area effect centered on it, and creates dangerous terrain under foes.",
								},
							],
						},
					},
				],
				talents: {
					I: "Increase the height of all geysers by +1 at the start of your turn. Allies standing on a geyser have cover from all directions.",
					II: "Once a round, when a character collides with a geyser, summon a Salt Sprite in range 2 from them.",
				},
				mastery: {
					name: "Great Geyser",
					effect: "Allies can be placed up to three spaces away by a geyser and after landing gain flying until the end of their next turn.",
				},
			},
			"Gust": {
				chapter: 1,
				action: [
					"1 Action",
				],
				tags: [
					"Terrain Effect",
				],
				description: "The stormbenders are friend to breeze and gale, and have learned how to coax the wind into doing their bidding.",
				effects: [
					{
						type: "Terrain Effect",
						effect: "Create a line 3 terrain effect. Characters that enter any end space of the line gain phasing, then are shoved to the other end space of the line, or as far as possible. Once they stop, they are flung out and shoved 1 in a direction of your choice outside of the area. Characters entering a middle space can be shoved in a direction of your choice.",
					},
					{
						type: "Collide",
						effect: "Character releases a wind blast as a burst 1 area effect centered on them, shoving all characters inside 1 space away from them and dealing 2 piercing damage.<br><br> The area is replaced if this ability is used again.",
						subAbility: {
							name: "Infuse 4: Great Gust",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Gust can be created over characters, and immediately activates its effect when it is created, as if characters inside had entered its space.",
								},
							],
						},
					},
				],
				talents: {
					I: "Gust can be used for cover by allies as if it were height 1 terrain.",
					II: "Yourself and allies that are shoved by gust can fly 2 after stopping instead of being shoved.",
				},
				mastery: {
					name: "Northsoul",
					effect: "Gust’s area is not replaced if the ability is used again, though you cannot have more than three areas active.",
				},
			},
			"Heavo-Ho": {
				chapter: 1,
				action: [
					"Interrupt 1",
				],
				tags: [],
				description: "Better get your sea legs.",
				effects: [
					{
						type: "Trigger",
						effect: "A foe damages you or an ally adjacent to either you or a summon you control with an ability.",
					},
					{
						type: "Effect",
						effect: "After the triggering ability resolves create a crashing wave in a medium blast area effect placed adjacent to you or your summon. Characters caught in the area are shoved 1, and foes become vulnerable.",
					},
					{
						type: "Collide",
						effect: "Summon a salt sprite.",
					},
				],
				talents: {
					I: "If only one foe is caught in the area of wave, also create a pit underneath them.",
					II: "If you don’t use this interrupt, stock up another use of it at the start of your turn. You can stock it up to interrupt 3.",
				},
				mastery: {
					name: "Tidal Smash",
					effect: "",
					subAbility: {
						name: "Infuse X: Tidal Smash",
						tags: [],
						effects: [
							{
								type: "",
								effect: "The shove spaces become shove X. Collide: foes are shattered.",
							},
						],
					},
				},
			},
			"Deepwrath": {
				chapter: 2,
				action: [
					"1 Action",
				],
				tags: [
					"Mark",
				],
				description: "You mark your foe with the symbol of the Deep Water Titan. No matter where they step, the deeps come up to claim them.",
				effects: [
					{
						type: "Mark",
						effect: "Mark a character in range 6. While marked, create a watery pit under them at the start of their turn.",
					},
					{
						type: "Effect",
						effect: "If the marked character ends their turn inside a pit, you can drag them under, removing them from the battlefield, then placing them in the space of any other pit in range 3 from their original location.",
					},
				],
				talents: {
					I: "Marked allies gain +1 boon on saves in pits, and foes don’t gain any height advantage against them while they are inside pits.",
					II: "Marked foes take bonus damage from all sources and are shaterred+ while inside pits.",
				},
				mastery: {
					name: "Darktide",
					effect: "The first time the marked character vacates a space during their turn, they leave a dangerous terrain space behind them. Marked allies are immune to dangerous terrain, and marked foes take +1 more damage from dangerous terrain.",
				},
			},
			"Waterspout": {
				chapter: 2,
				action: [
					"1 Action",
				],
				tags: [],
				description: "You grab the reigns of the storm and pull it to earth, causing a rippling tornado of water.",
				effects: [
					{
						type: "Terrain Effect",
						effect: "Summon a waterspout in a space in range that is difficult terrain. When summoned, or at the start of your turn, you you may have the waterspout suck in any characters of your choice in range 2 of it. Foes can pass a save to avoid this effect, and allies can always choose to avoid it. When a character is sucked in, they are removed from the battlefield. At the end of your turn, the waterspout spits out all characters it sucked in, in any order, placing them in any other free space in range 2 outside of the spout.",
					},
					{
						type: "Effect",
						effect: "Once during your turn, you may move the waterspout 1 space.<br><br> The spout is replaced if this ability is used again.",
						subAbility: {
							name: "Infuse 2: Great Waterspout",
							tags: [],
							effects: [
								{
									type: "",
									effect: "The waterspout can also suck in objects in the area, removing and placing them before all characters.",
								},
							],
						},
					},
				],
				talents: {
					I: "After characters are spit out, they are shoved 1 away from the waterspout.",
					II: "If only one foe or ally is inside the waterspout, it can move 3 space instead, and leaves a space of difficult terrain in one space that it vacates.",
				},
				mastery: {
					name: "Hurricane",
					effect: "At round 4 or later, waterspouts grow to a small blast area instead of a single space. They become dangerous terrain, and characters that start their turns adjacent to the area are shoved 1 in a direction of your choice.",
				},
			},
			"Eye of the Storm": {
				chapter: 3,
				action: [
					"1 Action",
					"Attack",
					"Range 8",
					"Medium Blast",
				],
				tags: [
					"Pierce",
				],
				description: "A storm of vigorous thunder and acid rain descends at your command, but the center remains calm.",
				effects: [
					{
						type: "",
						effect: "This attack has no attack space. Instead, the attack space is clear and exempt from this area.",
					},
					{
						type: "Area Effect",
						effect: "[D]",
					},
					{
						type: "Effect",
						effect: "If an ally is in the center space, they may fly 4 after the ability resolves. If an enemy is in the center space, they become vulnerable.",
						subAbility: {
							name: "Infuse 3: Aeoncloud",
							tags: [],
							effects: [
								{
									type: "",
									effect: "Increase area effect to a large blast and damage to [D]+fray. The center space is still clear.",
								},
							],
						},
					},
				],
				talents: {
					I: "If there is no character in the center space, create a pit there. The pit is also dangerous terrain.",
					II: "The center character may also take 1 piercing damage, once, for every foe or ally in in the area effect, up to three times.",
				},
				mastery: {
					name: "Great Aeoncloud",
					effect: "<b>Object:</b> If there is no character in the center space, you may also create a height 1 aethercloud object in the center space. At the start of your turn, the cloud drifts 3 spaces in a space of your choice. Any character on top of the cloud when it moves moves with it, and is unstoppable while moving this way.",
				},
			},
		},
	},
}