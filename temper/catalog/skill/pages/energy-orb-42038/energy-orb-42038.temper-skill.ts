import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const energyOrb42038 = {
  id: "019e6f53-a18a-7edf-a3fa-f5636b423844",
  type: "page-type/temper-skill",
  slug: "energy-orb-42038",
  title: "Energy Orb",
  key: "energy-orb-42038",
  baseName: "Necrotic Orb",
  description:
    "Project a globe of regeneration that slowly floats forward, healing for |cffffff1542|r Health every |cffffff1|r second to you and nearby allies.\n\nAn ally near the globe can activate the Healing Combustion synergy, causing the orb to explode and heal for |cffffff7073|r Health to nearby allies and restoring |cffffff3960|r Magicka or Stamina to the activator, whichever maximum is higher.",
  icon: "/esoui/art/icons/ability_undaunted_004b.dds",
  esoSkillId: 42038,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 2,
  rank: 5,
  skillLineId: "temper-skill-line/guild-undaunted",
  skillType: "temper-skill-type/active",
  hashPlace: 442,
  createdAt: "2026-05-28T16:03:32.362Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0211209 MaxStat + 0.222227 MaxPower - 1.7093 (Ultimate, ratio = 10.52, Heal, AOE, Direct, 1s tick, R2 = 0.999996)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = Healing Combustion (Constant)",
    "<<4>> = 0.1 MaxStat + 1.05 MaxPower (Ultimate, ratio = 10.50, Heal, AOE, Direct, R2 = 1)",
    "<<5>> = 3960 (Constant)",
  ],
} as const satisfies TemperSkill
