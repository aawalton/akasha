import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const radiantDestruction = {
  id: "019e6f53-a57f-7267-b297-c1ecb4ccdc6d",
  pageTypeSlug: "temper-skill",
  slug: "radiant-destruction",
  title: "Radiant Destruction",
  key: "radiant-destruction",
  baseName: "Radiant Destruction",
  description:
    '"Burn an enemy with a ray of holy fire, dealing |cffffff25200|r Magic Damage over |cffffff3.8|r seconds. Deals up to |cffffff500|r% more damage to enemies below |cffffff33|r% Health.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_templar_over_exposure.dds",
  esoSkillId: 63029,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
