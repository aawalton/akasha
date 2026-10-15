import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const runicSunder = {
  id: "019e6245-a71f-72e5-8c96-b1a7ebd13b1c",
  type: "page-type/temper-skill",
  slug: "runic-sunder",
  title: "Runic Sunder",
  key: "runic-sunder",
  baseName: "Runic Jolt",
  description:
    "Craft a defensive Apocryphal rune that deals 1161 Physical Damage. The rune steals 2200 Armor and applies Minor Maim for 15 seconds, reducing their damage done by 5%.\n\nThe rune also taunts for 15 seconds if it would not cause taunt immunity, and generates Crux. While slotted, damage taken is reduced by 2% per active Crux.",
  icon: "/esoui/art/icons/ability_arcanist_007_a.dds",
  esoSkillId: 40183430,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 1116,
  createdAt: "2026-05-26T03:13:12.479Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 2200 (Constant)",
    "<<3>> = Minor Maim (Constant)",
    "<<4>> = 15 seconds (Constant)",
    "<<5>> = 5% (Constant)",
    "<<6>> = 15 seconds (Constant)",
    "<<7>> = 2% (Constant)",
  ],
} as const satisfies TemperSkill
