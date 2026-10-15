import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeancePiercingJavelin = {
  id: "019e6f53-a951-76ee-beb2-af401d98185c",
  type: "page-type/temper-skill",
  slug: "vengeance-piercing-javelin",
  title: "Vengeance Piercing Javelin",
  key: "vengeance-piercing-javelin",
  baseName: "Vengeance Piercing Javelin",
  description:
    "Hurl your spear at an enemy with godlike strength knocking them back |cffffff15|r meters.\n\nThis ability cannot be blocked.",
  icon: "/esoui/art/icons/ability_templar_returning_spear.dds",
  esoSkillId: 237863,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 1521,
  createdAt: "2026-05-28T16:03:34.353Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 15 meters (Constant)"],
} as const satisfies TemperSkill
