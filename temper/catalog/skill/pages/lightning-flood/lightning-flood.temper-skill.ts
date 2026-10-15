import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lightningFlood = {
  id: "019e6245-a6bc-7da3-8450-59f8487342d2",
  type: "page-type/temper-skill",
  slug: "lightning-flood",
  title: "Lightning Flood",
  key: "lightning-flood",
  baseName: "Lightning Splash",
  description:
    "Create a nexus of storm energy at the target location, dealing 415 Shock Damage to enemies in the area every 1 second for 10 seconds.\n \nYou or an ally standing within the nexus can activate the Conduit synergy, dealing 2698 Shock Damage to enemies around them.",
  icon: "/esoui/art/icons/ability_sorcerer_lightning_flood.dds",
  esoSkillId: 30302,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 749,
  createdAt: "2026-05-26T03:13:12.380Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0185483 MaxStat + 0.1938 MaxPower - 1.55712 (Ultimate, ratio = 10.45, Dmg, Shock, AOE, DOT, 1s tick, R2 = 0.999993)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 10 seconds (Constant)",
    "<<4>> = Conduit (Constant)",
    "<<5>> = 0.12 MaxStat + 1.26 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
