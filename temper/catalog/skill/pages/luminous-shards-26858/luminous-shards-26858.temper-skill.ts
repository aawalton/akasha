import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const luminousShards26858 = {
  id: "019e6f53-a427-77fb-bf1b-09c6b3560090",
  type: "page-type/temper-skill",
  slug: "luminous-shards-26858",
  title: "Luminous Shards",
  key: "luminous-shards-26858",
  baseName: "Spear Shards",
  description:
    "Send your spear into the heavens to bring down a shower of divine wrath, dealing |cffffff6401|r Magic Damage to enemies in the area and an additional |cffffff578|r Magic Damage every |cffffff1|r second for |cffffff10|r seconds.\n\nYou or an ally near the spear can activate the Holy Shards synergy, which restores |cffffff3960|r Magicka and Stamina.",
  icon: "/esoui/art/icons/ability_templar_light_strike.dds",
  esoSkillId: 26858,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 775,
  createdAt: "2026-05-28T16:03:33.031Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.00743 MaxStat + 0.07802 MaxPower - 2.2103 (Ultimate, ratio = 10.50, Dmg, Magic, AOE, DOT, 1s tick, R2 = 0.999967)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = Holy Shards (Constant)",
    "<<6>> = 3960 (Constant)",
  ],
} as const satisfies TemperSkill
