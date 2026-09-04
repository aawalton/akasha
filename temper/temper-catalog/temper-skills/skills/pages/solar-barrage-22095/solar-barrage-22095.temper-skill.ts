import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const solarBarrage22095 = {
  id: "019e6f53-a748-742d-99ac-3c9de4458acb",
  pageTypeSlug: "temper-skill",
  slug: "solar-barrage-22095",
  title: "Solar Barrage",
  key: "solar-barrage-22095",
  baseName: "Solar Flare",
  description:
    '"Conjure solar energy to blast enemies around you, dealing |cffffff1516|r Magic Damage every |cffffff2|r seconds and increasing your damage done with class abilities by |cffffff5|r% for |cffffff20|r seconds.\\n\\nWhile this ability is active you gain Empower, increasing the damage of your Heavy Attacks against monsters by |cffffff70|r%."',
  icon: "/esoui/art/icons/ability_templar_solar_power.dds",
  esoSkillId: 22095,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
