import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const revivingBarrier = {
  id: "019e6251-4ce1-7ac2-8a38-27f0881707be",
  type: "page-type/temper-skill",
  slug: "reviving-barrier",
  title: "Reviving Barrier",
  key: "reviving-barrier",
  baseName: "Barrier",
  description:
    "Invoke defensive tactics to protect yourself and nearby group members with wards that each absorb up to 11620 damage for 30 seconds.\n\nThe wards also heal you and your group members for 5370 Health over 15 seconds.",
  icon: "/esoui/art/icons/ability_ava_006_b.dds",
  esoSkillId: 46614,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1071,
  createdAt: "2026-05-26T03:25:55.809Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.5165 MaxStat + 5.42325 MaxPower (Ultimate, ratio = 10.50, DmgShield, SingleTarget, Direct, 30s duration, R2 = 1)",
    "<<2>> = 30 seconds (Constant)",
    "<<3>> = 0.0161685 MaxStat + 0.167942 MaxPower - 3.95945 (Ultimate, ratio = 10.39, Heal, SingleTarget, DOT, 14s duration, 1s tick, R2 = 0.999997)",
    "<<4>> = 15 seconds (Constant)",
  ],
} as const satisfies TemperSkill
