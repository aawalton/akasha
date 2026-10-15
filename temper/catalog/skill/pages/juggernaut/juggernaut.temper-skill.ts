import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const juggernaut = {
  id: "019e6238-c2d2-7ed3-9fc3-02945e21f2b6",
  type: "page-type/temper-skill",
  slug: "juggernaut",
  title: "Juggernaut",
  key: "juggernaut",
  baseName: "Juggernaut",
  description:
    "Increases your Max Health by 2% for each piece of Heavy Armor equipped.  \n\nCurrent bonus: 0%.",
  icon: "/esoui/art/icons/ability_armor_012.dds",
  esoSkillId: 45546,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/armor-heavy-armor",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 703,
  createdAt: "2026-05-26T02:59:07.602Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 2% (Constant)",
    "<<2>> = 2 HeavyArmor (Heavy Armor, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
