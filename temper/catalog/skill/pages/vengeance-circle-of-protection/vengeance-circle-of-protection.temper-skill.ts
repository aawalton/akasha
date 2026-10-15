import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceCircleOfProtection = {
  id: "019e6f53-a8d3-72e5-ae20-57e4422b2f1c",
  type: "page-type/temper-skill",
  slug: "vengeance-circle-of-protection",
  title: "Vengeance Circle of Protection",
  key: "vengeance-circle-of-protection",
  baseName: "Vengeance Circle of Protection",
  description:
    "Brand the earth at your location with a rune of protection, granting up to 3 of you and your allies Major Protection, reducing their damage taken by |cffffff10|r% for |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_fightersguild_001.dds",
  esoSkillId: 246071,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1434,
  createdAt: "2026-05-28T16:03:34.227Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 (Constant)",
    "<<2>> = Major Protection (Constant)",
    "<<3>> = 10% (Constant)",
    "<<4>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
