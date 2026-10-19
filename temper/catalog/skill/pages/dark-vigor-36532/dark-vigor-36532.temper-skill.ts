import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const darkVigor36532 = {
  id: "019e6f53-a085-78fd-843b-66319b969ce6",
  type: "page-type/temper-skill",
  slug: "dark-vigor-36532",
  title: "Dark Vigor",
  key: "dark-vigor-36532",
  baseName: "Dark Vigor",
  description:
    "Increases your Max Health by |cffffff2|r% for each Shadow ability slotted.\n\nCurrent bonus: |cffffff0|r%.",
  icon: "/esoui/art/icons/ability_sorcerer_044.dds",
  esoSkillId: 36532,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/passive",
  effects: "jsonl",
  hashPlace: 318,
  createdAt: "2026-05-28T16:03:32.101Z",
  updatedAt: "2026-10-19T22:59:16.876Z",
  equations: [
    "<<1>> = 2% (Constant)",
    "<<2>> = 2 Shadow (Shadow Skills Slotted, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
