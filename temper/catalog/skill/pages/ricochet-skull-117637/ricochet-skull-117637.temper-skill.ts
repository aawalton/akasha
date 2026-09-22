import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ricochetSkull117637 = {
  id: "019e6f53-a654-74dd-9ae9-5545e6341b07",
  type: "page-type/temper-skill",
  slug: "ricochet-skull-117637",
  title: "Ricochet Skull",
  key: "ricochet-skull-117637",
  baseName: "Flame Skull",
  description:
    '"Lob an explosive skull at an enemy, dealing |cffffff7509|r Flame Damage.\\n\\nEvery third cast of this ability deals |cffffff50|r% increased damage, creates a corpse near the initial enemy, and will bounce up to |cffffff2|r times to other nearby enemies."',
  icon: "/esoui/art/icons/ability_necromancer_001_b.dds",
  esoSkillId: 117637,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
