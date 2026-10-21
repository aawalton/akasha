import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const darkExchange = {
  id: "019e6f53-a076-7f5c-af9a-9b67a492a4c6",
  type: "page-type/temper-skill",
  slug: "dark-exchange",
  title: "Dark Exchange",
  key: "dark-exchange",
  baseName: "Dark Exchange",
  description:
    "Bargain with darkness to restore |cffffff8160|r Health and |cffffff3600|r Magicka instantly, and an additional |cffffff2400|r Magicka over |cffffff20|r seconds. \n\nThe exchange also grants you Minor Berserk for |cffffff20|r seconds, increasing your damage done by |cffffff5|r%.",
  icon: "/esoui/art/icons/ability_sorcerer_dark_exchange.dds",
  esoSkillId: 24584,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 308,
  createdAt: "2026-05-28T16:03:32.086Z",
  updatedAt: "2026-10-21T15:46:00.523Z",
  equations: [
    "<<1>> = 8000 (Constant, Heal)",
    "<<2>> = 3600 (Constant)",
    "<<3>> = 2400 (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = Minor Berserk (Constant)",
    "<<6>> = 20 seconds (Constant)",
    "<<7>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
