import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const powerOfTheLight = {
  id: "019e6245-a6e9-7650-bc32-b831103350b6",
  type: "page-type/temper-skill",
  slug: "power-of-the-light",
  title: "Power of the Light",
  key: "power-of-the-light",
  baseName: "Backlash",
  description:
    "Summon an expanding beam of pure sunlight to doom an enemy, dealing 1161 Physical Damage immediately and marking them for 6 seconds.\n\nAfter the duration ends, the sunlight bursts, dealing 1285 Physical Damage to the enemy, which increases based on the amount of damage you dealt to them over the duration, up to 200%.\n\nYou can have only one Power of the Light active at a time, and each hit of the ability applies the Sundered status effect.",
  icon: "/esoui/art/icons/ability_templar_power_of_the_light.dds",
  esoSkillId: 27587,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 911,
  createdAt: "2026-05-26T03:13:12.425Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.051612 MaxStat + 0.542543 MaxPower - 0.879855 (Ultimate, ratio = 10.51, Dmg, Physical, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = 0.0571312 MaxStat + 0.600358 MaxPower - 1.05682 (Ultimate, ratio = 10.51, Dmg, Physical, SingleTarget, Direct, R2 = 0.999999)",
    "<<4>> = 200% (Constant)",
    "<<5>> = Power of the Light (Constant)",
    "<<6>> = Sundered (Constant)",
  ],
} as const satisfies TemperSkill
