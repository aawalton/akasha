import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const healingRitual = {
  id: "019e6f53-a2e1-7019-bca6-a60f27b28a00",
  type: "page-type/temper-skill",
  slug: "healing-ritual",
  title: "Healing Ritual",
  key: "healing-ritual",
  baseName: "Healing Ritual",
  description:
    "Focus your spiritual devotion, healing you and nearby allies for |cffffff8220|r Health.",
  icon: "/esoui/art/icons/ability_templar_healing_ritual.dds",
  esoSkillId: 22304,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 603,
  createdAt: "2026-05-28T16:03:32.705Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1125 MaxStat + 1.18125 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
