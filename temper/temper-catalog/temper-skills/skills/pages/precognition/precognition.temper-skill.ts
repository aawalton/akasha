import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const precognition = {
  id: "019e6238-c2f8-7e29-974e-c074c6f686ac",
  pageTypeSlug: "temper-skill",
  slug: "precognition",
  title: "Precognition",
  key: "precognition",
  baseName: "Undo",
  description:
    '"Step backwards in time, resetting your Health, Magicka, Stamina, and position to what they were 4 seconds ago.\\n\\nYou can cast this ability while you are crowd controlled and it automatically grants you Crowd Control Immunity."',
  icon: "/esoui/art/icons/ability_psijic_001_a.dds",
  esoSkillId: 40103557,
  isMorph: true,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-psijic-order",
  skillType: "ultimate",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
