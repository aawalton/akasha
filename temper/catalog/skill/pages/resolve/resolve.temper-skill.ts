import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const resolve = {
  id: "019e6238-c302-724c-8167-e37fba8feae0",
  type: "page-type/temper-skill",
  slug: "resolve",
  title: "Resolve",
  key: "resolve",
  baseName: "Resolve",
  description:
    "Increases your Physical and Spell Resistance by 343 for each piece of Heavy Armor equipped.\n\nCurrent bonus: 0.",
  icon: "/esoui/art/icons/ability_dragonknight_020.dds",
  esoSkillId: 45533,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/armor-heavy-armor",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 1042,
  createdAt: "2026-05-26T02:59:07.650Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 343 (Constant)",
    "<<2>> = 343 HeavyArmor (Heavy Armor, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
