import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceCaltrops = {
  id: "019e6f53-a8ce-7d07-8ef0-b6cd6e589994",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-caltrops",
  title: "Vengeance Caltrops",
  key: "vengeance-caltrops",
  baseName: "Vengeance Caltrops",
  description:
    '"Hurl a ball of caltrops that scatter over the target area, dealing |cffffff7056|r Physical Damage to up to 3 enemies inside, and reducing their Movement Speed by |cffffff50|r% for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_ava_001.dds",
  esoSkillId: 244514,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-alliance-war-assault",
  skillType: "active",
  subcategoryId: "vengeance-alliance-war-assault",
} as const satisfies TemperSkill
