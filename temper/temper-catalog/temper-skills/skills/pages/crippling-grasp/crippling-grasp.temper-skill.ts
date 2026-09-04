import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cripplingGrasp = {
  id: "019e6245-a625-75ae-bf5d-6e0e6e398676",
  pageTypeSlug: "temper-skill",
  slug: "crippling-grasp",
  title: "Crippling Grasp",
  key: "crippling-grasp",
  baseName: "Cripple",
  description:
    '"Sap an enemy\'s agility and wrack them with pain, dealing 1199 Magic Damage and an additional 4350 Magic Damage over 20 seconds, immobilizing them for 2 seconds, and reducing their Movement Speed by 30% for 4 seconds."',
  icon: "/esoui/art/icons/ability_nightblade_006_b.dds",
  esoSkillId: 37913,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
