import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const darkConversion = {
  id: "019e6245-a638-7f2a-946b-83d8d516f15f",
  pageTypeSlug: "temper-skill",
  slug: "dark-conversion",
  title: "Dark Conversion",
  key: "dark-conversion",
  baseName: "Dark Exchange",
  description:
    '"Bargain with darkness to restore 10000 Health and 4500 Magicka instantly, and an additional 3000 Magicka over 20 seconds.\\n\\nThe exchange also grants you Minor Berserk for 20 seconds, increasing your damage done by 5%."',
  icon: "/esoui/art/icons/ability_sorcerer_dark_conversion.dds",
  esoSkillId: 30072,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
