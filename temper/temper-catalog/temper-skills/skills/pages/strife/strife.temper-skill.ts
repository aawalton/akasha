import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const strife = {
  id: "019e6f53-a7c4-7354-860f-091d7669ed6e",
  pageTypeSlug: "temper-skill",
  slug: "strife",
  title: "Strife",
  key: "strife",
  baseName: "Strife",
  description:
    '"Steal an enemy\'s life force, dealing |cffffff5384|r Magic Damage and healing you or a nearby ally for |cffffff51|r% of the damage inflicted every |cffffff2|r seconds for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_012.dds",
  esoSkillId: 33291,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
