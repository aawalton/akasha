import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const destructiveClench = {
  id: "019e6226-00e4-7c73-af05-33917d8e06d8",
  pageTypeSlug: "temper-skill",
  slug: "destructive-clench",
  title: "Destructive Clench",
  key: "destructive-clench",
  baseName: "Destructive Touch",
  description:
    '"Devastate an enemy with an enhanced charge from your staff, dealing 1161 Magic Damage.\\n\\nThe initial hit always applies the element\'s status effect.\\n\\nFlame Clench also knocks the enemy back.\\n\\nFrost Clench deals less damage, has increased range, applies Major Maim, immobilizes, and taunts the enemy.\\n\\nShock Clench converts the attack into an area of effect explosion."',
  icon: "/esoui/art/icons/ability_destructionstaff_005_a.dds",
  esoSkillId: 41006,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
