import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vigor = {
  id: "019e6f53-a9c4-76c6-8322-fe0d48b51c66",
  type: "page-type/temper-skill",
  slug: "vigor",
  title: "Vigor",
  key: "vigor",
  baseName: "Vigor",
  description:
    "Let loose a battle cry, instilling yourself and nearby allies with resolve and healing them for |cffffff10950|r Health over |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_ava_vigor.dds",
  esoSkillId: 61503,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 1598,
  createdAt: "2026-05-28T16:03:34.468Z",
  updatedAt: "2026-10-21T06:45:07.406Z",
  equations: [
    "<<1>> = 0.02573 MaxStat + 0.270165 MaxPower (Ultimate, RankMod(1), Heal, AOE, DOT, 10s duration, 2s tick, ticks on application)",
    "<<2>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
