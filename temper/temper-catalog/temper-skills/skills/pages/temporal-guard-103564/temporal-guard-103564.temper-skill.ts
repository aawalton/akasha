import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const temporalGuard103564 = {
  id: "019e6f53-a829-78d9-8765-e43bc68e8803",
  pageTypeSlug: "temper-skill",
  slug: "temporal-guard-103564",
  title: "Temporal Guard",
  key: "temporal-guard-103564",
  baseName: "Undo",
  description:
    '"Step backwards in time, resetting your Health, Magicka, Stamina, and position to what they were |cffffff4|r seconds ago.\\n\\nWhile slotted you gain Minor Protection, reducing your damage taken by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_psijic_001_b.dds",
  esoSkillId: 103564,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 2,
  rank: 10,
  skillLineId: "guild-psijic-order",
  skillType: "ultimate",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
