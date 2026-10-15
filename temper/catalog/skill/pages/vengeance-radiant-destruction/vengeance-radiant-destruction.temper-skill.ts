import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceRadiantDestruction = {
  id: "019e6f53-a95b-751d-915d-c74ec875619d",
  type: "page-type/temper-skill",
  slug: "vengeance-radiant-destruction",
  title: "Vengeance Radiant Destruction",
  key: "vengeance-radiant-destruction",
  baseName: "Vengeance Radiant Destruction",
  description:
    "Burn an enemy with a ray of holy fire, dealing |cffffff22260|r Magic Damage over |cffffff4.8|r seconds. Deals up to |cffffff400|r% more damage to enemies below |cffffff33|r% Health.",
  icon: "/esoui/art/icons/ability_templar_over_exposure.dds",
  esoSkillId: 237974,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 1528,
  createdAt: "2026-05-28T16:03:34.363Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 21000 Magic Damage (Constant)",
    "<<2>> = 4.8 seconds (Constant)",
    "<<3>> = 400 (Constant)",
    "<<4>> = 33 (Constant)",
  ],
} as const satisfies TemperSkill
