import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const soulSiphoner = {
  id: "019e6245-a73c-70b5-aea6-883e3d35eae5",
  type: "page-type/temper-skill",
  slug: "soul-siphoner",
  title: "Soul Siphoner",
  key: "soul-siphoner",
  baseName: "Soul Siphoner",
  description:
    "Increases your healing done by 3% for each Siphoning ability slotted. \n\nCurrent bonus: 0%.",
  icon: "/esoui/art/icons/passive_sorcerer_036.dds",
  esoSkillId: 45155,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 1232,
  createdAt: "2026-05-26T03:13:12.508Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 3% (Constant)",
    "<<2>> = 3 Siphoning (Siphoning Skills Slotted, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
