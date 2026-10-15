import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const powerBash = {
  id: "019e6f53-a51f-757b-8fc2-3980f4221147",
  type: "page-type/temper-skill",
  slug: "power-bash",
  title: "Power Bash",
  key: "power-bash",
  baseName: "Power Bash",
  description:
    "Strike an enemy full-force with your shield, dealing |cffffff8203|r Physical Damage. \n\nThis ability's damage is considered Bash damage and interrupts the enemy if they are casting.",
  icon: "/esoui/art/icons/ability_1handed_005.dds",
  esoSkillId: 28365,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 38,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 908,
  createdAt: "2026-05-28T16:03:33.279Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
