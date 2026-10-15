import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dynamic36591 = {
  id: "019e6f53-a0fa-73ec-b7aa-900b548fc426",
  type: "page-type/temper-skill",
  slug: "dynamic-36591",
  title: "Dynamic",
  key: "dynamic-36591",
  baseName: "Dynamic",
  description: "Increases your Max Magicka and Max Stamina by |cffffff600|r.",
  icon: "/esoui/art/icons/ability_weapon_023.dds",
  esoSkillId: 36591,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/racial-dark-elf-skills",
  skillType: "temper-skill-type/passive",
  hashPlace: 390,
  createdAt: "2026-05-28T16:03:32.218Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 600 (Constant)"],
} as const satisfies TemperSkill
