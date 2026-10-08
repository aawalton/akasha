import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dismember = {
  id: "019e6245-a65b-7c32-ad69-185ff2360626",
  type: "page-type/temper-skill",
  slug: "dismember",
  title: "Dismember",
  key: "dismember",
  baseName: "Dismember",
  description:
    "While a Grave Lord ability is active, your Spell and Physical Penetration are increased by 3271.",
  icon: "/esoui/art/icons/passive_necromancer_003.dds",
  esoSkillId: 116194,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  hashPlace: 372,
  createdAt: "2026-05-26T03:13:12.283Z",
  updatedAt: "2026-09-27T06:25:43.000Z",
} as const satisfies TemperSkill
