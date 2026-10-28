import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const metallurgy = {
  id: "019e6224-cca4-78b1-9b24-9538db755ab7",
  type: "page-type/temper-skill",
  slug: "metallurgy",
  title: "Metallurgy",
  key: "metallurgy",
  baseName: "Metallurgy",
  description:
    "Reduces research times by 25%, limits research time to 30 days, and allows the research of three items at once.",
  icon: "/esoui/art/icons/crafting_runecrafter_armor_vendor_component_002.dds",
  esoAbilityId: 58784,
  isMorph: false,
  learnedLevel: 45,
  lineRankNeeded: 45,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/craft-blacksmithing",
  skillType: "temper-skill-type/passive",
  hashPlace: 823,
  createdAt: "2026-05-26T02:37:19.396Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
