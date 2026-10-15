import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const restoringTether = {
  id: "019e6f53-a634-7c82-87c8-48a1c66accf4",
  type: "page-type/temper-skill",
  slug: "restoring-tether",
  title: "Restoring Tether",
  key: "restoring-tether",
  baseName: "Restoring Tether",
  description:
    "Siphon the last remnants of life from a corpse, healing for |cffffff17514|r Health over |cffffff12|r seconds to yourself and all allies between you and the corpse. \n\nWhile slotted, your healing done is increased by |cffffff3|r%.",
  icon: "/esoui/art/icons/ability_necromancer_017.dds",
  esoSkillId: 115926,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  hashPlace: 1058,
  createdAt: "2026-05-28T16:03:33.556Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.013333 MaxStat + 0.14 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, DOT, 11.334s duration, 0.666s tick, R2 = 1)",
    "<<2>> = 12 seconds (Constant)",
    "<<3>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
