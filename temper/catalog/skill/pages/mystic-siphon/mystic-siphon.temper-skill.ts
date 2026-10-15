import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const mysticSiphon = {
  id: "019e6245-a6d5-7eb0-a171-5fdef3a8feb5",
  type: "page-type/temper-skill",
  slug: "mystic-siphon",
  title: "Mystic Siphon",
  key: "mystic-siphon",
  baseName: "Shocking Siphon",
  description:
    "Violently drain the last spark of life from a corpse, dealing 6180 Shock Damage over 20 seconds to all enemies around the corpse and between you and the corpse. You also gain Major Savagery and Prophecy for 20 seconds, increasing your Weapon and Spell Critical rating by 2629.\n\nWhile siphoning the corpse you gain 150 Health, Magicka, and Stamina Recovery.\n\nWhile slotted, your damage done is increased by 3%.",
  icon: "/esoui/art/icons/ability_necromancer_005_a.dds",
  esoSkillId: 40118008,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 845,
  createdAt: "2026-05-26T03:13:12.405Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.009182 MaxStat + 0.096413 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, AOE, DOT, 19.333s duration, 0.666s tick, R2 = 1)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = Major Savagery (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 12% (Constant)",
    "<<6>> = 150 (Constant)",
    "<<7>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
