import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const piercingJavelin = {
  id: "019e6f53-a507-7745-b847-17de24fbe7e0",
  type: "page-type/temper-skill",
  slug: "piercing-javelin",
  title: "Piercing Javelin",
  key: "piercing-javelin",
  baseName: "Piercing Javelin",
  description:
    "Hurl your spear at an enemy with godlike strength, dealing |cffffff4846|r Magic Damage and knocking them back |cffffff8|r meters.\n\nThis ability ignores the enemy's Resistances and cannot be blocked.",
  icon: "/esoui/art/icons/ability_templar_returning_spear.dds",
  esoSkillId: 26158,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 896,
  createdAt: "2026-05-28T16:03:33.255Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06 MaxStat + 0.63 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 8 meters (Constant)",
  ],
} as const satisfies TemperSkill
