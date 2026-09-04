import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const siphoningAttacks = {
  id: "019e6245-a732-7743-a29d-03726e43c280",
  pageTypeSlug: "temper-skill",
  slug: "siphoning-attacks",
  title: "Siphoning Attacks",
  key: "siphoning-attacks",
  baseName: "Siphoning Strikes",
  description:
    '"Channel a portion of your soul to convert Health to 2600 Magicka and Stamina.\\n\\nWhile slotted on either bar, your soul yearns for the warmth of life. All damage you deal heals you for 1250 Health and restores 200 Magicka and Stamina, up to once every 1 second."',
  icon: "/esoui/art/icons/ability_nightblade_003_b.dds",
  esoSkillId: 38050,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
