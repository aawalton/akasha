import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const blessingOfRestoration = {
  id: "019e6226-00d7-70ea-81b2-568b3d50d7b3",
  pageTypeSlug: "temper-skill",
  slug: "blessing-of-restoration",
  title: "Blessing of Restoration",
  key: "blessing-of-restoration",
  baseName: "Blessing of Protection",
  description:
    '"Slam your staff down to activate its blessings, healing you and your allies in front of you for 2970 Health.\\n\\nAlso grants Minor Resolve, increasing you and your allies\' Physical Resistance and Spell Resistance by 2974 for 20 seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_003_a.dds",
  esoSkillId: 41169,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
