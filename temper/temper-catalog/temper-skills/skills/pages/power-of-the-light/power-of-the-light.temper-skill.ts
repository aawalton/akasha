import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const powerOfTheLight = {
  id: "019e6245-a6e9-7650-bc32-b831103350b6",
  pageTypeSlug: "temper-skill",
  slug: "power-of-the-light",
  title: "Power of the Light",
  key: "power-of-the-light",
  baseName: "Backlash",
  description:
    '"Summon an expanding beam of pure sunlight to doom an enemy, dealing 1161 Physical Damage immediately and marking them for 6 seconds.\\n\\nAfter the duration ends, the sunlight bursts, dealing 1285 Physical Damage to the enemy, which increases based on the amount of damage you dealt to them over the duration, up to 200%.\\n\\nYou can have only one Power of the Light active at a time, and each hit of the ability applies the Sundered status effect."',
  icon: "/esoui/art/icons/ability_templar_power_of_the_light.dds",
  esoSkillId: 27587,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
