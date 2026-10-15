import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const secludedGrove = {
  id: "019e6f53-a6d2-7002-bfef-1f872ffcf086",
  type: "page-type/temper-skill",
  slug: "secluded-grove",
  title: "Secluded Grove",
  key: "secluded-grove",
  baseName: "Secluded Grove",
  description:
    "Swell a healing forest at the target location, instantly healing the most injured friendly target for |cffffff8767|r Health. The forest continues to heal you and your allies in the area for |cffffff2921|r Health every |cffffff1|r second for |cffffff6|r seconds.",
  icon: "/esoui/art/icons/ability_warden_012.dds",
  esoSkillId: 85532,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/warden-green-balance",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1146,
  createdAt: "2026-05-28T16:03:33.714Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.12 MaxStat + 1.26 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.04 MaxStat + 0.42 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, 1s tick, R2 = 1)",
    "<<3>> = 1 second (Constant)",
    "<<4>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
