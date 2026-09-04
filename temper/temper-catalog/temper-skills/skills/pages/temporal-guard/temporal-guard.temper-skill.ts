import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const temporalGuard = {
  id: "019e6238-c324-7f41-af93-e3830213820e",
  pageTypeSlug: "temper-skill",
  slug: "temporal-guard",
  title: "Temporal Guard",
  key: "temporal-guard",
  baseName: "Undo",
  description:
    '"Step backwards in time, resetting your Health, Magicka, Stamina, and position to what they were 4 seconds ago.\\n\\nWhile slotted you gain Minor Protection, reducing your damage taken by 5%."',
  icon: "/esoui/art/icons/ability_psijic_001_b.dds",
  esoSkillId: 40103564,
  isMorph: true,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-psijic-order",
  skillType: "ultimate",
  subcategoryId: "guild-psijic-order",
  effects: "jsonl",
} as const satisfies TemperSkill
