import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const quickSiphon40116 = {
  id: "019e6f53-a575-7e8d-8661-ae33a75d0ba8",
  pageTypeSlug: "temper-skill",
  slug: "quick-siphon-40116",
  title: "Quick Siphon",
  key: "quick-siphon-40116",
  baseName: "Force Siphon",
  description:
    '"Focus your staff\'s power to apply Minor Lifesteal to an enemy for |cffffff30|r seconds, healing you and your allies for |cffffff612|r Health every |cffffff1|r second when damaging them.\\n\\nWhen you or an ally hits the target, they gain Minor Expedition, which increases their Movement Speed by |cffffff15|r% for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_005_b.dds",
  esoSkillId: 40116,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 38,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
