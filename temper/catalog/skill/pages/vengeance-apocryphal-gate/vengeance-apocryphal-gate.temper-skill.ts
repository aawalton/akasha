import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceApocryphalGate = {
  id: "019e6f53-a8af-7e35-b7c1-37a9812e054e",
  type: "page-type/temper-skill",
  slug: "vengeance-apocryphal-gate",
  title: "Vengeance Apocryphal Gate",
  key: "vengeance-apocryphal-gate",
  baseName: "Vengeance Apocryphal Gate",
  description:
    "Breach the world walls to create a portal at a target location, teleporting yourself to it immediately and generating Crux.",
  icon: "/esoui/art/icons/ability_arcanist_016.dds",
  esoAbilityId: 238545,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-arcanist-curative-runeforms",
  skillType: "temper-skill-type/active",
  hashPlace: 1409,
  createdAt: "2026-05-28T16:03:34.191Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
