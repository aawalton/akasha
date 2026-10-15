import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const spellWarding = {
  id: "019e6238-c318-78f3-8e50-aaffd0809693",
  type: "page-type/temper-skill",
  slug: "spell-warding",
  title: "Spell Warding",
  key: "spell-warding",
  baseName: "Spell Warding",
  description:
    "Increases your Spell Resistance by 726 for each piece of Light Armor equipped. \n\nCurrent bonus: 0.",
  icon: "/esoui/art/icons/ability_armor_006.dds",
  esoSkillId: 45559,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/armor-light-armor",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 1254,
  createdAt: "2026-05-26T02:59:07.672Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 726 (Constant)",
    "<<2>> = 726 LightArmor (Light Armor, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
