import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const buddingSeeds85840 = {
  id: "019e6f53-9f96-784b-b2e6-fa757b87100b",
  type: "page-type/temper-skill",
  slug: "budding-seeds-85840",
  title: "Budding Seeds",
  key: "budding-seeds-85840",
  baseName: "Healing Seed",
  description:
    "Summon a field of flowers which blooms after |cffffff6|r seconds, healing you and allies in the area for |cffffff10960|r Health.\n\nWhile the field grows, you and allies are healed for |cffffff1292|r Health every |cffffff1|r second.  \n\nYou can activate this ability again to cause it to instantly bloom.\n\nAn ally within the field can activate the Harvest synergy, healing for |cffffff10602|r Health over |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_warden_007_b.dds",
  esoSkillId: 85840,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 170,
  createdAt: "2026-05-28T16:03:31.862Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 0.154901 MaxStat + 1.62725 MaxPower - 1.10979 (Ultimate, ratio = 10.51, Heal, AOE, Direct, R2 = 1)",
    "<<3>> = 0.0177566 MaxStat + 0.18613 MaxPower - 2.09731 (Ultimate, ratio = 10.48, Heal, AOE, Direct, 1s tick, R2 = 0.999995)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = Harvest (Constant)",
    "<<6>> = 0.025 MaxStat + 0.2625 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, DOT, 5s duration, 1s tick, R2 = 1)",
    "<<7>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
