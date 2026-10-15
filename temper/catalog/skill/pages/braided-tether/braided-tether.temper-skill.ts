import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const braidedTether = {
  id: "019e6245-a605-7df1-9f8d-5535b4a2a704",
  type: "page-type/temper-skill",
  slug: "braided-tether",
  title: "Braided Tether",
  key: "braided-tether",
  baseName: "Restoring Tether",
  description:
    "Siphon the last remnants of life from a corpse, healing for 5742 Health over 12 seconds to yourself, all allies around you, and all allies between you and the corpse. \n\nWhile slotted, your healing done is increased by 3%.",
  icon: "/esoui/art/icons/ability_necromancer_017_a.dds",
  esoSkillId: 40118070,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 160,
  createdAt: "2026-05-26T03:13:12.197Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.014227509 MaxStat + 0.14939246 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, AOE, DOT, 11.334s duration, 0.666s tick, R2 = 1)",
    "<<2>> = 12 seconds (Constant)",
    "<<3>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
