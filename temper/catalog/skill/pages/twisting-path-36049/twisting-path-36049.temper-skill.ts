import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const twistingPath36049 = {
  id: "019e6f53-a871-7b0c-b37f-5ae9f605e60d",
  type: "page-type/temper-skill",
  slug: "twisting-path-36049",
  title: "Twisting Path",
  key: "twisting-path-36049",
  baseName: "Path of Darkness",
  description:
    "Create a corridor of shadows for |cffffff10|r seconds, granting you and allies in the area Major Expedition, increasing Movement Speed by |cffffff30|r% which persists for |cffffff4|r seconds after leaving the path.\n\nDeals |cffffff1313|r Magic Damage to enemies in the target area every |cffffff1|r second.",
  icon: "/esoui/art/icons/ability_nightblade_010_b.dds",
  esoSkillId: 36049,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/active",
  hashPlace: 1375,
  createdAt: "2026-05-28T16:03:34.129Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 10 seconds (Constant)",
    "<<2>> = 30% (Constant)",
    "<<3>> = 4 seconds (Constant)",
    "<<4>> = 0.0162307 MaxStat + 0.171281 MaxPower - 0.899047 (Ultimate, ratio = 10.55, Dmg, Magic, AOE, DOT, 1s tick, R2 = 0.999997)",
    "<<5>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
