import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const unnaturalMovement = {
  id: "019e6251-4cfc-7bd6-b686-d80dfc44c3a1",
  pageTypeSlug: "temper-skill",
  slug: "unnatural-movement",
  title: "Unnatural Movement",
  key: "unnatural-movement",
  baseName: "Unnatural Movement",
  description:
    '"Reduces the cost of Sprint by 50%.\\n\\nIf you continuously Sprint for 3 seconds you automatically become invisible."',
  icon: "/esoui/art/icons/passive_u26_vampire_04.dds",
  esoSkillId: 135218,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-vampire",
  skillType: "passive",
  subcategoryId: "world-vampire",
  effects: "jsonl",
} as const satisfies TemperSkill
