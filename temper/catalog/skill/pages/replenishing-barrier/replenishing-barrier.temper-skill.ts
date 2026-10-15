import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const replenishingBarrier = {
  id: "019e6251-4cde-7425-99db-785246611405",
  type: "page-type/temper-skill",
  slug: "replenishing-barrier",
  title: "Replenishing Barrier",
  key: "replenishing-barrier",
  baseName: "Barrier",
  description:
    "Invoke defensive tactics to protect yourself and nearby group members with wards that each absorb up to 11620 damage. \n\nEach time a ward dissolves, you restore 1500 Magicka.",
  icon: "/esoui/art/icons/ability_ava_006_a.dds",
  esoSkillId: 46622,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/alliance-war-support",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1031,
  createdAt: "2026-05-26T03:25:55.806Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.5165 MaxStat + 5.42325 MaxPower (Ultimate, ratio = 10.50, DmgShield, SingleTarget, Direct, 30s duration, R2 = 1)",
    "<<2>> = 1500 (Constant)",
  ],
} as const satisfies TemperSkill
