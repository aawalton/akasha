import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shadowBarrier = {
  id: "019e6245-a728-779c-900b-74e2fe075bf2",
  type: "page-type/temper-skill",
  slug: "shadow-barrier",
  title: "Shadow Barrier",
  key: "shadow-barrier",
  baseName: "Shadow Barrier",
  description:
    "Casting a Shadow ability grants you Major Resolve for 12 seconds, increasing your Physical and Spell Resistance by 5948. This duration is increased by 2 seconds for each piece of Heavy Armor equipped.\n\nCurrent duration: 12 seconds",
  icon: "/esoui/art/icons/ability_sorcerer_022.dds",
  esoSkillId: 45071,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  hashPlace: 1148,
  createdAt: "2026-05-26T03:13:12.488Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 12 seconds (Constant)",
    "<<2>> = 5948 (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 2 HeavyArmor + 12 (Heavy Armor, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
