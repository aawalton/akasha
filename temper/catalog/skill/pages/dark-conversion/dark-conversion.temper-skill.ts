import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const darkConversion = {
  id: "019e6245-a638-7f2a-946b-83d8d516f15f",
  type: "page-type/temper-skill",
  slug: "dark-conversion",
  title: "Dark Conversion",
  key: "dark-conversion",
  baseName: "Dark Exchange",
  description:
    "Bargain with darkness to restore 10000 Health and 4500 Magicka instantly, and an additional 3000 Magicka over 20 seconds.\n\nThe exchange also grants you Minor Berserk for 20 seconds, increasing your damage done by 5%.",
  icon: "/esoui/art/icons/ability_sorcerer_dark_conversion.dds",
  esoSkillId: 30072,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 304,
  createdAt: "2026-05-26T03:13:12.248Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 10000 (Constant)",
    "<<2>> = 4500 (Constant)",
    "<<3>> = 3000 (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = Minor Berserk (Constant)",
    "<<6>> = 20 seconds (Constant)",
    "<<7>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
