import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const enduringUndeath = {
  id: "019e6245-a66b-72e4-92ac-da634a430b83",
  type: "page-type/temper-skill",
  slug: "enduring-undeath",
  title: "Enduring Undeath",
  key: "enduring-undeath",
  baseName: "Life amid Death",
  description:
    "Release residual fragments of fallen souls at the target location, healing you and your allies for 2399 Health.\n\nConsumes a corpse on cast to continue to heal you and your allies in the area for 2390 Health over 5 seconds. You can consume up to 5 additional corpses on cast, with each corpse extending the duration of the heal over time by 5 seconds.",
  icon: "/esoui/art/icons/ability_necromancer_016_b.dds",
  esoSkillId: 40118809,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 437,
  createdAt: "2026-05-26T03:13:12.299Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1067089 MaxStat + 1.12044345 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.02134178 MaxStat + 0.22408869 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, DOT, 4s duration, 1s tick, R2 = 1)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
