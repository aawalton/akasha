import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const trafficker = {
  id: "019e6251-4cf9-7505-bd13-cd37c6fe9348",
  type: "page-type/temper-skill",
  slug: "trafficker",
  title: "Trafficker",
  key: "trafficker",
  baseName: "Trafficker",
  description: "Increases the number of fence interactions you can use each day by 180%.",
  icon: "/esoui/art/icons/ability_legerdemain_salesman.dds",
  esoSkillId: 63810,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/world-legerdemain",
  skillType: "temper-skill-type/passive",
  hashPlace: 1358,
  createdAt: "2026-05-26T03:25:55.833Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 180% (Constant)"],
} as const satisfies TemperSkill
