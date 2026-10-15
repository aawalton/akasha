import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const topplingCharge15540 = {
  id: "019e6f53-a84a-7e0f-8147-c1445fb4d5b7",
  type: "page-type/temper-skill",
  slug: "toppling-charge-15540",
  title: "Toppling Charge",
  key: "toppling-charge-15540",
  baseName: "Focused Charge",
  description:
    "Charge with your divine lance to impale an enemy, dealing |cffffff4845|r Magic Damage while taunting them to attack you for |cffffff15|r seconds. The enemy hit is stunned for |cffffff3|r seconds, set Off Balance, and if they were casting, they are interrupted.\n\nYou also gain Major Protection for |cffffff7|r seconds, reducing your damage taken by |cffffff10|r%.",
  icon: "/esoui/art/icons/ability_templar_toppling_charge.dds",
  esoSkillId: 15540,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 1353,
  createdAt: "2026-05-28T16:03:34.090Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06198 MaxStat + 0.65079 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 15 seconds (Constant)",
    "<<3>> = 3 seconds (Constant)",
    "<<4>> = Major Protection (Constant)",
    "<<5>> = 7 seconds (Constant)",
    "<<6>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
