import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lightningFlood23205 = {
  id: "019e6f53-a3fa-7845-ab10-4b93883d6f63",
  type: "page-type/temper-skill",
  slug: "lightning-flood-23205",
  title: "Lightning Flood",
  key: "lightning-flood-23205",
  baseName: "Lightning Splash",
  description:
    "Create a nexus of storm energy at the target location, dealing |cffffff1445|r Shock Damage to enemies in the area every |cffffff1|r second for |cffffff10|r seconds.\n \nYou or an ally standing within the nexus can activate the Conduit synergy, dealing |cffffff9914|r Shock Damage to enemies around them.",
  icon: "/esoui/art/icons/ability_sorcerer_lightning_flood.dds",
  esoSkillId: 23205,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/sorcerer-storm-calling",
  skillType: "temper-skill-type/active",
  hashPlace: 750,
  createdAt: "2026-05-28T16:03:32.986Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0179353 MaxStat + 0.187785 MaxPower - 1.1442 (Ultimate, ratio = 10.47, Dmg, Shock, AOE, DOT, 1s tick, R2 = 0.999993)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 10 seconds (Constant)",
    "<<4>> = Conduit (Constant)",
    "<<5>> = 0.12 MaxStat + 1.26 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
