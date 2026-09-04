import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const blur = {
  id: "019e6f53-9f64-77d7-96b7-c2df591c6102",
  pageTypeSlug: "temper-skill",
  slug: "blur",
  title: "Blur",
  key: "blur",
  baseName: "Blur",
  description:
    '"Surround yourself in a phantasmic aura to gain Major Evasion, reducing damage from area attacks by |cffffff20|r% for |cffffff20|r seconds.\\n\\nWhile active, taking direct damage reduces the cost of your next Roll Dodge by |cffffff10|r%, up to a maximum of |cffffff100|r%. This effect can stack up to once every half second."',
  icon: "/esoui/art/icons/ability_nightblade_009.dds",
  esoSkillId: 33375,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
