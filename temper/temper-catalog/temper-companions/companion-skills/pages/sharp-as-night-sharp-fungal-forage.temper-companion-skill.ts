import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpFungalForage = {
  id: "019e6484-3895-7eac-b2bb-26d58c51bdc7",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-fungal-forage",
  key: "sharp-fungal-forage",
  title: "Fungal Forage",
  icon: "/esoui/art/icons/ability_companion_warden_fungalgrowth.dds",
  description:
    "Your Companion musters a cluster of mushrooms, healing you and your allies for $1 Health. Heals for 50% more on allies that are within 8 meters of Your Companion.",
  companionId: "sharp-as-night",
  abilityId: 186598,
  skillLineId: "companion-sharp-as-night-verdant-growth",
  skillType: "active",
  validRoles: ["healer"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
