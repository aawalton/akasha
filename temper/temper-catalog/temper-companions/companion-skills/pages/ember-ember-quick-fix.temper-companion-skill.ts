import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberQuickFix = {
  id: "019e6484-385e-7e59-ad59-ee3e62563dae",
  pageTypeSlug: "temper-companion-skill",
  slug: "ember-ember-quick-fix",
  key: "ember-quick-fix",
  title: "Quick Fix",
  icon: "/esoui/art/icons/ability_companion_sorcerer_quickfix.dds",
  description:
    "Your Companion patches themselves or an ally with restorative magic, healing for $1 Health.",
  companionId: "ember",
  abilityId: 166018,
  skillLineId: "companion-ember-playful-schemer",
  skillType: "active",
  validRoles: ["healer", "tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
