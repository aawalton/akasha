import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const shadowBarrier18866 = {
  id: "019e6f53-a6d7-7493-a99c-d4b1b5c45156",
  type: "page-type/temper-skill",
  slug: "shadow-barrier-18866",
  title: "Shadow Barrier",
  key: "shadow-barrier-18866",
  baseName: "Shadow Barrier",
  description:
    "Casting a Shadow ability grants you Major Resolve for |cffffff6|r seconds, increasing your Physical and Spell Resistance by |cffffff5948|r. This duration is increased by |cffffff2|r seconds for each piece of Heavy Armor equipped.\n\nCurrent duration: |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_sorcerer_022.dds",
  esoSkillId: 18866,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/passive",
  hashPlace: 1149,
  createdAt: "2026-05-28T16:03:33.719Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 5948 (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 2 HeavyArmor + 6 (Heavy Armor, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
