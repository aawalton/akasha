import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const expertSummoner = {
  id: "019e6245-a67b-7033-a487-17f458c8f6f0",
  pageTypeSlug: "temper-skill",
  slug: "expert-summoner",
  title: "Expert Summoner",
  key: "expert-summoner",
  baseName: "Expert Summoner",
  description:
    '"Increases your Magicka and Stamina by 5%.\\n\\nIncreases your Max Health by 5% if you have a permanent pet active."',
  icon: "/esoui/art/icons/ability_sorcerer_019.dds",
  esoSkillId: 45199,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "passive",
  subcategoryId: "sorcerer-daedric-summoning",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
