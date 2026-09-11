import type { TemperCompanionSkill } from "akasha/temper/catalog/temper-companions/temper-companion-skills/temper-companion-skill.page-type.types.ts"

export const bastianBastianCrushingClaws = {
  id: "019e6484-384b-7d02-b466-7ef0596869ae",
  type: "temper-companion-skill",
  slug: "bastian-bastian-crushing-claws",
  key: "bastian-crushing-claws",
  title: "Crushing Claws",
  icon: "/esoui/art/icons/ability_companion_dragonknight_010.dds",
  description:
    "Your Companion calls forth talons from the ground, dealing $1 Flame Damage to enemies nearby and immobilizing them for $$2 seconds.",
  companionId: "bastian",
  abilityId: 153812,
  skillLineId: "companion-bastian-draconic-armor",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
