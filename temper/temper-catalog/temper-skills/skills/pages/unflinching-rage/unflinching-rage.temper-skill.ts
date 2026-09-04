import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const unflinchingRage = {
  id: "019e624a-12e5-7b32-ae3a-936b53bb3044",
  pageTypeSlug: "temper-skill",
  slug: "unflinching-rage",
  title: "Unflinching Rage",
  key: "unflinching-rage",
  baseName: "Unflinching Rage",
  description:
    '"Increases your Max Health by 1000.\\n\\nWhen you deal damage, you heal for 2125 Health.  This can occur once every 4 seconds."',
  icon: "/esoui/art/icons/ability_sorcerer_018.dds",
  esoSkillId: 84672,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-orc-skills",
  skillType: "passive",
  subcategoryId: "racial-orc-skills",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
