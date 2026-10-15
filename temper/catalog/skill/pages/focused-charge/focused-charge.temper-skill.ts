import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const focusedCharge = {
  id: "019e6f53-a21f-7c03-b011-bbc4c94c98a8",
  type: "page-type/temper-skill",
  slug: "focused-charge",
  title: "Focused Charge",
  key: "focused-charge",
  baseName: "Focused Charge",
  description:
    "Charge with your divine lance to impale an enemy, dealing |cffffff4846|r Magic Damage while taunting them to attack you for |cffffff15|r seconds. If the enemy hit was casting, they are interrupted, set Off Balance, and stunned for |cffffff3|r seconds.\n\nYou also gain Major Protection for |cffffff7|r seconds, reducing your damage taken by |cffffff10|r%.",
  icon: "/esoui/art/icons/ability_templar_focused_charge.dds",
  esoSkillId: 22149,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 528,
  createdAt: "2026-05-28T16:03:32.511Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06 MaxStat + 0.63 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 15 seconds (Constant)",
    "<<3>> = 3 seconds (Constant)",
    "<<4>> = Major Protection (Constant)",
    "<<5>> = 7 seconds (Constant)",
    "<<6>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
