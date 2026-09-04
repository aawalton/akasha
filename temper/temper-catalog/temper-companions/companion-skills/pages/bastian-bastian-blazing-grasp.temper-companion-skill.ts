import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const bastianBastianBlazingGrasp = {
  id: "019e6484-3848-7e12-ba67-dae2c98c1c6b",
  pageTypeSlug: "temper-companion-skill",
  slug: "bastian-bastian-blazing-grasp",
  key: "bastian-blazing-grasp",
  title: "Blazing Grasp",
  icon: "/esoui/art/icons/ability_companion_dragonknight_005.dds",
  description:
    "Your Companion launches a fiery chain to grasp and pull an enemy to them, taunting them for $$2 seconds if they are not already taunted.",
  companionId: "bastian",
  abilityId: 153839,
  skillLineId: "companion-bastian-draconic-armor",
  skillType: "active",
  validRoles: ["tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
