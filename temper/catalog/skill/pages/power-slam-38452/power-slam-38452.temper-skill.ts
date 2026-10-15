import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const powerSlam38452 = {
  id: "019e6f53-a52e-75f9-9ae4-ebe16abe7ee8",
  type: "page-type/temper-skill",
  slug: "power-slam-38452",
  title: "Power Slam",
  key: "power-slam-38452",
  baseName: "Power Bash",
  description:
    "Strike an enemy full-force with your shield, dealing |cffffff8469|r Physical Damage.\n\nWhile slotted, blocking any attack grants you Resentment, which reduces the cost of your next Power Slam cast within |cffffff10|r seconds by |cffffff50|r%.\n\nThis ability's damage is considered Bash damage and interrupts the enemy if they are casting.",
  icon: "/esoui/art/icons/ability_1handed_005_a.dds",
  esoSkillId: 38452,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 38,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 916,
  createdAt: "2026-05-28T16:03:33.294Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = Resentment (Constant)",
    "<<3>> = Power Slam (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 47% (Constant)",
  ],
} as const satisfies TemperSkill
