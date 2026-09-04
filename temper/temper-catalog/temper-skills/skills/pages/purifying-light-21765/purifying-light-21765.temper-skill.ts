import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const purifyingLight21765 = {
  id: "019e6f53-a569-73cc-9836-519e6753da7c",
  pageTypeSlug: "temper-skill",
  slug: "purifying-light-21765",
  title: "Purifying Light",
  key: "purifying-light-21765",
  baseName: "Backlash",
  description:
    '"Summon an expanding beam of pure sunlight to doom an enemy, dealing |cffffff4038|r Magic Damage immediately and marking them for |cffffff6|r seconds.\\n\\nAfter the duration ends, the sunlight bursts, dealing |cffffff4469|r Magic Damage, which increases based on the amount of damage you dealt to them over the duration, up to |cffffff200|r%. Also heals you and nearby allies in the area for |cffffff1886|r Health every |cffffff2|r seconds, over |cffffff10|r seconds.\\n\\nYou can have only one Purifying Light at a time."',
  icon: "/esoui/art/icons/ability_templar_purifying_light.dds",
  esoSkillId: 21765,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
