import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const concentratedBarrier103888 = {
  id: "019e6f53-a00f-7ad2-8cfc-89c66971b0d1",
  type: "page-type/temper-skill",
  slug: "concentrated-barrier-103888",
  title: "Concentrated Barrier",
  key: "concentrated-barrier-103888",
  baseName: "Concentrated Barrier",
  description:
    "While you have a Psijic Order ability slotted and are Bracing, you gain a damage shield that absorbs |cffffff2875|r damage. \n\nThis damage shield recharges back to full strength after you spend |cffffff10|r seconds not Bracing.",
  icon: "/esoui/art/icons/ability_psijic_010.dds",
  esoSkillId: 103888,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 6,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/passive",
  hashPlace: 236,
  createdAt: "2026-05-28T16:03:31.983Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 2500 (Constant)"],
} as const satisfies TemperSkill
