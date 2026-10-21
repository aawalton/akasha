import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const revivingBarrier40237 = {
  id: "019e6f53-a64f-78e5-8c35-a8783ad7c4f9",
  type: "page-type/temper-skill",
  slug: "reviving-barrier-40237",
  title: "Reviving Barrier",
  key: "reviving-barrier-40237",
  baseName: "Barrier",
  description:
    "Invoke defensive tactics to protect yourself and nearby group members with wards that each absorb up to |cffffff41192|r damage for |cffffff30|r seconds.\n\nThe wards also heal you and your group members for |cffffff16965|r Health over |cffffff15|r seconds.",
  icon: "/esoui/art/icons/ability_ava_006_b.dds",
  esoSkillId: 40237,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 6,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1072,
  createdAt: "2026-05-28T16:03:33.583Z",
  updatedAt: "2026-10-21T06:45:07.406Z",
  equations: [
    "<<1>> = 0.5165 MaxStat + 5.42325 MaxPower (Ultimate, ratio = 10.50, DmgShield, SingleTarget, Direct, 30s duration, R2 = 1)",
    "<<2>> = 30 seconds (Constant)",
    "<<3>> = 0.01598 MaxStat + 0.16779 MaxPower (Ultimate, Heal, SingleTarget, DOT, 15s duration, 1s tick, own duration)",
    "<<4>> = 15 seconds (Constant)",
  ],
} as const satisfies TemperSkill
