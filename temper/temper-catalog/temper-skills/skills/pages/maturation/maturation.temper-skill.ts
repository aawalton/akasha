import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const maturation = {
  id: "019e6245-a6cd-72a6-8486-98a3239f6068",
  pageTypeSlug: "temper-skill",
  slug: "maturation",
  title: "Maturation",
  key: "maturation",
  baseName: "Maturation",
  description:
    '"When you activate a heal on yourself or an ally you grant the target Minor Toughness, increasing their Max Health by 10% for 20 seconds."',
  icon: "/esoui/art/icons/passive_warden_007.dds",
  esoSkillId: 85881,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-green-balance",
  skillType: "passive",
  subcategoryId: "warden-green-balance",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
