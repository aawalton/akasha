import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const darkConversion24589 = {
  id: "019e6f53-a073-716a-b4f8-cfa9cc54085e",
  type: "page-type/temper-skill",
  slug: "dark-conversion-24589",
  title: "Dark Conversion",
  key: "dark-conversion-24589",
  baseName: "Dark Exchange",
  description:
    "Bargain with darkness to restore |cffffff10200|r Health and |cffffff4500|r Magicka instantly, and an additional |cffffff3000|r Magicka over |cffffff20|r seconds.\n\nThe exchange also grants you Minor Berserk for |cffffff20|r seconds, increasing your damage done by |cffffff5|r%.",
  icon: "/esoui/art/icons/ability_sorcerer_dark_conversion.dds",
  esoSkillId: 24589,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 30,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 305,
  createdAt: "2026-05-28T16:03:32.083Z",
  updatedAt: "2026-10-21T04:44:10.789Z",
  equations: [
    "<<1>> = 9700 (Constant)",
    "<<2>> = 4500 (Constant)",
    "<<3>> = 3000 (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = Minor Berserk (Constant)",
    "<<6>> = 20 seconds (Constant)",
    "<<7>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
