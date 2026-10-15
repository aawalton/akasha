import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reverberatingBash = {
  id: "019e6226-010f-7939-8152-83b3cafc20a1",
  type: "page-type/temper-skill",
  slug: "reverberating-bash",
  title: "Reverberating Bash",
  key: "reverberating-bash",
  baseName: "Power Bash",
  description:
    "Strike an enemy full-force with your shield, dealing 1161 Physical Damage and stunning them for 3 seconds.\n\nAfter the stun ends, the enemy takes an additional 1161 Physical Damage.\n\nThis ability's damage is considered Bash damage and interrupts the enemy if they are casting.",
  icon: "/esoui/art/icons/ability_1handed_005_b.dds",
  esoSkillId: 41448,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 1065,
  createdAt: "2026-05-26T02:38:38.351Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
