import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lavaWhip = {
  id: "019e6f53-a3c3-783b-862a-fec6759449c2",
  type: "page-type/temper-skill",
  slug: "lava-whip",
  title: "Lava Whip",
  key: "lava-whip",
  baseName: "Lava Whip",
  description:
    "Lash an enemy with flame, dealing |cffffff8076|r Flame Damage.\n\nHitting an Off Balance enemy grants |cffffff5|r stacks of Volcanic Whip for |cffffff20|r seconds, up to once every |cffffff20|r seconds.\n\nVolcanic Whip replaces this ability and consumes a stack to instead deal |cffffff15931|r Flame Damage to your target and all nearby enemies.",
  icon: "/esoui/art/icons/ability_dragonknight_001.dds",
  esoSkillId: 23806,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/dragonknight-ardent-flame",
  skillType: "temper-skill-type/active",
  hashPlace: 730,
  createdAt: "2026-05-28T16:03:32.931Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 5 (Constant)",
    "<<3>> = Volcanic Whip (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 20 seconds (Constant)",
    "<<6>> = 0.186667 MaxStat + 1.96 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
