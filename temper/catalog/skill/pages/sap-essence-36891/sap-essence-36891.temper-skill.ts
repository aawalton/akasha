import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const sapEssence36891 = {
  id: "019e6f53-a6ae-711a-877a-e113e883dd0d",
  type: "page-type/temper-skill",
  slug: "sap-essence-36891",
  title: "Sap Essence",
  key: "sap-essence-36891",
  baseName: "Drain Power",
  description:
    "Siphon the vigor from your enemies' blood, dealing |cffffff6401|r Magic Damage to all nearby enemies and healing you and your allies for |cffffff1886|r plus |cffffff20|r% more for each enemy hit.\n\nIf an enemy is hit, you gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by |cffffff20|r% for |cffffff30|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_013_a.dds",
  esoSkillId: 36891,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1127,
  createdAt: "2026-05-28T16:03:33.678Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.025825 MaxStat + 0.271163 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, R2 = 1)",
    "<<3>> = 20 (Constant)",
    "<<4>> = 20% (Constant)",
    "<<5>> = 30 seconds (Constant)",
  ],
} as const satisfies TemperSkill
