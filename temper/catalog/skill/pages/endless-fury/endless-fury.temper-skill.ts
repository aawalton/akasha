import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const endlessFury = {
  id: "019e6245-a667-7a56-bd51-06f10793f5d0",
  type: "page-type/temper-skill",
  slug: "endless-fury",
  title: "Endless Fury",
  key: "endless-fury",
  baseName: "Mages' Fury",
  description:
    "Call down lightning to strike an enemy, dealing 871 Shock Damage.\n\nIf the enemy falls to or below 20% Health within 2 seconds of being struck, an explosion deals an additional 3195 Shock Damage to them and 696 Shock Damage to other enemies nearby.\n\nIf any enemy is killed within 5 seconds of being hit with this ability, you restore 4860 Magicka.",
  icon: "/esoui/art/icons/ability_sorcerer_endless_fury.dds",
  esoSkillId: 30343,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 431,
  createdAt: "2026-05-26T03:13:12.295Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.03875 MaxStat + 0.40675 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 2 seconds (Constant)",
    "<<3>> = 0.142038 MaxStat + 1.49139 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, SingleTarget, Direct, Melee, R2 = 1)",
    "<<4>> = 0.03099 MaxStat + 0.325395 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, AOE, Direct, Melee, R2 = 1)",
    "<<5>> = 4860 (Constant)",
  ],
} as const satisfies TemperSkill
