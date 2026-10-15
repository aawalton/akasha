import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const powerExtraction36901 = {
  id: "019e6f53-a524-71d7-9388-9f7375124bf1",
  type: "page-type/temper-skill",
  slug: "power-extraction-36901",
  title: "Power Extraction",
  key: "power-extraction-36901",
  baseName: "Drain Power",
  description:
    "Siphon the vigor from your enemies' blood, dealing |cffffff6401|r Disease Damage to all nearby enemies.\n\nIf an enemy is hit you gain Major Brutality and Sorcery, and Minor Courage increasing your Weapon and Spell Damage by |cffffff20|r% and |cffffff215|r for |cffffff30|r seconds. Enemies hit have Minor Cowardice applied to them for |cffffff10|r seconds, reducing their Weapon and Spell Damage by |cffffff215|r.",
  icon: "/esoui/art/icons/ability_nightblade_013_b.dds",
  esoSkillId: 36901,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 910,
  createdAt: "2026-05-28T16:03:33.284Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, Dmg, Disease, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 20% (Constant)",
    "<<3>> = 215 (Constant)",
    "<<4>> = 30 seconds (Constant)",
    "<<5>> = Minor Cowardice (Constant)",
    "<<6>> = 7 seconds (Constant)",
    "<<7>> = 215 (Constant)",
  ],
} as const satisfies TemperSkill
