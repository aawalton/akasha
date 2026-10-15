import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const echoingVigor = {
  id: "019e6251-4cab-7fad-be0f-fd157585a0dd",
  type: "page-type/temper-skill",
  slug: "echoing-vigor",
  title: "Echoing Vigor",
  key: "echoing-vigor",
  baseName: "Vigor",
  description:
    "Let loose a battle cry, instilling you and your allies with resolve and healing for 3480 Health over 16 seconds.",
  icon: "/esoui/art/icons/ability_ava_echoing_vigor.dds",
  esoSkillId: 63247,
  isMorph: true,
  learnedLevel: 2,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/alliance-war-assault",
  skillType: "temper-skill-type/active",
  hashPlace: 393,
  createdAt: "2026-05-26T03:25:55.755Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.025825 MaxStat + 0.271163 MaxPower (Ultimate, ratio = 10.50, Heal, AOE, DOT, 10s duration, 2s tick, R2 = 1)",
    "<<2>> = 16 seconds (Constant)",
  ],
} as const satisfies TemperSkill
