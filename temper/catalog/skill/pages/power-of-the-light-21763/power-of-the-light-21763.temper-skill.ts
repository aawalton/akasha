import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const powerOfTheLight21763 = {
  id: "019e6f53-a527-7c27-aff0-2647b2d7ec6e",
  type: "page-type/temper-skill",
  slug: "power-of-the-light-21763",
  title: "Power of the Light",
  key: "power-of-the-light-21763",
  baseName: "Backlash",
  description:
    "Summon an expanding beam of pure sunlight to doom an enemy, dealing |cffffff4038|r Physical Damage immediately and marking them for |cffffff6|r seconds.\n\nAfter the duration ends, the sunlight bursts, dealing |cffffff4469|r Physical Damage to the enemy, which increases based on the amount of damage you dealt to them over the duration, up to |cffffff200|r%.\n\nYou can have only one Power of the Light active at a time, and each hit of the ability applies the Sundered status effect.",
  icon: "/esoui/art/icons/ability_templar_power_of_the_light.dds",
  esoSkillId: 21763,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 912,
  createdAt: "2026-05-28T16:03:33.287Z",
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
