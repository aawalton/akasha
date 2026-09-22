import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lightArmorBonuses = {
  id: "019e6238-c2e1-70a8-abbc-84fc4b845fb9",
  type: "page-type/temper-skill",
  slug: "light-armor-bonuses",
  title: "Light Armor Bonuses",
  key: "light-armor-bonuses",
  baseName: "Light Armor Bonuses",
  description:
    '"Each piece of Light Armor does the following:\\n\\nReduces damage taken from Magical attacks by 1%\\n\\nReduces the cost of Roll Dodge by 3%\\n\\nReduces the Movement Speed penalty of Sneak by 5%\\n\\nReduces the cost of Break Free by 5%\\n\\nReduces the cost of Bash by 3%"',
  icon: "/esoui/art/icons/passive_armor2_light.dds",
  esoSkillId: 150185,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/armor-light-armor",
  skillType: "temper-skill-type/passive",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
