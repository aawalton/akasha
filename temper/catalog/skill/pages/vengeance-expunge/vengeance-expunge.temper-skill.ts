import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceExpunge = {
  id: "019e6f53-a905-7578-8ad7-7e19987a9dc9",
  type: "page-type/temper-skill",
  slug: "vengeance-expunge",
  title: "Vengeance Expunge",
  key: "vengeance-expunge",
  baseName: "Vengeance Expunge",
  description:
    "Embrace the power of death, removing up to |cffffff2|r negative effects from yourself.\n\nWhile slotted on either bar you gain |cffffff150|r Health, Magicka, and Stamina Recovery.",
  icon: "/esoui/art/icons/ability_necromancer_014.dds",
  esoSkillId: 238255,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 1468,
  createdAt: "2026-05-28T16:03:34.277Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 2 (Constant)", "<<2>> = 150 (Constant)"],
} as const satisfies TemperSkill
