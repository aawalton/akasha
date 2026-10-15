import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const buddingSeeds = {
  id: "019e6245-a607-7d9d-a649-843bf0020d04",
  type: "page-type/temper-skill",
  slug: "budding-seeds",
  title: "Budding Seeds",
  key: "budding-seeds",
  baseName: "Healing Seed",
  description:
    "Summon a field of flowers which blooms after 6 seconds, healing you and allies in the area for 3485 Health.\n\nWhile the field grows, you and allies are healed for 410 Health every 1 second.  \n\nYou can activate this ability again to cause it to instantly bloom.\n\nAn ally within the field can activate the Harvest synergy, healing for 3372 Health over 5 seconds.",
  icon: "/esoui/art/icons/ability_warden_007_b.dds",
  esoSkillId: 93807,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 169,
  createdAt: "2026-05-26T03:13:12.199Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 0.154901 MaxStat + 1.62725 MaxPower - 1.10979 (Ultimate, ratio = 10.51, Heal, AOE, Direct, R2 = 1)",
    "<<3>> = 0.0183606 MaxStat + 0.192048 MaxPower - 2.35828 (Ultimate, ratio = 10.46, Heal, AOE, Direct, 1s tick, R2 = 0.999988)",
    "<<4>> = 1 second (Constant)",
    "<<5>> = Harvest (Constant)",
    "<<6>> = 0.025 MaxStat + 0.2625 MaxPower (Ultimate, ratio = 10.50, Heal, SingleTarget, DOT, 5s duration, 1s tick, R2 = 1)",
    "<<7>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
