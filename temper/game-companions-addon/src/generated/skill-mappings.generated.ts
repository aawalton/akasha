/**
 * Skill Mappings (Generated)
 *
 * Maps ESO ability IDs to temper skill indices.
 * Source: engine/companions/skills/companion-skills-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const SKILL_ABILITY_ID_TO_INDEX: Record<number, number> = {
  [191939]: 1, // Abor's Augmented Ward
  [191765]: 2, // Fate Omen's Inspiration
  [194266]: 3, // Fear of the Unknown
  [193130]: 4, // Scathing Rune
  [192937]: 5, // Shields of Erudition
  [193971]: 6, // Son of Kozanset
  [191293]: 7, // Tendrils of the Colorless Sea
  [191273]: 8, // The Triune Word
  [192574]: 9, // Triptych Physic
  [195103]: 10, // Vigorous Tentacular Eruption
  [193126]: 11, // Zone of Recuperation
  [153851]: 12, // Basalt Barrier
  [153839]: 13, // Blazing Grasp
  [155186]: 14, // Crag Smash
  [153812]: 15, // Crushing Claws
  [155268]: 16, // Drake's Blood
  [153687]: 17, // Fiery Flail
  [154925]: 18, // Kindle
  [154923]: 19, // Scorching Strike
  [155355]: 20, // Searing Weapons
  [157245]: 21, // Tough
  [157016]: 22, // Unleashed Rage
  [164289]: 23, // Crystal Blast
  [169465]: 24, // Enchanted
  [165871]: 25, // Entomb
  [165860]: 26, // Hurricane Visage
  [166018]: 27, // Quick Fix
  [164191]: 28, // Raging Storm
  [166068]: 29, // Second Wind
  [166069]: 30, // Shared Wards
  [166085]: 31, // Shocking Burst
  [164291]: 32, // Thunderous Strike
  [165865]: 33, // Trickster's Trap
  [163763]: 34, // Baneslayer
  [163684]: 35, // Beam of Reproach
  [163614]: 36, // Blessed Sacrament
  [163564]: 37, // Divine Destruction
  [169474]: 38, // Cunning
  [163590]: 39, // Gallant Blitz
  [163660]: 40, // Holy Ground
  [163458]: 41, // Penetrating Strikes
  [163442]: 42, // Solar Ward
  [163725]: 43, // Spear of Light
  [163452]: 44, // Sun Brand
  [157287]: 45, // Blood Transfusion
  [157250]: 46, // Dynamic
  [157197]: 47, // Ghostly Evasion
  [157259]: 48, // Impeccable Shot
  [154790]: 49, // Life Absorption
  [157207]: 50, // Life Siphon
  [153856]: 51, // Masque of Torment
  [156182]: 52, // Shadow Slash
  [153855]: 53, // Slayer's Blade
  [157201]: 54, // Twilight Mantle
  [153853]: 55, // Warp Strike
  [157230]: 56, // Arcane Nova
  [155326]: 57, // Bashing Bulwark
  [157747]: 58, // Biting Trap
  [156599]: 59, // Bulwark
  [155515]: 60, // Crimson Font
  [157131]: 61, // Destructive Blast
  [157140]: 62, // Elemental Barricade
  [157730]: 63, // Firmness
  [157729]: 64, // Flexibility
  [157728]: 65, // Flow
  [156340]: 66, // Haste
  [153467]: 67, // Mending Incantation
  [153685]: 68, // Mystic Fortress
  [155328]: 69, // On Guard
  [155411]: 70, // Parallel
  [152793]: 71, // Piercing Arrow
  [152625]: 72, // Provoke
  [152696]: 73, // Razor Cape
  [153066]: 74, // Rejuvenation
  [155408]: 75, // Reverse Entropy
  [154926]: 76, // Ritual of Salvation
  [157240]: 77, // Savage Instinct
  [152624]: 78, // Sever
  [155693]: 79, // Skeletal Aegis
  [153686]: 80, // Sniping Silver
  [152693]: 81, // Spinning Steel
  [152433]: 82, // Staggering Swing
  [155403]: 83, // Starfall
  [152512]: 84, // Sunder
  [152629]: 85, // Swift Assault
  [152701]: 86, // Trick Shot
  [156596]: 87, // Vanish
  [152863]: 88, // Viper's Bite
  [186486]: 89, // Char
  [186604]: 90, // Cold Snap
  [186598]: 91, // Fungal Forage
  [186488]: 92, // Gore
  [186485]: 93, // Infest
  [186602]: 94, // Perennial Bloom
  [186601]: 95, // Petals of the Hunter
  [186603]: 96, // Sleetmail
  [186605]: 97, // Snow Squall
  [193973]: 98, // Survivalist
  [186056]: 99, // Swoop
  [214948]: 101, // Explosive Fortitude
  [215042]: 102, // Extinguishing Breath
  [214708]: 103, // Haze of Cinders
  [215048]: 104, // Igneous Armor
  [214865]: 105, // Internal Conflict
  [215215]: 107, // Ruinous Outburst
  [215001]: 108, // Shattered Spirit
  [214685]: 109, // Spirited
  [214703]: 110, // Volcanic Arms
  [222209]: 111, // Atoning Spirit
  [213162]: 112, // Azurah's Embrace
  [213169]: 113, // Blade of the Crossing
  [213164]: 114, // Crescent Scythe
  [213166]: 115, // Dark Moon Totem
  [213160]: 116, // Penance of Lorkhaj
  [213165]: 117, // Perigean Armor
  [213158]: 118, // Sepulchral Chill
  [216057]: 119, // Strands of the Lattice
  [214162]: 120, // Third Moon's Chosen
  [213157]: 121, // Varmiina's Visage
}

export function getSkillIndex(abilityId: number): number {
  return SKILL_ABILITY_ID_TO_INDEX[abilityId] ?? 0
}
