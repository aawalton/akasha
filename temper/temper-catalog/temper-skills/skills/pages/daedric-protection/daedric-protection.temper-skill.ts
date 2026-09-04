import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const daedricProtection = {
  id: "019e6245-a632-7d47-8248-e48dd28c0269",
  pageTypeSlug: "temper-skill",
  slug: "daedric-protection",
  title: "Daedric Protection",
  key: "daedric-protection",
  baseName: "Daedric Protection",
  description:
    '"Reduce your damage taken by 5% while you have a Daedric Summoning ability active."',
  icon: "/esoui/art/icons/ability_sorcerer_022.dds",
  esoSkillId: 45200,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "passive",
  subcategoryId: "sorcerer-daedric-summoning",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
