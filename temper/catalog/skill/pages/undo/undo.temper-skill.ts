import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const undo = {
  id: "019e6f53-a881-79c5-ae8b-ce5a5374a9a1",
  type: "page-type/temper-skill",
  slug: "undo",
  title: "Undo",
  key: "undo",
  baseName: "Undo",
  description:
    "Step backwards in time, resetting your Health, Magicka, Stamina, and position to what they were |cffffff4|r seconds ago.",
  icon: "/esoui/art/icons/ability_psijic_001.dds",
  esoAbilityId: 103478,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1384,
  createdAt: "2026-05-28T16:03:34.145Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
