import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const frozenDevice86179 = {
  id: "019e6f53-a254-75a5-8b28-822beddd9673",
  type: "page-type/temper-skill",
  slug: "frozen-device-86179",
  title: "Frozen Device",
  key: "frozen-device-86179",
  baseName: "Frozen Gate",
  description:
    "Summon an ancient portal, which arms after |cffffff1.5|r seconds.\n\nWhen triggered the enemy is teleported to you if within range, immobilized for |cffffff3|r seconds, dealt |cffffff6257|r Frost Damage, and afflicted with Major Maim, reducing their damage done by |cffffff10|r% for |cffffff4|r seconds.\n\nYou can have up to |cffffff3|r Frozen Devices active at a time.",
  icon: "/esoui/art/icons/ability_warden_005_a.dds",
  esoSkillId: 86179,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 547,
  createdAt: "2026-05-28T16:03:32.564Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 15 seconds (Constant)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 0.0774957 MaxStat + 0.813678 MaxPower - 1.85443 (Ultimate, ratio = 10.50, Dmg, Frost, SingleTarget, Direct, Melee, R2 = 1)",
    "<<4>> = 10% (Constant)",
    "<<5>> = 4 seconds (Constant)",
    "<<6>> = 3 Frozen (Constant)",
    "<<7>> = Device (Constant)",
  ],
} as const satisfies TemperSkill
