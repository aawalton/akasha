import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const platingsExpertise = {
  id: "019e6224-cca8-733f-bd8f-74945156235d",
  type: "page-type/temper-skill",
  slug: "platings-expertise",
  title: "Platings Expertise",
  key: "platings-expertise",
  baseName: "Platings Expertise",
  description: "More than doubles the chances of improving items with platings.",
  icon: "/esoui/art/icons/passive_platingexpertise.dds",
  esoAbilityId: 103648,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/craft-jewelry-crafting",
  skillType: "temper-skill-type/passive",
  hashPlace: 900,
  createdAt: "2026-05-26T02:37:19.400Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
