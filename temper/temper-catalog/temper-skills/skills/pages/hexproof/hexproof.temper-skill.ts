import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hexproof = {
  id: "019e6245-a6a4-7fbc-b1ab-59825e996907",
  pageTypeSlug: "temper-skill",
  slug: "hexproof",
  title: "Hexproof",
  key: "hexproof",
  baseName: "Expunge",
  description:
    '"Embrace the power of death, removing up to 4 negative effects from yourself.\\n\\nWhile slotted, the cost of all your abilities are reduced by 3%."',
  icon: "/esoui/art/icons/ability_necromancer_014_a.dds",
  esoSkillId: 40117919,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
  effects: "jsonl",
} as const satisfies TemperSkill
