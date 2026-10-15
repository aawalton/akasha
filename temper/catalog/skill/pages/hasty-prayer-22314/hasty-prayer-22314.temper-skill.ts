import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hastyPrayer22314 = {
  id: "019e6f53-a2d5-7ba2-9aed-8369a18cc24b",
  type: "page-type/temper-skill",
  slug: "hasty-prayer-22314",
  title: "Hasty Prayer",
  key: "hasty-prayer-22314",
  baseName: "Healing Ritual",
  description:
    "Focus your spiritual devotion, healing you and nearby allies for |cffffff8219|r Health.\n\nAffected targets gain Minor Expedition, increasing their Movement Speed by |cffffff15|r% for |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_templar_lingering_ritual.dds",
  esoSkillId: 22314,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 596,
  createdAt: "2026-05-28T16:03:32.693Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.116213 MaxStat + 1.22023 MaxPower (Ultimate, ratio = 10.50, Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 15% (Constant)",
    "<<3>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
