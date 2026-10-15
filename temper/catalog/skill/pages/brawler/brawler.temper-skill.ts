import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const brawler = {
  id: "019e6226-00da-73ba-b733-71ae9a655794",
  type: "page-type/temper-skill",
  slug: "brawler",
  title: "Brawler",
  key: "brawler",
  baseName: "Cleave",
  description:
    "Focus your strength into a mighty swing, dealing 1742 Physical Damage to enemies in front of you.\n\nYou also gain a damage shield that absorbs 1799 damage for 6 seconds. Each enemy hit increases the damage shield's strength by 50%, up to 300%.",
  icon: "/esoui/art/icons/ability_2handed_002_b.dds",
  esoSkillId: 39769,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-two-handed",
  skillType: "temper-skill-type/active",
  hashPlace: 162,
  createdAt: "2026-05-26T02:38:38.298Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.81349 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0800603 MaxStat + 0.840442 MaxPower - 2.30849 (Ultimate, ratio = 10.50, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 50 (Constant)",
  ],
} as const satisfies TemperSkill
