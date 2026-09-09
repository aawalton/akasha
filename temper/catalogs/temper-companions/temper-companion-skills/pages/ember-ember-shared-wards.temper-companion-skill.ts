import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const emberEmberSharedWards = {
  id: "019e6484-3863-79ea-ba1a-bcd91761da8a",
  pageTypeSlug: "temper-companion-skill",
  slug: "ember-ember-shared-wards",
  key: "ember-shared-wards",
  title: "Shared Wards",
  icon: "/esoui/art/icons/ability_companion_sorcerer_hurricane.dds",
  description:
    "Your Companion conjures wards made of energy for protection, granting a damage shield for them and their nearby allies that absorbs $1 damage for $$1 seconds. Targets affected by the shield are also healed for $2 Health over $$2 seconds.",
  companionId: "ember",
  abilityId: 166069,
  skillLineId: "companion-ember-playful-schemer",
  skillType: "active",
  validRoles: ["healer"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
