import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedTrickShot = {
  id: "019e668d-c54f-7900-a1d1-ec06fa221392",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-trick-shot",
  key: "shared-trick-shot",
  title: "Trick Shot",
  icon: "/esoui/art/icons/ability_companion_bow_005.dds",
  description:
    "Your Companion fires a burst of arrows to pin enemies in front of them, dealing $1 Physical Damage and immobilizing them for $$2 seconds.",
  companionId: "all",
  abilityId: 152701,
  skillLineId: "weapon-bow",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
