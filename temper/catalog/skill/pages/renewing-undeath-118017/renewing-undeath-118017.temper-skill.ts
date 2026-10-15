import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const renewingUndeath118017 = {
  id: "019e6f53-a601-716e-9b5c-ff0fe8b04326",
  type: "page-type/temper-skill",
  slug: "renewing-undeath-118017",
  title: "Renewing Undeath",
  key: "renewing-undeath-118017",
  baseName: "Life amid Death",
  description:
    "Release residual fragments of fallen souls at the target location, healing you and your allies for |cffffff7547|r Health.\n\nConsumes a corpse on cast to immediately remove up to |cffffff3|r negative effects and continue to heal you and your allies in the area for |cffffff7540|r Health over |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_necromancer_016_a.dds",
  esoSkillId: 118017,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 1028,
  createdAt: "2026-05-28T16:03:33.505Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.02066 MaxStat + 0.21693 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, DOT, 4s duration, 1s tick, R2 = 1)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
