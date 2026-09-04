import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const precognition103557 = {
  id: "019e6f53-a540-7804-adac-11e904bacfeb",
  pageTypeSlug: "temper-skill",
  slug: "precognition-103557",
  title: "Precognition",
  key: "precognition-103557",
  baseName: "Undo",
  description:
    '"Step backwards in time, resetting your Health, Magicka, Stamina, and position to what they were |cffffff4|r seconds ago.\\n\\nYou can cast this ability while you are crowd controlled and it automatically grants you Crowd Control Immunity."',
  icon: "/esoui/art/icons/ability_psijic_001_a.dds",
  esoSkillId: 103557,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 1,
  rank: 10,
  skillLineId: "guild-psijic-order",
  skillType: "ultimate",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
