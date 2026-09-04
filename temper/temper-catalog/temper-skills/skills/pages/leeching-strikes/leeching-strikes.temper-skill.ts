import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const leechingStrikes = {
  id: "019e6245-a6b9-7b75-bd55-09c1af3601ca",
  pageTypeSlug: "temper-skill",
  slug: "leeching-strikes",
  title: "Leeching Strikes",
  key: "leeching-strikes",
  baseName: "Siphoning Strikes",
  description:
    '"Channel a portion of your soul to convert Health to 2000 Magicka and Stamina.\\n\\nWhile slotted on either bar, your soul yearns for the warmth of life. All damage you deal heals you for 1800 Health and reduces the cost of your next Leeching Strikes by 10%, stacking up to 10 times. This effect can occur once every 1 second."',
  icon: "/esoui/art/icons/ability_nightblade_003_a.dds",
  esoSkillId: 38015,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
