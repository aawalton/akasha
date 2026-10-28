import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const woodExtraction = {
  id: "019e6224-ccb6-7168-a599-fce5e9cada0c",
  type: "page-type/temper-skill",
  slug: "wood-extraction",
  title: "Wood Extraction",
  key: "wood-extraction",
  baseName: "Wood Extraction",
  description:
    "Maximizes the chances of extracting Woodworking ingredients and allows the refining of the most powerful resins from raw materials.",
  icon: "/esoui/art/icons/ability_tradecraft_006.dds",
  esoAbilityId: 48180,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/craft-woodworking",
  skillType: "temper-skill-type/passive",
  hashPlace: 1625,
  createdAt: "2026-05-26T02:37:19.414Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
