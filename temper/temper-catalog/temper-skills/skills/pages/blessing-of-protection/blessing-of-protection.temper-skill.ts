import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const blessingOfProtection = {
  id: "019e6f53-9f30-70bb-8995-08c75a464425",
  pageTypeSlug: "temper-skill",
  slug: "blessing-of-protection",
  title: "Blessing of Protection",
  key: "blessing-of-protection",
  baseName: "Blessing of Protection",
  description:
    '"Slam your staff down to activate its blessings, healing you and your allies in front of you for |cffffff8220|r Health.\\n\\nAlso grants Minor Resolve, increasing you and your allies\' Physical Resistance and Spell Resistance by |cffffff2974|r for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_restorationstaff_003.dds",
  esoSkillId: 37243,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
