import type { TemperCompanionSkill } from "akasha/temper/catalog/temper-companions/temper-companion-skills/temper-companion-skill.page-type.types.ts"

export const allSharedVanish = {
  id: "019e6484-3833-71ac-8a70-d0f4721f424b",
  type: "temper-companion-skill",
  slug: "all-shared-vanish",
  key: "shared-vanish",
  title: "Vanish",
  icon: "/esoui/art/icons/ability_companion_armor_medium.dds",
  description:
    "Your Companion disappears in a puff of smoke, healing to full Health and becoming invisible for $$2 seconds.",
  companionId: "all",
  abilityId: 156596,
  skillLineId: "armor-medium",
  skillType: "active",
  validRoles: ["tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
