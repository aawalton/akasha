import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriGhostlyEvasion = {
  id: "019e6484-387f-7663-9a4d-31447aeda194",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-ghostly-evasion",
  key: "mirri-ghostly-evasion",
  title: "Ghostly Evasion",
  icon: "/esoui/art/icons/ability_companion_nightblade_009.dds",
  description:
    "Your Companion surrounds themselves in a phantasmic aura, dodging the next attack made against them while also reducing their damage taken by 20% for $$2 seconds.",
  companionId: "mirri",
  abilityId: 157197,
  skillLineId: "companion-mirri-living-shade",
  skillType: "active",
  validRoles: ["tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
