import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceRevealingFlare = {
  id: "019e6f53-a968-7206-b7ed-e38559433a56",
  type: "page-type/temper-skill",
  slug: "vengeance-revealing-flare",
  title: "Vengeance Revealing Flare",
  key: "vengeance-revealing-flare",
  baseName: "Vengeance Revealing Flare",
  description:
    '"Launch a blinding flare, revealing stealthed and invisible enemies in the target area. Exposed enemies take |cffffff11760|r Magic Damage and cannot return to stealth or invisibility for |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_ava_revealing_flare.dds",
  esoSkillId: 245049,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-alliance-war-support",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
