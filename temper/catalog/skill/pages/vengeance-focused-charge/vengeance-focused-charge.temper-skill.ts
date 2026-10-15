import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceFocusedCharge = {
  id: "019e6f53-a910-7c8e-a2f1-e172dd1aa376",
  type: "page-type/temper-skill",
  slug: "vengeance-focused-charge",
  title: "Vengeance Focused Charge",
  key: "vengeance-focused-charge",
  baseName: "Vengeance Focused Charge",
  description:
    "Charge with your divine lance to impale an enemy to deal |cffffff6678|r Magic Damage.",
  icon: "/esoui/art/icons/ability_templar_focused_charge.dds",
  esoSkillId: 237883,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 1476,
  createdAt: "2026-05-28T16:03:34.288Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 6300 Magic Damage (Constant)"],
} as const satisfies TemperSkill
