import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const mysticOrb42028 = {
  id: "019e6f53-a4a8-7507-8425-a5fb23a28a81",
  type: "page-type/temper-skill",
  slug: "mystic-orb-42028",
  title: "Mystic Orb",
  key: "mystic-orb-42028",
  baseName: "Necrotic Orb",
  description:
    "Project a globe of annihilation that slowly floats forward, dealing |cffffff1136|r Magic Damage every |cffffff1|r second to nearby enemies. \n\nWhile the orb is active you gain |cffffff100|r Health, Magicka, and Stamina Recovery.\n\nAn ally near the globe can activate the Combustion synergy, causing the orb to explode for |cffffff8261|r Magic Damage to nearby enemies and restore |cffffff3960|r Magicka or Stamina to the ally, whichever maximum is higher.",
  icon: "/esoui/art/icons/ability_undaunted_004_a.dds",
  esoSkillId: 42028,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 5,
  skillLineId: "temper-skill-line/guild-undaunted",
  skillType: "temper-skill-type/active",
  hashPlace: 844,
  createdAt: "2026-05-28T16:03:33.160Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0140398 MaxStat + 0.14801 MaxPower - 0.611342 (Ultimate, ratio = 10.54, Dmg, Magic, AOE, DOT, 1s tick, R2 = 0.999986)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 70 (Constant)",
    "<<4>> = Combustion (Constant)",
    "<<5>> = 0.0999631 MaxStat + 1.0499 MaxPower - 0.231961 (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<6>> = 3960 (Constant)",
  ],
} as const satisfies TemperSkill
