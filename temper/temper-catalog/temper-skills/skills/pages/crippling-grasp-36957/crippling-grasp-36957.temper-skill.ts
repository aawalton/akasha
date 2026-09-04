import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cripplingGrasp36957 = {
  id: "019e6f53-a034-74de-8561-80705d6a92d8",
  pageTypeSlug: "temper-skill",
  slug: "crippling-grasp-36957",
  title: "Crippling Grasp",
  key: "crippling-grasp-36957",
  baseName: "Cripple",
  description:
    '"Sap an enemy\'s agility and wrack them with pain, dealing |cffffff4170|r Magic Damage and an additional |cffffff14300|r Magic Damage over |cffffff20|r seconds, immobilizing them for |cffffff2|r seconds, and reducing their Movement Speed by |cffffff30|r% for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_006_b.dds",
  esoSkillId: 36957,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
