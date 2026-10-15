import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const unstableWallOfElements39052 = {
  id: "019e6f53-a899-76a6-84e1-e3112c4c2461",
  type: "page-type/temper-skill",
  slug: "unstable-wall-of-elements-39052",
  title: "Unstable Wall of Elements",
  key: "unstable-wall-of-elements-39052",
  baseName: "Wall of Elements",
  description:
    "Create an unstable elemental barrier in front of you, dealing |cffffff978|r Magic Damage to enemies in the target area every |cffffff1|r second before exploding for an additional |cffffff4406|r Magic Damage.\n\nUnstable Wall of Fire deals additional damage to Burning enemies.\n\nUnstable Wall of Frost costs more, but snares and reduces armor against Chilled enemies and grants damage shields.\n\nUnstable Wall of Storms sets Concussed enemies Off Balance.",
  icon: "/esoui/art/icons/ability_destructionstaff_002b.dds",
  esoSkillId: 39052,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 1395,
  createdAt: "2026-05-28T16:03:34.169Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.012521 MaxStat + 0.131473 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, DOT, 10s duration, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
