import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const minerHireling = {
  id: "019e6224-cca6-75ba-b45d-8479a200dfc3",
  type: "page-type/temper-skill",
  slug: "miner-hireling",
  title: "Miner Hireling",
  key: "miner-hireling",
  baseName: "Miner Hireling",
  description:
    "A hireling will send you even more blacksmithing materials and possibly other items every day. You have a greater chance at better quality materials.",
  icon: "/esoui/art/icons/ability_smith_006.dds",
  esoAbilityId: 48171,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/craft-blacksmithing",
  skillType: "temper-skill-type/passive",
  hashPlace: 829,
  createdAt: "2026-05-26T02:37:19.398Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
