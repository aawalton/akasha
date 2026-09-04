import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const darkDeal = {
  id: "019e6245-a63a-7721-952a-7ae30a921279",
  pageTypeSlug: "temper-skill",
  slug: "dark-deal",
  title: "Dark Deal",
  key: "dark-deal",
  baseName: "Dark Exchange",
  description:
    '"Bargain with darkness to restore 8000 Health and 3600 Stamina instantly, and an additional 2400 Stamina over 10 seconds.\\n\\nThe exchange also grants you Minor Berserk for 20 seconds, increasing your damage done by 5%."',
  icon: "/esoui/art/icons/ability_sorcerer_dark_deal.dds",
  esoSkillId: 30043,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-dark-magic",
  skillType: "active",
  subcategoryId: "sorcerer-dark-magic",
} as const satisfies TemperSkill
