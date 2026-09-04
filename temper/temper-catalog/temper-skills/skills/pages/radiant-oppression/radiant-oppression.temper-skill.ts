import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const radiantOppression = {
  id: "019e6245-a6fa-7259-b4ba-34500bcbac1a",
  pageTypeSlug: "temper-skill",
  slug: "radiant-oppression",
  title: "Radiant Oppression",
  key: "radiant-oppression",
  baseName: "Radiant Destruction",
  description:
    '"Burn an enemy with a ray of holy fire, dealing 7482 Magic Damage over 3.8 seconds. Deals up to 500% more damage to enemies below 40% Health.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_templar_stendarr_aura.dds",
  esoSkillId: 63075,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
