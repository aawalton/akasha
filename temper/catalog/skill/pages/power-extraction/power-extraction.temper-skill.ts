import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const powerExtraction = {
  id: "019e6245-a6e8-74e6-a848-8378274bb86b",
  type: "page-type/temper-skill",
  slug: "power-extraction",
  title: "Power Extraction",
  key: "power-extraction",
  baseName: "Drain Power",
  description:
    "Siphon the vigor from your enemies' blood, dealing 1742 Disease Damage to all nearby enemies.\n\nIf an enemy is hit you gain Major Brutality and Sorcery, and Minor Courage increasing your Weapon and Spell Damage by 20% and 215 for 30 seconds. Enemies hit have Minor Cowardice applied to them for 10 seconds, reducing their Weapon and Spell Damage by 215.",
  icon: "/esoui/art/icons/ability_nightblade_013_b.dds",
  esoSkillId: 37937,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 909,
  createdAt: "2026-05-26T03:13:12.424Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, Dmg, Disease, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 20% (Constant)",
    "<<3>> = 215 (Constant)",
    "<<4>> = 30 seconds (Constant)",
    "<<5>> = Minor Cowardice (Constant)",
    "<<6>> = 10 seconds (Constant)",
    "<<7>> = 215 (Constant)",
  ],
} as const satisfies TemperSkill
