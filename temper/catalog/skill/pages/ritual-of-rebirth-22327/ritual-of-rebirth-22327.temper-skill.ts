import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ritualOfRebirth22327 = {
  id: "019e6f53-a65e-7c19-b750-dad22afd730f",
  type: "page-type/temper-skill",
  slug: "ritual-of-rebirth-22327",
  title: "Ritual of Rebirth",
  key: "ritual-of-rebirth-22327",
  baseName: "Healing Ritual",
  description:
    "Focus your spiritual devotion, healing you and nearby allies for |cffffff8219|r Health.\n\nYou heal a single ally outside this ability's radius for an additional |cffffff8489|r Health.",
  icon: "/esoui/art/icons/ability_templar_ritual_of_rebirth.dds",
  esoSkillId: 22327,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/templar-restoring-light",
  skillType: "temper-skill-type/active",
  hashPlace: 1079,
  createdAt: "2026-05-28T16:03:33.598Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.116213 MaxStat + 1.22023 MaxPower (Ultimate, ratio = 10.50, Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.116213 MaxStat + 1.22023 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
