import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lacerate = {
  id: "019e6f53-a3b8-7f41-809c-c88aac1c7ccc",
  type: "page-type/temper-skill",
  slug: "lacerate",
  title: "Lacerate",
  key: "lacerate",
  baseName: "Lacerate",
  description:
    "Slash enemies in front of you, causing them to bleed for |cffffff22860|r Bleed Damage over |cffffff8|r seconds and healing you for |cffffff51|r% of the damage done.\n\nEach tick applies the Hemorrhaging status effect.",
  icon: "/esoui/art/icons/ability_dualwield_006.dds",
  esoSkillId: 83600,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 50,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 724,
  createdAt: "2026-05-28T16:03:32.920Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.059893 MaxStat + 0.630924 MaxPower - 1.52444 (Ultimate, ratio = 10.53, Dmg, Bleed, SingleTarget, DOT, 8s duration, 2s tick, R2 = 0.999999)",
    "<<2>> = 8 seconds (Constant)",
    "<<3>> = 50% (Constant)",
    "<<4>> = Hemorrhaging (Constant)",
  ],
} as const satisfies TemperSkill
