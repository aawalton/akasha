import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const renewingUndeath = {
  id: "019e6245-a70b-7923-9f58-a4af38ff5953",
  type: "page-type/temper-skill",
  slug: "renewing-undeath",
  title: "Renewing Undeath",
  key: "renewing-undeath",
  baseName: "Life amid Death",
  description:
    "Release residual fragments of fallen souls at the target location, healing you and your allies for 2399 Health.\n\nConsumes a corpse on cast to immediately remove up to 3 negative effects and continue to heal you and your allies in the area for 2390 Health over 5 seconds.",
  icon: "/esoui/art/icons/ability_necromancer_016_a.dds",
  esoSkillId: 40118017,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 1027,
  createdAt: "2026-05-26T03:13:12.459Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1067089 MaxStat + 1.12044345 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.02134178 MaxStat + 0.22408869 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, DOT, 4s duration, 1s tick, R2 = 1)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
