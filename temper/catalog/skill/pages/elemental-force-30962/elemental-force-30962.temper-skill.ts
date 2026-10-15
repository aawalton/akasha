import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const elementalForce30962 = {
  id: "019e6f53-a118-77a3-9859-16f48ac8603b",
  type: "page-type/temper-skill",
  slug: "elemental-force-30962",
  title: "Elemental Force",
  key: "elemental-force-30962",
  baseName: "Elemental Force",
  description: "Increases your chance to apply status effects by |cffffff50|r%.",
  icon: "/esoui/art/icons/ability_weapon_005.dds",
  esoSkillId: 30962,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 25,
  morphIndex: 0,
  rank: 25,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/passive",
  hashPlace: 404,
  createdAt: "2026-05-28T16:03:32.248Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 50% (Constant)"],
} as const satisfies TemperSkill
