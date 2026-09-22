import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const frozenArmor = {
  id: "019e6245-a68a-7a79-8921-198435ed8a32",
  type: "page-type/temper-skill",
  slug: "frozen-armor",
  title: "Frozen Armor",
  key: "frozen-armor",
  baseName: "Frozen Armor",
  description:
    '"Increases your Physical and Spell Resistance by 1240 for each Winter\'s Embrace ability slotted.\\n\\nCurrent Bonus: 0."',
  icon: "/esoui/art/icons/passive_warden_001.dds",
  esoSkillId: 86190,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
