import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rend = {
  id: "019e6226-010c-7531-90ff-eadbdd8ebe2c",
  type: "page-type/temper-skill",
  slug: "rend",
  title: "Rend",
  key: "rend",
  baseName: "Lacerate",
  description:
    "Slash enemies in front of you, causing them to bleed for 12942 Bleed Damage over 16 seconds and healing you for 50% of the damage done.\n\nEach tick applies the Hemorrhaging status effect.",
  icon: "/esoui/art/icons/ability_dualwield_006_a.dds",
  esoSkillId: 86393,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-dual-wield",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1020,
  createdAt: "2026-05-26T02:38:38.348Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0640613 MaxStat + 0.672578 MaxPower - 3.1811 (Ultimate, ratio = 10.50, Dmg, Bleed, SingleTarget, DOT, 16s duration, 2s tick, R2 = 0.999999)",
    "<<2>> = 16 seconds (Constant)",
    "<<3>> = 50% (Constant)",
    "<<4>> = Hemorrhaging (Constant)",
  ],
} as const satisfies TemperSkill
