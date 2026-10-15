import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const magesWrath = {
  id: "019e6245-a6c4-7105-bb25-54086c8316b8",
  type: "page-type/temper-skill",
  slug: "mages-wrath",
  title: "Mages' Wrath",
  key: "mages-wrath",
  baseName: "Mages' Fury",
  description:
    "Call down lightning to strike an enemy, dealing 871 Shock Damage.\n\nIf the enemy falls to or below 20% Health within 2 seconds of being struck, an explosion deals an additional 3195 Shock Damage to them and all nearby enemies.",
  icon: "/esoui/art/icons/ability_sorcerer_mage_wraith.dds",
  esoSkillId: 30331,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 782,
  createdAt: "2026-05-26T03:13:12.388Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.03875 MaxStat + 0.40675 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 2 seconds (Constant)",
    "<<3>> = 0.142038 MaxStat + 1.49139 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
