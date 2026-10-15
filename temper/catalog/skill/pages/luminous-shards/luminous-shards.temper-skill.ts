import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const luminousShards = {
  id: "019e6245-a6c3-7057-8dcc-1af62a379fff",
  type: "page-type/temper-skill",
  slug: "luminous-shards",
  title: "Luminous Shards",
  key: "luminous-shards",
  baseName: "Spear Shards",
  description:
    "Send your spear into the heavens to bring down a shower of divine wrath, dealing 1742 Magic Damage to enemies in the area and an additional 165 Magic Damage every 1 second for 10 seconds.\n\nYou or an ally near the spear can activate the Holy Shards synergy, which restores 3960 Magicka and Stamina.",
  icon: "/esoui/art/icons/ability_templar_light_strike.dds",
  esoSkillId: 27122,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 774,
  createdAt: "2026-05-26T03:13:12.387Z",
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
