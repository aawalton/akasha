import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const daedricProtection31417 = {
  id: "019e6f53-a064-7d9d-95e0-0189c7c1560a",
  type: "page-type/temper-skill",
  slug: "daedric-protection-31417",
  title: "Daedric Protection",
  key: "daedric-protection-31417",
  baseName: "Daedric Protection",
  description:
    '"Reduce your damage taken by |cffffff2|r% while you have a Daedric Summoning ability active."',
  icon: "/esoui/art/icons/ability_sorcerer_022.dds",
  esoSkillId: 31417,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
