import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const twistingPath = {
  id: "019e6245-a756-7bb3-9f8d-8cb0d85290b4",
  type: "page-type/temper-skill",
  slug: "twisting-path",
  title: "Twisting Path",
  key: "twisting-path",
  baseName: "Path of Darkness",
  description:
    "Create a corridor of shadows for 10 seconds, granting you and allies in the area Major Expedition, increasing Movement Speed by 30% which persists for 4 seconds after leaving the path.\n\nDeals 377 Magic Damage to enemies in the target area every 1 second.",
  icon: "/esoui/art/icons/ability_nightblade_010_b.dds",
  esoSkillId: 37796,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/active",
  hashPlace: 1374,
  createdAt: "2026-05-26T03:13:12.534Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 10 seconds (Constant)",
    "<<2>> = 30% (Constant)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = 0.0167904 MaxStat + 0.176497 MaxPower - 0.858983 (Ultimate, ratio = 10.51, Dmg, Magic, AOE, DOT, 1s tick, R2 = 0.999992)",
    "<<5>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
