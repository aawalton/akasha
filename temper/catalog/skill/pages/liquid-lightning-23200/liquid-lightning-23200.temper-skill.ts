import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const liquidLightning23200 = {
  id: "019e6f53-a40c-7d2b-ada0-6cd51a06d470",
  type: "page-type/temper-skill",
  slug: "liquid-lightning-23200",
  title: "Liquid Lightning",
  key: "liquid-lightning-23200",
  baseName: "Lightning Splash",
  description:
    "Create a nexus of storm energy at the target location, dealing |cffffff1076|r Shock Damage to enemies in the area every |cffffff1|r second for |cffffff15|r seconds.\n \nYou or an ally standing within the nexus can activate the Conduit synergy, dealing |cffffff9914|r Shock Damage to enemies around them.",
  icon: "/esoui/art/icons/ability_sorcerer_liquid_lightning.dds",
  esoSkillId: 23200,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 759,
  createdAt: "2026-05-28T16:03:33.004Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0138166 MaxStat + 0.144328 MaxPower - 1.21421 (Ultimate, ratio = 10.45, Dmg, Shock, AOE, DOT, 1s tick, R2 = 0.999988)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 12 seconds (Constant)",
    "<<4>> = Conduit (Constant)",
    "<<5>> = 0.12 MaxStat + 1.26 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
