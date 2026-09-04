import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeancePiercingJavelin = {
  id: "019e6f53-a951-76ee-beb2-af401d98185c",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-piercing-javelin",
  title: "Vengeance Piercing Javelin",
  key: "vengeance-piercing-javelin",
  baseName: "Vengeance Piercing Javelin",
  description:
    '"Hurl your spear at an enemy with godlike strength knocking them back |cffffff15|r meters.\\n\\nThis ability cannot be blocked."',
  icon: "/esoui/art/icons/ability_templar_returning_spear.dds",
  esoSkillId: 237863,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-templar-aedric-spear",
  skillType: "active",
  subcategoryId: "vengeance-templar-aedric-spear",
} as const satisfies TemperSkill
