import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const curativeCurse116286 = {
  id: "019e6f53-a053-744d-a5d6-44c107ed8db9",
  type: "page-type/temper-skill",
  slug: "curative-curse-116286",
  title: "Curative Curse",
  key: "curative-curse-116286",
  baseName: "Curative Curse",
  description:
    '"While you have a negative effect on you, your healing done is increased by |cffffff6|r%."',
  icon: "/esoui/art/icons/passive_necromancer_009.dds",
  esoSkillId: 116286,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
