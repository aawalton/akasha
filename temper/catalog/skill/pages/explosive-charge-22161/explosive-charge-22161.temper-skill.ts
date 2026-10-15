import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const explosiveCharge22161 = {
  id: "019e6f53-a1d0-7849-81b7-4674bd7a3a10",
  type: "page-type/temper-skill",
  slug: "explosive-charge-22161",
  title: "Explosive Charge",
  key: "explosive-charge-22161",
  baseName: "Focused Charge",
  description:
    "Charge with your divine lance to impale all enemies in the area, dealing |cffffff6611|r Magic Damage while taunting the first enemy hit to attack you for |cffffff15|r seconds. Any enemy hit that was casting is interrupted, set Off Balance, and stunned for |cffffff3|r seconds.\n\n You also gain Major Protection for |cffffff15|r seconds, reducing your damage taken by |cffffff10|r%.",
  icon: "/esoui/art/icons/ability_templar_double_tipped_charge.dds",
  esoSkillId: 22161,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 487,
  createdAt: "2026-05-28T16:03:32.432Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 15 seconds (Constant)",
    "<<3>> = 3 seconds (Constant)",
    "<<4>> = Major Protection (Constant)",
    "<<5>> = 15 seconds (Constant)",
    "<<6>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
