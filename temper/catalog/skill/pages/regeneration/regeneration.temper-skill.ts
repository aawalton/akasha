import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const regeneration = {
  id: "019e6f53-a5df-77e1-9f93-65f0c0f89f45",
  type: "page-type/temper-skill",
  slug: "regeneration",
  title: "Regeneration",
  key: "regeneration",
  baseName: "Regeneration",
  description:
    "Share your staff's life-giving energy, healing you or a nearby ally for |cffffff10950|r Health over |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_restorationstaff_002.dds",
  esoSkillId: 28536,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 1010,
  createdAt: "2026-05-28T16:03:33.471Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.025 MaxStat + 0.2625 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, DOT, 10s duration, 2s tick, R2 = 1)",
    "<<2>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
