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
  [169474]: 37, // Cunning
  [163564]: 38, // Divine Destruction
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
  [186486]: 56, // Char
  [186604]: 57, // Cold Snap
  [186598]: 58, // Fungal Forage
  [186488]: 59, // Gore
  [186485]: 60, // Infest
  [186602]: 61, // Perennial Bloom
  [186601]: 62, // Petals of the Hunter
  [186603]: 63, // Sleetmail
  [186605]: 64, // Snow Squall
  [193973]: 65, // Survivalist
  [186056]: 66, // Swoop
  [214948]: 68, // Explosive Fortitude
  [215042]: 69, // Extinguishing Breath
  [214708]: 70, // Haze of Cinders
  [215048]: 71, // Igneous Armor
  [214865]: 72, // Internal Conflict
  [215215]: 74, // Ruinous Outburst
  [215001]: 75, // Shattered Spirit
  [214685]: 76, // Spirited
  [214703]: 77, // Volcanic Arms
  [222209]: 78, // Atoning Spirit
  [213162]: 79, // Azurah's Embrace
  [213169]: 80, // Blade of the Crossing
  [213164]: 81, // Crescent Scythe
  [213166]: 82, // Dark Moon Totem
  [213160]: 83, // Penance of Lorkhaj
  [213165]: 84, // Perigean Armor
  [213158]: 85, // Sepulchral Chill
  [216057]: 86, // Strands of the Lattice
  [214162]: 87, // Third Moon's Chosen
  [213157]: 88, // Varmiina's Visage
  [156599]: 89, // Bulwark
  [157730]: 90, // Firmness
  [156340]: 91, // Haste
  [157728]: 92, // Flow
  [156596]: 93, // Vanish
  [157729]: 94, // Flexibility
  [152793]: 95, // Piercing Arrow
  [152701]: 96, // Trick Shot
  [152863]: 97, // Viper's Bite
  [157230]: 98, // Arcane Nova
  [157131]: 99, // Destructive Blast
  [157140]: 100, // Elemental Barricade
  [152696]: 101, // Razor Cape
  [152693]: 102, // Spinning Steel
  [152629]: 103, // Swift Assault
  [155326]: 104, // Bashing Bulwark
  [155328]: 105, // On Guard
  [152625]: 106, // Provoke
  [153467]: 107, // Mending Incantation
  [153685]: 108, // Mystic Fortress
  [153066]: 109, // Rejuvenation
  [152624]: 110, // Sever
  [152433]: 111, // Staggering Swing
  [152512]: 112, // Sunder
  [157747]: 113, // Biting Trap
  [154926]: 114, // Ritual of Salvation
  [153686]: 115, // Sniping Silver
  [155411]: 116, // Parallel
  [155408]: 117, // Reverse Entropy
  [155403]: 118, // Starfall
  [155515]: 119, // Crimson Font
  [157240]: 120, // Savage Instinct
  [155693]: 121, // Skeletal Aegis
}

export function getSkillIndex(abilityId: number): number {
  return SKILL_ABILITY_ID_TO_INDEX[abilityId] ?? 0
}
