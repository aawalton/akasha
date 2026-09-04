import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const endlessHail = {
  id: "019e6226-00ed-7e44-81a7-47b4f2f7efe3",
  pageTypeSlug: "temper-skill",
  slug: "endless-hail",
  title: "Endless Hail",
  key: "endless-hail",
  baseName: "Volley",
  description:
    '"Launch a multitude of arrows into the sky to rain down, dealing 343 Physical Damage to enemies in the target area every 1 second for 13 seconds, after a 2 second delay."',
  icon: "/esoui/art/icons/ability_bow_003_a.dds",
  esoSkillId: 40932,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
