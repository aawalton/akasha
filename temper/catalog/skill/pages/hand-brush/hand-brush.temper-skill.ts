import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const handBrush = {
  id: "019e6251-4cbb-7f0b-8f8f-e222c89ac10b",
  type: "page-type/temper-skill",
  slug: "hand-brush",
  title: "Hand Brush",
  key: "hand-brush",
  baseName: "Hand Brush",
  description:
    "Removes 1 layer of soil or rock from a 1x1 area.\n\nGenerates: 1 Intuition\nMaximum Intuition: 4.",
  icon: "/esoui/art/icons/u26_ability_digging_03.dds",
  esoAbilityId: 139909,
  isMorph: false,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/world-excavation",
  skillType: "temper-skill-type/passive",
  hashPlace: 588,
  createdAt: "2026-05-26T03:25:55.771Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
