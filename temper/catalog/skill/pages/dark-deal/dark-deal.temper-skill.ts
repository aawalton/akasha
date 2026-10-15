import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const darkDeal = {
  id: "019e6245-a63a-7721-952a-7ae30a921279",
  type: "page-type/temper-skill",
  slug: "dark-deal",
  title: "Dark Deal",
  key: "dark-deal",
  baseName: "Dark Exchange",
  description:
    "Bargain with darkness to restore 8000 Health and 3600 Stamina instantly, and an additional 2400 Stamina over 10 seconds.\n\nThe exchange also grants you Minor Berserk for 20 seconds, increasing your damage done by 5%.",
  icon: "/esoui/art/icons/ability_sorcerer_dark_deal.dds",
  esoSkillId: 30043,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 306,
  createdAt: "2026-05-26T03:13:12.250Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 8000 (Constant)",
    "<<2>> = 3600 (Constant)",
    "<<3>> = 2400 (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = Minor Berserk (Constant)",
    "<<6>> = 20 seconds (Constant)",
    "<<7>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
