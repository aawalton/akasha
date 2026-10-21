import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const echoingVigor61505 = {
  id: "019e6f53-a102-7bc3-9cb5-de933bdd5c31",
  type: "page-type/temper-skill",
  slug: "echoing-vigor-61505",
  title: "Echoing Vigor",
  key: "echoing-vigor-61505",
  baseName: "Vigor",
  description:
    "Let loose a battle cry, instilling you and your allies with resolve and healing for |cffffff16434|r Health over |cffffff16|r seconds.",
  icon: "/esoui/art/icons/ability_ava_echoing_vigor.dds",
  esoSkillId: 61505,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 394,
  createdAt: "2026-05-28T16:03:32.226Z",
  updatedAt: "2026-10-21T07:12:28.248Z",
  equations: [
    "<<1>> = 0.025821 MaxStat + 0.271153 MaxPower (Ultimate, Heal, AOE, DOT, 10s duration, 2s tick, ticks on application)",
    "<<2>> = 16 seconds (Constant)",
  ],
} as const satisfies TemperSkill
