import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedMendingIncantation = {
  id: "019e668d-c558-7ef5-9029-06c6a047be67",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-mending-incantation",
  key: "shared-mending-incantation",
  title: "Mending Incantation",
  icon: "/esoui/art/icons/ability_companion_restorationstaff_003.dds",
  description:
    "Your Companion slams their staff down to activate its blessings, healing themselves and allies in front of them for $1 Health. The blessing also grants 7000 Spell and Physical Resistance for $$2 seconds.",
  companionId: "all",
  abilityId: 153467,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  validRoles: ["healer", "tank", "support"],
  tags: ["cone-aoe"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
