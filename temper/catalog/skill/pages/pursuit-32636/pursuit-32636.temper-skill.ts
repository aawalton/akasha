import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const pursuit32636 = {
  id: "019e6f53-a56c-7b60-b8ec-a1c58aa769bd",
  type: "page-type/temper-skill",
  slug: "pursuit-32636",
  title: "Master of the Chase",
  key: "pursuit-32636",
  baseName: "Master of the Chase",
  description:
    '"Give chase, hunter. Become pursuit unrelenting.\\n\\nIncreases your Movement Speed by |cffffff15|r%."',
  icon: "/esoui/art/icons/ability_werewolf_010.dds",
  esoSkillId: 32636,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/world-werewolf",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
