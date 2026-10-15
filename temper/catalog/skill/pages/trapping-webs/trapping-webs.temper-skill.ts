import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const trappingWebs = {
  id: "019e6f53-a85d-776d-969c-0ea26bcce66a",
  type: "page-type/temper-skill",
  slug: "trapping-webs",
  title: "Trapping Webs",
  key: "trapping-webs",
  baseName: "Trapping Webs",
  description:
    "Hurl webs to ensnare your foes, reducing the Movement Speed of enemies in the area by |cffffff50|r% and dealing |cffffff6400|r Physical Damage. After |cffffff10|r seconds the webs explode, dealing |cffffff8533|r Poison Damage to enemies within.\n\nA ranged ally can activate the Spawn Broodling synergy on an affected enemy, dealing |cffffff7819|r Poison Damage to them and summoning a spider to attack for |cffffff10|r seconds. The spider bites enemies for |cffffff2346|r Physical Damage.",
  icon: "/esoui/art/icons/ability_undaunted_003.dds",
  esoSkillId: 39425,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/guild-undaunted",
  skillType: "temper-skill-type/active",
  hashPlace: 1363,
  createdAt: "2026-05-28T16:03:34.109Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 50% (Constant)",
    "<<2>> = 0.0749181 MaxStat + 0.787428 MaxPower + 0.553891 (Ultimate, ratio = 10.51, Dmg, Physical, AOE, Direct, R2 = 1)",
    "<<3>> = 10 seconds (Constant)",
    "<<4>> = 0.0999631 MaxStat + 1.0499 MaxPower - 0.231961 (Ultimate, ratio = 10.50, Dmg, Poison, AOE, Direct, Melee, R2 = 1)",
    "<<5>> = Spawn Broodling (Constant)",
    "<<6>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, Dmg, Poison, SingleTarget, Direct, Melee, R2 = 1)",
    "<<7>> = 10 seconds (Constant)",
    "<<8>> = 0.03 MaxStat + 0.315 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
