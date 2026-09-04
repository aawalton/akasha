import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const leechingStrikes36908 = {
  id: "019e6f53-a3ce-7139-916b-c422d06e3395",
  pageTypeSlug: "temper-skill",
  slug: "leeching-strikes-36908",
  title: "Leeching Strikes",
  key: "leeching-strikes-36908",
  baseName: "Siphoning Strikes",
  description:
    '"Channel a portion of your soul to convert Health to |cffffff2000|r Magicka and Stamina.\\n\\nWhile slotted on either bar, your soul yearns for the warmth of life. All damage you deal heals you for |cffffff1836|r Health and reduces the cost of your next Leeching Strikes by |cffffff10|r%, stacking up to |cffffff10|r times. This effect can occur once every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_nightblade_003_a.dds",
  esoSkillId: 36908,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
