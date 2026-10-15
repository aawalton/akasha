import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const powerSlam = {
  id: "019e6226-0103-7ec2-a07a-6d6923ce1cbd",
  type: "page-type/temper-skill",
  slug: "power-slam",
  title: "Power Slam",
  key: "power-slam",
  baseName: "Power Bash",
  description:
    "Strike an enemy full-force with your shield, dealing 2399 Physical Damage.\n\nWhile slotted, blocking any attack grants you Resentment, which reduces the cost of your next Power Slam cast within 10 seconds by 50%.\n\nThis ability's damage is considered Bash damage and interrupts the enemy if they are casting.",
  icon: "/esoui/art/icons/ability_1handed_005_a.dds",
  esoSkillId: 41459,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 915,
  createdAt: "2026-05-26T02:38:38.339Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1067089 MaxStat + 1.12044345 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = Resentment (Constant)",
    "<<3>> = Power Slam (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 50% (Constant)",
  ],
} as const satisfies TemperSkill
