import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceRadiantDestruction = {
  id: "019e6f53-a95b-751d-915d-c74ec875619d",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-radiant-destruction",
  title: "Vengeance Radiant Destruction",
  key: "vengeance-radiant-destruction",
  baseName: "Vengeance Radiant Destruction",
  description:
    '"Burn an enemy with a ray of holy fire, dealing |cffffff22260|r Magic Damage over |cffffff4.8|r seconds. Deals up to |cffffff400|r% more damage to enemies below |cffffff33|r% Health."',
  icon: "/esoui/art/icons/ability_templar_over_exposure.dds",
  esoSkillId: 237974,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "vengeance-templar-dawns-wrath",
} as const satisfies TemperSkill
