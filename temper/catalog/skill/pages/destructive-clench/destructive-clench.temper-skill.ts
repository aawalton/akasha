import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const destructiveClench = {
  id: "019e6226-00e4-7c73-af05-33917d8e06d8",
  type: "page-type/temper-skill",
  slug: "destructive-clench",
  title: "Destructive Clench",
  key: "destructive-clench",
  baseName: "Destructive Touch",
  description:
    "Devastate an enemy with an enhanced charge from your staff, dealing 1161 Magic Damage.\n\nThe initial hit always applies the element's status effect.\n\nFlame Clench also knocks the enemy back.\n\nFrost Clench deals less damage, has increased range, applies Major Maim, immobilizes, and taunts the enemy.\n\nShock Clench converts the attack into an area of effect explosion.",
  icon: "/esoui/art/icons/ability_destructionstaff_005_a.dds",
  esoSkillId: 41006,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 357,
  createdAt: "2026-05-26T02:38:38.308Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
