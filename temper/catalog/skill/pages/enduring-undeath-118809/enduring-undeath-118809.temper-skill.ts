import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const enduringUndeath118809 = {
  id: "019e6f53-a181-7e44-83da-3eded33842f1",
  type: "page-type/temper-skill",
  slug: "enduring-undeath-118809",
  title: "Enduring Undeath",
  key: "enduring-undeath-118809",
  baseName: "Life amid Death",
  description:
    "Release residual fragments of fallen souls at the target location, healing you and your allies for |cffffff7547|r Health.\n\nConsumes a corpse on cast to continue to heal you and your allies in the area for |cffffff7540|r Health over |cffffff5|r seconds. You can consume up to |cffffff5|r additional corpses on cast, with each corpse extending the duration of the heal over time by |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_necromancer_016_b.dds",
  esoSkillId: 118809,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 438,
  createdAt: "2026-05-28T16:03:32.353Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, R2 = 1)",
    "<<2>> = 0.02066 MaxStat + 0.21693 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, DOT, 4s duration, 1s tick, R2 = 1)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
