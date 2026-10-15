import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const reverberatingBash38455 = {
  id: "019e6f53-a644-7bf0-84ad-6dfbdc021180",
  type: "page-type/temper-skill",
  slug: "reverberating-bash-38455",
  title: "Reverberating Bash",
  key: "reverberating-bash-38455",
  baseName: "Power Bash",
  description:
    "Strike an enemy full-force with your shield, dealing |cffffff4165|r Physical Damage and stunning them for |cffffff3|r seconds.\n\nAfter the stun ends, the enemy takes an additional |cffffff4165|r Physical Damage.\n\nThis ability's damage is considered Bash damage and interrupts the enemy if they are casting.",
  icon: "/esoui/art/icons/ability_1handed_005_b.dds",
  esoSkillId: 38455,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 1,
  rank: 38,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 1066,
  createdAt: "2026-05-28T16:03:33.572Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
