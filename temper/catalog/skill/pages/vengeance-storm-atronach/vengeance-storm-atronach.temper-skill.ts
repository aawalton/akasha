import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceStormAtronach = {
  id: "019e6f53-a993-7379-930a-eedb0546db3b",
  type: "page-type/temper-skill",
  slug: "vengeance-storm-atronach",
  title: "Vengeance Storm Atronach",
  key: "vengeance-storm-atronach",
  baseName: "Vengeance Storm Atronach",
  description:
    "Summon the remnants of a storm atronach at the target location, dealing |cffffff11760|r Shock Damage to up to 3 enemies, stunning them for |cffffff3|r seconds, and then dealing |cffffff13125|r Shock Damage over |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_storm_atronach.dds",
  esoSkillId: 237933,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-sorcerer-daedric-summoning",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1567,
  createdAt: "2026-05-28T16:03:34.419Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 10500 Shock Damage (Constant)",
    "<<2>> = 6 (Constant)",
    "<<3>> = 3 seconds (Constant)",
    "<<4>> = 13125 Shock Damage (Constant)",
    "<<5>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
