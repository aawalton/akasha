import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const flameLash20816 = {
  id: "019e6f53-a203-732e-be37-37eda729124d",
  type: "page-type/temper-skill",
  slug: "flame-lash-20816",
  title: "Flame Lash",
  key: "flame-lash-20816",
  baseName: "Lava Whip",
  description:
    "Lash an enemy with flame, dealing |cffffff8076|r Flame Damage and healing for |cffffff2514|r Health.\n\nHitting an Off Balance enemy grants |cffffff5|r stacks of Power Lash for |cffffff20|r seconds, up to once every |cffffff20|r seconds.\n\nActivating again consumes a stack to deal |cffffff15931|r Flame Damage to your target and all nearby enemies and heals for |cffffff10063|r Health. Consuming all stacks as a Dragonknight increases your damage done by |cffffff7|r%, double against monsters, for |cffffff45|r seconds.",
  icon: "/esoui/art/icons/ability_dragonknight_001_a.dds",
  esoSkillId: 20816,
  isMorph: true,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/dragonknight-ardent-flame",
  skillType: "temper-skill-type/active",
  hashPlace: 514,
  createdAt: "2026-05-28T16:03:32.483Z",
  updatedAt: "2026-10-21T07:12:28.248Z",
  equations: [
    "<<1>> = 0.10327876 MaxStat + 1.0844269 MaxPower (Ultimate, RankMod(1), Dmg, Flame, SingleTarget, Direct, Melee)",
    "<<2>> = 0.035554 MaxStat + 0.373411 MaxPower (Ultimate, RankMod(1), Heal, SingleTarget, Direct)",
    "<<3>> = 5 (Constant)",
    "<<4>> = Power Lash (Constant)",
    "<<5>> = 20 seconds (Constant)",
    "<<6>> = 20 seconds (Constant)",
    "<<7>> = 3% (Constant)",
    "<<8>> = 45 seconds (Constant)",
    "<<9>> = 0.15903609 MaxStat + 1.6698789 MaxPower (Ultimate, Dmg, Flame, AOE, Direct, Melee)",
    "<<10>> = 0.07114 MaxStat + 0.74683 MaxPower (Ultimate, RankMod(1), Heal, SingleTarget, Direct)",
  ],
  variants: [
    {
      esoSkillId: 20824,
      equations: [
        "<<1>> = 0.15903609 MaxStat + 1.6698789 MaxPower (Ultimate, Dmg, Flame, AOE, Direct, Melee)",
        "<<2>> = 0.07973 MaxStat + 0.83621 MaxPower (Ultimate, RankMod(1), Heal, SingleTarget, Direct)",
      ],
    },
  ],
} as const satisfies TemperSkill
