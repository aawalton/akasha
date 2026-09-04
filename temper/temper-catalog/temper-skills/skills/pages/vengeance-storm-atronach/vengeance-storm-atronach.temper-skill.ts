import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceStormAtronach = {
  id: "019e6f53-a993-7379-930a-eedb0546db3b",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-storm-atronach",
  title: "Vengeance Storm Atronach",
  key: "vengeance-storm-atronach",
  baseName: "Vengeance Storm Atronach",
  description:
    '"Summon the remnants of a storm atronach at the target location, dealing |cffffff11760|r Shock Damage to up to 3 enemies, stunning them for |cffffff3|r seconds, and then dealing |cffffff13125|r Shock Damage over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_storm_atronach.dds",
  esoSkillId: 237933,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-daedric-summoning",
  skillType: "ultimate",
  subcategoryId: "vengeance-sorcerer-daedric-summoning",
} as const satisfies TemperSkill
