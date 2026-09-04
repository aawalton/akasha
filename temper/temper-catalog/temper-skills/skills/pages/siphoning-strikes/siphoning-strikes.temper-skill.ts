import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const siphoningStrikes = {
  id: "019e6f53-a72b-7db3-8a77-baa696784a26",
  pageTypeSlug: "temper-skill",
  slug: "siphoning-strikes",
  title: "Siphoning Strikes",
  key: "siphoning-strikes",
  baseName: "Siphoning Strikes",
  description:
    '"Channel a portion of your soul to convert Health to |cffffff2000|r Magicka and Stamina.\\n\\nWhile slotted on either bar, your soul yearns for the warmth of life. All damage you deal heals you for |cffffff1275|r Health, up to once every |cffffff1|r second."',
  icon: "/esoui/art/icons/ability_nightblade_003.dds",
  esoSkillId: 33319,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
