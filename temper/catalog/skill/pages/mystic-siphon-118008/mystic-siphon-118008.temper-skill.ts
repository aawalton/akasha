import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const mysticSiphon118008 = {
  id: "019e6f53-a4ab-7955-9d72-71142742e981",
  type: "page-type/temper-skill",
  slug: "mystic-siphon-118008",
  title: "Mystic Siphon",
  key: "mystic-siphon-118008",
  baseName: "Shocking Siphon",
  description:
    "Violently drain the last spark of life from a corpse, dealing |cffffff21510|r Shock Damage over |cffffff20|r seconds to all enemies around the corpse and between you and the corpse. You also gain Major Savagery and Prophecy for |cffffff20|r seconds, increasing your Weapon and Spell Critical rating by |cffffff2629|r.\n\nWhile siphoning the corpse you gain |cffffff150|r Health, Magicka, and Stamina Recovery.\n\nWhile slotted, your damage done is increased by |cffffff3|r%.",
  icon: "/esoui/art/icons/ability_necromancer_005_a.dds",
  esoSkillId: 118008,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  hashPlace: 846,
  createdAt: "2026-05-28T16:03:33.163Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.009182 MaxStat + 0.096413 MaxPower (Ultimate, ratio = 10.50, Dmg, Shock, AOE, DOT, 19.333s duration, 0.666s tick, R2 = 1)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = Major Savagery (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 12% (Constant)",
    "<<6>> = 120 (Constant)",
    "<<7>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
