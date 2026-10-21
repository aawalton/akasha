import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const necroticOrb = {
  id: "019e6f53-a4b9-7198-9078-d6373119fbb2",
  type: "page-type/temper-skill",
  slug: "necrotic-orb",
  title: "Necrotic Orb",
  key: "necrotic-orb",
  baseName: "Necrotic Orb",
  description:
    "Project a globe of annihilation that slowly floats forward for |cffffff10|r seconds, dealing |cffffff1100|r Magic Damage every |cffffff1|r second to nearby enemies. \n\nAn ally near the globe can activate the Combustion synergy, causing the orb to explode for |cffffff8261|r Magic Damage to nearby enemies and restore |cffffff3960|r Magicka or Stamina to the ally, whichever maximum is higher.",
  icon: "/esoui/art/icons/ability_undaunted_004.dds",
  esoSkillId: 39298,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/guild-undaunted",
  skillType: "temper-skill-type/active",
  hashPlace: 854,
  createdAt: "2026-05-28T16:03:33.177Z",
  updatedAt: "2026-10-21T04:08:18.668Z",
  equations: [
    "<<1>> = 10 seconds (Constant)",
    "<<2>> = 0.013747128 MaxStat + 0.14434485 MaxPower (Ultimate, Dmg, Magic, AOE, DOT, 1s tick)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = Combustion (Constant)",
    "<<5>> = 0.099991429 MaxStat + 1.04991 MaxPower (Ultimate, Dmg, Magic, AOE, Direct, Melee)",
    "<<6>> = 3960 (Constant)",
  ],
} as const satisfies TemperSkill
