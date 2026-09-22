import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const intricateRuneforms = {
  id: "019e6245-a6b5-7561-b409-1aeae5fde458",
  type: "page-type/temper-skill",
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
  skillType: "temper-skill-type/passive",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
