import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const caltrops = {
  id: "019e6f53-9fad-7cf3-af02-b1c7881820c7",
  pageTypeSlug: "temper-skill",
  slug: "caltrops",
  title: "Caltrops",
  key: "caltrops",
  baseName: "Caltrops",
  description:
    '"Hurl a ball of caltrops that scatter over the target area, dealing |cffffff977|r Physical Damage every |cffffff1|r second to enemies inside, and reducing their Movement Speed by |cffffff50|r%."',
  icon: "/esoui/art/icons/ability_ava_001.dds",
  esoSkillId: 33376,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
