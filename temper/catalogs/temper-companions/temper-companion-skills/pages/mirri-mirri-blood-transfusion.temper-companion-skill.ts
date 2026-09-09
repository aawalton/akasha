import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriBloodTransfusion = {
  id: "019e6484-387c-7710-aeee-ac5010dab342",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-blood-transfusion",
  key: "mirri-blood-transfusion",
  title: "Blood Transfusion",
  icon: "/esoui/art/icons/ability_companion_nightblade_unique.dds",
  description:
    "Your Companion infuses an ally with blood, healing them for $1 Health over $$1 seconds.",
  companionId: "mirri",
  abilityId: 157287,
  skillLineId: "companion-mirri-soul-thief",
  skillType: "active",
  validRoles: ["healer"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
