import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const quickSiphon = {
  id: "019e6226-0106-76e9-9869-6e4a7951614d",
  pageTypeSlug: "temper-skill",
  slug: "quick-siphon",
  title: "Quick Siphon",
  key: "quick-siphon",
  baseName: "Force Siphon",
  description:
    '"Focus your staff\'s power to apply Minor Lifesteal to an enemy for 30 seconds, healing you and your allies for 600 Health every 1 second when damaging them.\\n\\nWhen you or an ally hits the target, they gain Minor Expedition, which increases their Movement Speed by 15% for 4 seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_005_b.dds",
  esoSkillId: 41239,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
