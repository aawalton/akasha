import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedRitualOfSalvation = {
  id: "019e6688-86f3-7a04-b617-8c6c9663ce6a",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-ritual-of-salvation",
  key: "shared-ritual-of-salvation",
  title: "Ritual of Salvation",
  icon: "/esoui/art/icons/ability_companion_fightersguild_001.dds",
  description:
    "Your Companion brands the earth underneath them with a rune of protection for $$1 seconds. Standing within the rune reduces the damage they and their allies take by 20%. If the attacker is an Undead, Daedra, or Werewolf the rune reduces damage taken by an additional 20%.",
  companionId: "all",
  abilityId: 154926,
  skillLineId: "guild-fighters",
  skillType: "active",
  validRoles: ["tank", "support"],
  tags: ["ground-effect"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
