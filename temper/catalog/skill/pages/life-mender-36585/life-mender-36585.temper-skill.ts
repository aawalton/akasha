import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lifeMender36585 = {
  id: "019e6f53-a3eb-72f5-82a2-e41237b3bd3e",
  type: "page-type/temper-skill",
  slug: "life-mender-36585",
  title: "Life Mender",
  key: "life-mender-36585",
  baseName: "Life Mender",
  description: '"Increases your healing done by |cffffff1|r%."',
  icon: "/esoui/art/icons/ability_templar_014.dds",
  esoSkillId: 36585,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/racial-argonian-skills",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
