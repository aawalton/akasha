import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const swallowSoul34835 = {
  id: "019e6f53-a801-7ce2-bf91-7fa989d8f8a8",
  type: "page-type/temper-skill",
  slug: "swallow-soul-34835",
  title: "Swallow Soul",
  key: "swallow-soul-34835",
  baseName: "Strife",
  description:
    '"Steal an enemy\'s life force, dealing |cffffff7509|r Magic Damage and healing you for |cffffff36|r% of the damage inflicted every |cffffff2|r seconds for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_012_a.dds",
  esoSkillId: 34835,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "nightblade-siphoning",
  skillType: "temper-skill-type/active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
