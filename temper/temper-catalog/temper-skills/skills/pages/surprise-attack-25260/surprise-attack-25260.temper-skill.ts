import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const surpriseAttack25260 = {
  id: "019e6f53-a7fe-7624-b612-03bd7af30f55",
  pageTypeSlug: "temper-skill",
  slug: "surprise-attack-25260",
  title: "Surprise Attack",
  key: "surprise-attack-25260",
  baseName: "Veiled Strike",
  description:
    '"Slash an enemy, dealing |cffffff8342|r Physical Damage and applying the Sundered status effect.\\n\\nIf you strike an enemy from their flank you set them Off Balance. This attack will also be guaranteed to be a Critical Strike, up to once every |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_002_a.dds",
  esoSkillId: 25260,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
