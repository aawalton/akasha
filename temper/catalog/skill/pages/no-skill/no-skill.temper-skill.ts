import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const noSkill = {
  id: "019e6210-c5c5-7fc6-9bb8-5969540f95ad",
  type: "page-type/temper-skill",
  slug: "no-skill",
  title: "No Skill",
  key: "no-skill",
  baseName: "No Skill",
  description: '"Empty skill slot"',
  esoSkillId: 0,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 0,
  morphIndex: 0,
  rank: 0,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
