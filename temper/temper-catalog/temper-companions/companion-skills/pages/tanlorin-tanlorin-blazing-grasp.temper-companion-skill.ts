import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinBlazingGrasp = {
  id: "019e6484-38a1-7344-ba89-c44e4c636b4e",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-blazing-grasp",
  key: "tanlorin-blazing-grasp",
  title: "Blazing Grasp",
  icon: "/esoui/art/icons/ability_companion_dragonknight_005.dds",
  description:
    "Your Companion launches a fiery chain to grasp and pull an enemy to them, taunting them for $$2 seconds if they are not already taunted.",
  companionId: "tanlorin",
  abilityId: 153839,
  skillLineId: "companion-tanlorin-draconic-armor",
  skillType: "active",
  validRoles: ["tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
