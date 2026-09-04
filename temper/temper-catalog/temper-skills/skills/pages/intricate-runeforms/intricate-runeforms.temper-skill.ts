import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const intricateRuneforms = {
  id: "019e6245-a6b5-7561-b409-1aeae5fde458",
  pageTypeSlug: "temper-skill",
  slug: "intricate-runeforms",
  title: "Intricate Runeforms",
  key: "intricate-runeforms",
  baseName: "Intricate Runeforms",
  description:
    '"Your status as illuminatus reduces the cost and increases the strength of your damage shields by 10%."',
  icon: "/esoui/art/icons/passive_arcanist_12.dds",
  esoSkillId: 185195,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "passive",
  subcategoryId: "arcanist-curative-runeforms",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
