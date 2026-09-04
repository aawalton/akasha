import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dizzyingSwing = {
  id: "019e6226-00e6-76bf-8ae4-f58279539e73",
  pageTypeSlug: "temper-skill",
  slug: "dizzying-swing",
  title: "Dizzying Swing",
  key: "dizzying-swing",
  baseName: "Uppercut",
  description:
    '"Slam an enemy with an upward swing, dealing 2760 Physical Damage and setting them Off Balance for 7 seconds.  \\n\\nHitting an enemy that is already Off Balance stuns them for 2 seconds.\\n\\nTargets that are immune to Off Balance are snared by 40% for 2 seconds."',
  icon: "/esoui/art/icons/ability_2handed_001_a.dds",
  esoSkillId: 39984,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
