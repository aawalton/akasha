import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const magesFury = {
  id: "019e6f53-a430-75ea-83e6-628452ec7ce4",
  type: "page-type/temper-skill",
  slug: "mages-fury",
  title: "Mages' Fury",
  key: "mages-fury",
  baseName: "Mages' Fury",
  description:
    "Call down lightning to strike an enemy, dealing |cffffff3028|r Shock Damage.\n\nIf the enemy falls to or below |cffffff20|r% Health within |cffffff2|r seconds of being struck, an explosion deals an additional |cffffff11105|r Shock Damage to them and |cffffff2560|r Shock Damage to other enemies nearby.",
  icon: "/esoui/art/icons/ability_sorcerer_mage_fury.dds",
  esoSkillId: 18718,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 781,
  createdAt: "2026-05-28T16:03:33.040Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0375 MaxStat + 0.39375 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Shock, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 2 seconds (Constant)",
    "<<3>> = 0.137506 MaxStat + 1.4438 MaxPower - 0.911267 (Ultimate, ratio = 10.50, Dmg, Shock, SingleTarget, Direct, Melee, R2 = 1)",
    "<<4>> = 0.03 MaxStat + 0.315 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Shock, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
