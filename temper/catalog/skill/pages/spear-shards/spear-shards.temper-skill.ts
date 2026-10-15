import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const spearShards = {
  id: "019e6f53-a77f-7c78-be65-2a4745af63f0",
  type: "page-type/temper-skill",
  slug: "spear-shards",
  title: "Spear Shards",
  key: "spear-shards",
  baseName: "Spear Shards",
  description:
    "Send your spear into the heavens to bring down a shower of divine wrath, dealing |cffffff6400|r Magic Damage to enemies in the area and an additional |cffffff578|r Magic Damage every |cffffff1|r second for |cffffff10|r seconds.\n\nAn ally near the spear can activate the Blessed Shards synergy, restoring |cffffff3960|r Magicka or Stamina, whichever maximum is higher.",
  icon: "/esoui/art/icons/ability_templar_sun_strike.dds",
  esoSkillId: 26188,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 1241,
  createdAt: "2026-05-28T16:03:33.887Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.075 MaxStat + 0.7875 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0070637 MaxStat + 0.0748353 MaxPower + 1.33182 (Ultimate, ratio = 10.59, Dmg, Magic, AOE, DOT, 1s tick, R2 = 0.999987)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = Blessed Shards (Constant)",
    "<<6>> = 3960 (Constant)",
  ],
} as const satisfies TemperSkill
