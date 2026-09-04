import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const siphonSpirit = {
  id: "019e6226-0114-790b-a3df-81757c9eb3c3",
  pageTypeSlug: "temper-skill",
  slug: "siphon-spirit",
  title: "Siphon Spirit",
  key: "siphon-spirit",
  baseName: "Force Siphon",
  description:
    '"Focus your staff\'s power to apply Minor Lifesteal to an enemy for 30 seconds, healing you and your allies for 600 Health every 1 second when damaging them.\\n\\nAlso applies Minor Magickasteal to the enemy for 30 seconds, causing you and your allies to restore 168 Magicka every 1 second when damaging them."',
  icon: "/esoui/art/icons/ability_restorationstaff_005_a.dds",
  esoSkillId: 41225,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
