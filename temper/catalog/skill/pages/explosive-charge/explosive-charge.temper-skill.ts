import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const explosiveCharge = {
  id: "019e6245-a67d-701c-9c91-8f2baf789c91",
  type: "page-type/temper-skill",
  slug: "explosive-charge",
  title: "Explosive Charge",
  key: "explosive-charge",
  baseName: "Focused Charge",
  description:
    "Charge with your divine lance to impale all enemies in the area, dealing 1799 Magic Damage while taunting the first enemy hit to attack you for 15 seconds. Any enemy hit that was casting is interrupted, set Off Balance, and stunned for 3 seconds.\n\n You also gain Major Protection for 15 seconds, reducing your damage taken by 10%.",
  icon: "/esoui/art/icons/ability_templar_double_tipped_charge.dds",
  esoSkillId: 23726,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 486,
  createdAt: "2026-05-26T03:13:12.317Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.080031675 MaxStat + 0.840333104 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 15 seconds (Constant)",
    "<<3>> = 3 seconds (Constant)",
    "<<4>> = Major Protection (Constant)",
    "<<5>> = 15 seconds (Constant)",
    "<<6>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
