import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const liquidLightning = {
  id: "019e6245-a6bd-7e1d-8e9e-66a3272191a5",
  type: "page-type/temper-skill",
  slug: "liquid-lightning",
  title: "Liquid Lightning",
  key: "liquid-lightning",
  baseName: "Lightning Splash",
  description:
    "Create a nexus of storm energy at the target location, dealing 309 Shock Damage to enemies in the area every 1 second for 15 seconds.\n \nYou or an ally standing within the nexus can activate the Conduit synergy, dealing 2698 Shock Damage to enemies around them.",
  icon: "/esoui/art/icons/ability_sorcerer_liquid_lightning.dds",
  esoSkillId: 30286,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 758,
  createdAt: "2026-05-26T03:13:12.381Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0138166 MaxStat + 0.144328 MaxPower - 1.21421 (Ultimate, ratio = 10.45, Dmg, Shock, AOE, DOT, 1s tick, R2 = 0.999988)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 15 seconds (Constant)",
    "<<4>> = Conduit (Constant)",
    "<<5>> = 0.12 MaxStat + 1.26 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
