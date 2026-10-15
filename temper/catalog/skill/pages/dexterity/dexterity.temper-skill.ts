import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dexterity = {
  id: "019e6238-c2b3-7c77-ab59-f2c0250d072b",
  type: "page-type/temper-skill",
  slug: "dexterity",
  title: "Dexterity",
  key: "dexterity",
  baseName: "Dexterity",
  description:
    "Increases your Critical Damage and Healing done rating by 2% for every piece of Medium Armor equipped.\n\nCurrent bonus: 0%.",
  icon: "/esoui/art/icons/ability_armor_008.dds",
  esoSkillId: 45564,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/armor-medium-armor",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 365,
  createdAt: "2026-05-26T02:59:07.571Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 2 MediumArmor (Medium Armor, SingleTarget, Direct, R2 = 1)"],
} as const satisfies TemperSkill
