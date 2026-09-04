import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpPerennialBloom = {
  id: "019e6484-389a-7844-81b6-ab0e6c0b23e5",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-perennial-bloom",
  key: "sharp-perennial-bloom",
  title: "Perennial Bloom",
  icon: "/esoui/art/icons/ability_companion_warden_healingseed.dds",
  description:
    "Your Companion summons a field of blooming flowers, healing you and nearby allies for $1 Health every 2 seconds over $$1 seconds.",
  companionId: "sharp-as-night",
  abilityId: 186602,
  skillLineId: "companion-sharp-as-night-verdant-growth",
  skillType: "active",
  validRoles: ["healer"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
