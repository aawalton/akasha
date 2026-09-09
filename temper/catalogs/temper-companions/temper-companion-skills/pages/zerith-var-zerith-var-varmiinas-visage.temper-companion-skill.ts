import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const zerithVarZerithVarVarmiinasVisage = {
  id: "019e6484-38b8-718b-be62-f6e2773e375d",
  pageTypeSlug: "temper-companion-skill",
  slug: "zerith-var-zerith-var-varmiinas-visage",
  key: "zerith-var-varmiinas-visage",
  title: "Varmiina's Visage",
  icon: "/esoui/art/icons/ability_companion_necromancer_flameskull.dds",
  description:
    "Your Companion launches a nightmarish exploding skull at an enemy, dealing $1 Flame Damage.",
  companionId: "zerith-var",
  abilityId: 213157,
  skillLineId: "companion-zerith-var-warriors-banishment",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
