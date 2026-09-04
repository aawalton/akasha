import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elementalBlockade = {
  id: "019e6226-00e8-7de2-bb9b-61ecec9219c6",
  pageTypeSlug: "temper-skill",
  slug: "elemental-blockade",
  title: "Elemental Blockade",
  key: "elemental-blockade",
  baseName: "Wall of Elements",
  description:
    '"Slam your staff down to create an elemental barrier in front of you, dealing 281 Magic Damage to enemies in the target area every 1 second.\\n\\nBlockade of Fire deals additional damage to Burning enemies.\\n\\nBlockade of Frost costs more, but snares and reduces armor against Chilled enemies and grants damage shields.\\n\\nBlockade of Storms sets Concussed enemies Off Balance."',
  icon: "/esoui/art/icons/ability_destructionstaff_002a.dds",
  esoSkillId: 41769,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
