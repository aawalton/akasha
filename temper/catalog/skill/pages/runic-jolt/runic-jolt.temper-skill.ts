import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const runicJolt = {
  id: "019e6f53-a69a-7fd2-b012-24afd4b44610",
  type: "page-type/temper-skill",
  slug: "runic-jolt",
  title: "Runic Jolt",
  key: "runic-jolt",
  baseName: "Runic Jolt",
  description:
    "Craft a defensive Apocryphal rune that deals |cffffff4036|r Magic Damage and applies Minor Maim for |cffffff15|r seconds, reducing their damage done by |cffffff5|r%.\n\nThe rune also taunts for |cffffff15|r seconds if it would not cause taunt immunity, and generates Crux. While slotted, damage taken is reduced by |cffffff2|r% per active Crux.",
  icon: "/esoui/art/icons/ability_arcanist_007.dds",
  esoSkillId: 183165,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 1115,
  createdAt: "2026-05-28T16:03:33.658Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05 MaxStat + 0.525 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = Minor Maim (Constant)",
    "<<3>> = 15 seconds (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 15 seconds (Constant)",
    "<<6>> = 2% (Constant)",
  ],
} as const satisfies TemperSkill
