import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const mortalCoil = {
  id: "019e6245-a6d3-7b9e-ae16-1a5fac6d5651",
  type: "page-type/temper-skill",
  slug: "mortal-coil",
  title: "Mortal Coil",
  key: "mortal-coil",
  baseName: "Restoring Tether",
  description:
    "Siphon the last remnants of life from a corpse, healing for 5562 Health over 12 seconds to yourself and all allies between you and the corpse.  \n\nYou also restore 170 Magicka and Stamina every 2 seconds while siphoning the corpse.\n\nWhile slotted, your healing done is increased by 3%.",
  icon: "/esoui/art/icons/ability_necromancer_017_b.dds",
  esoSkillId: 40118122,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-living-death",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 838,
  createdAt: "2026-05-26T03:13:12.403Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.013773 MaxStat + 0.14462 MaxPower (Ultimate, ratio = 10.50, Heal, AOE, DOT, 11.334s duration, 0.666s tick, R2 = 1)",
    "<<2>> = 12 seconds (Constant)",
    "<<3>> = 170 (Constant)",
    "<<4>> = 2 seconds (Constant)",
    "<<5>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
