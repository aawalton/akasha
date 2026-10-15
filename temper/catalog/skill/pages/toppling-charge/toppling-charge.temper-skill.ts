import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const topplingCharge = {
  id: "019e6245-a754-79eb-99b6-c5da083d2381",
  type: "page-type/temper-skill",
  slug: "toppling-charge",
  title: "Toppling Charge",
  key: "toppling-charge",
  baseName: "Focused Charge",
  description:
    "Charge with your divine lance to impale an enemy, dealing 1393 Magic Damage while taunting them to attack you for 15 seconds. The enemy hit is stunned for 3 seconds, set Off Balance, and if they were casting, they are interrupted.\n\nYou also gain Major Protection for 7 seconds, reducing your damage taken by 10%.",
  icon: "/esoui/art/icons/ability_templar_toppling_charge.dds",
  esoSkillId: 23870,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 1352,
  createdAt: "2026-05-26T03:13:12.532Z",
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
