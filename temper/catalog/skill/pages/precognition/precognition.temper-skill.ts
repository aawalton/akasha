import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const precognition = {
  id: "019e6238-c2f8-7e29-974e-c074c6f686ac",
  type: "page-type/temper-skill",
  slug: "precognition",
  title: "Precognition",
  key: "precognition",
  baseName: "Undo",
  description:
    "Step backwards in time, resetting your Health, Magicka, Stamina, and position to what they were 4 seconds ago.\n\nYou can cast this ability while you are crowd controlled and it automatically grants you Crowd Control Immunity.",
  icon: "/esoui/art/icons/ability_psijic_001_a.dds",
  esoAbilityId: 40103557,
  isMorph: true,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 925,
  createdAt: "2026-05-26T02:59:07.640Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
