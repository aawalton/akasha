import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const unstableWallOfElements = {
  id: "019e6226-011d-71b2-bdb4-1a99379cedfa",
  type: "page-type/temper-skill",
  slug: "unstable-wall-of-elements",
  title: "Unstable Wall of Elements",
  key: "unstable-wall-of-elements",
  baseName: "Wall of Elements",
  description:
    "Create an unstable elemental barrier in front of you, dealing 281 Magic Damage to enemies in the target area every 1 second before exploding for an additional 1199 Magic Damage.\n\nUnstable Wall of Fire deals additional damage to Burning enemies.\n\nUnstable Wall of Frost costs more, but snares and reduces armor against Chilled enemies and grants damage shields.\n\nUnstable Wall of Storms sets Concussed enemies Off Balance.",
  icon: "/esoui/art/icons/ability_destructionstaff_002b.dds",
  esoSkillId: 41711,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 1394,
  createdAt: "2026-05-26T02:38:38.365Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.012521 MaxStat + 0.131473 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, DOT, 10s duration, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 0.05335445 MaxStat + 0.560221725 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
