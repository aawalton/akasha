import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const antiCavalryCaltrops40255 = {
  id: "019e6f53-9eb6-71eb-8192-28812552a5fe",
  pageTypeSlug: "temper-skill",
  slug: "anti-cavalry-caltrops-40255",
  title: "Anti-Cavalry Caltrops",
  key: "anti-cavalry-caltrops-40255",
  baseName: "Caltrops",
  description:
    '"Hurl a ball of caltrops that scatter over the target area, dealing |cffffff978|r Physical Damage every |cffffff1|r second to enemies inside, and reducing their Movement Speed by |cffffff50|r%.\\n\\nThe caltrops also drain the Mount Stamina of any enemy in the area."',
  icon: "/esoui/art/icons/ability_ava_001_a.dds",
  esoSkillId: 40255,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 6,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
