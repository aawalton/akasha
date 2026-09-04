import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const undeath33093 = {
  id: "019e6f53-a880-71be-9894-03f066a428e6",
  pageTypeSlug: "temper-skill",
  slug: "undeath-33093",
  title: "Undeath",
  key: "undeath-33093",
  baseName: "Undeath",
  description:
    '"Reduces your damage taken by up to |cffffff7|r% based on your missing Health.\\n\\nCurrent bonus: |cffffff1|r%"',
  icon: "/esoui/art/icons/passive_u26_vampire_03.dds",
  esoSkillId: 33093,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "world-vampire",
  skillType: "passive",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
