import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const energyOrb = {
  id: "019e6238-c2b8-730a-bd80-67b03c978f7a",
  type: "page-type/temper-skill",
  slug: "energy-orb",
  title: "Energy Orb",
  key: "energy-orb",
  baseName: "Necrotic Orb",
  description:
    "Project a globe of regeneration that slowly floats forward, healing for 489 Health every 1 second to you and nearby allies.\n\nAn ally near the globe can activate the Healing Combustion synergy, causing the orb to explode and heal for 2249 Health to nearby allies and restoring 3960 Magicka or Stamina to the activator, whichever maximum is higher.",
  icon: "/esoui/art/icons/ability_undaunted_004b.dds",
  esoSkillId: 43447,
  isMorph: true,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/guild-undaunted",
  skillType: "temper-skill-type/active",
  hashPlace: 441,
  createdAt: "2026-05-26T02:59:07.576Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0218837 MaxStat + 0.229463 MaxPower - 2.97345 (Ultimate, ratio = 10.49, Heal, AOE, Direct, 1s tick, R2 = 0.999994)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = Healing Combustion (Constant)",
    "<<4>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, Heal, AOE, Direct, R2 = 1)",
    "<<5>> = 3960 (Constant)",
  ],
} as const satisfies TemperSkill
