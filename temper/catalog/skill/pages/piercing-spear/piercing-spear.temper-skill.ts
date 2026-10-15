import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const piercingSpear = {
  id: "019e6245-a6e6-71d7-af84-8e4f6788555b",
  type: "page-type/temper-skill",
  slug: "piercing-spear",
  title: "Piercing Spear",
  key: "piercing-spear",
  baseName: "Piercing Spear",
  description:
    "Increases your Critical Damage by 12%. \n\nIncreases your damage done to blocking players by 12%.",
  icon: "/esoui/art/icons/ability_templar_022.dds",
  esoSkillId: 44046,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 899,
  createdAt: "2026-05-26T03:13:12.422Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 12% (Constant)", "<<2>> = 12% (Constant)"],
} as const satisfies TemperSkill
