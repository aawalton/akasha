import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulSiphoner36603 = {
  id: "019e6f53-a772-7b52-806a-8d52493eebd9",
  type: "page-type/temper-skill",
  slug: "soul-siphoner-36603",
  title: "Soul Siphoner",
  key: "soul-siphoner-36603",
  baseName: "Soul Siphoner",
  description:
    "Increases your healing done by |cffffff1|r% for each Siphoning ability slotted. \n\nCurrent bonus: |cffffff0|r%.",
  icon: "/esoui/art/icons/passive_sorcerer_036.dds",
  esoSkillId: 36603,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/passive",
  effects: "jsonl",
  hashPlace: 1233,
  createdAt: "2026-05-28T16:03:33.874Z",
  updatedAt: "2026-10-19T22:59:16.876Z",
  equations: [
    "<<1>> = 1% (Constant)",
    "<<2>> = 1 Siphoning (Siphoning Skills Slotted, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
