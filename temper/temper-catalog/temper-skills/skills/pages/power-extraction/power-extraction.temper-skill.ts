import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const powerExtraction = {
  id: "019e6245-a6e8-74e6-a848-8378274bb86b",
  pageTypeSlug: "temper-skill",
  slug: "power-extraction",
  title: "Power Extraction",
  key: "power-extraction",
  baseName: "Drain Power",
  description:
    '"Siphon the vigor from your enemies\' blood, dealing 1742 Disease Damage to all nearby enemies.\\n\\nIf an enemy is hit you gain Major Brutality and Sorcery, and Minor Courage increasing your Weapon and Spell Damage by 20% and 215 for 30 seconds. Enemies hit have Minor Cowardice applied to them for 10 seconds, reducing their Weapon and Spell Damage by 215."',
  icon: "/esoui/art/icons/ability_nightblade_013_b.dds",
  esoSkillId: 37937,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
