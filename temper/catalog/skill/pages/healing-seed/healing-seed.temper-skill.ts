import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const healingSeed = {
  id: "019e6f53-a2e2-752b-aa35-8c4aec629788",
  type: "page-type/temper-skill",
  slug: "healing-seed",
  title: "Healing Seed",
  key: "healing-seed",
  baseName: "Healing Seed",
  description:
    "Summon a field of flowers which blooms after |cffffff6|r seconds, healing you and allies in the area for |cffffff10960|r Health.\n\nAn ally within the field can activate the Harvest synergy, healing for |cffffff10602|r Health over |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_warden_007.dds",
  esoSkillId: 85578,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/active",
  hashPlace: 604,
  createdAt: "2026-05-28T16:03:32.706Z",
  updatedAt: "2026-10-21T16:15:00.968Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 0.15 MaxStat + 1.575 MaxPower (Ultimate, Heal, AOE, Direct, rank IV)",
    "<<3>> = Harvest (Constant)",
    "<<4>> = 0.025 MaxStat + 0.2625 MaxPower (Ultimate, Heal, SingleTarget, DOT, 5s duration, 1s tick, ticks on application, own duration, Synergy)",
    "<<5>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
