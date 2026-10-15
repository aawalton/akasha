import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const circleOfProtection = {
  id: "019e6f53-9fe5-7421-9375-d34f610c2b58",
  type: "page-type/temper-skill",
  slug: "circle-of-protection",
  title: "Circle of Protection",
  key: "circle-of-protection",
  baseName: "Circle of Protection",
  description:
    "Brand the earth at your location with a rune of protection for |cffffff20|r seconds. You and your allies in the area gain Minor Protection and Minor Endurance, reducing your damage taken by |cffffff5|r% and increasing your Stamina Recovery by |cffffff15|r%.",
  icon: "/esoui/art/icons/ability_fightersguild_001.dds",
  esoSkillId: 35737,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/guild-fighters-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 212,
  createdAt: "2026-05-28T16:03:31.941Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 17 seconds (Constant)",
    "<<2>> = Minor Protection (Constant)",
    "<<3>> = Minor Endurance (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 15% (Constant)",
  ],
} as const satisfies TemperSkill
