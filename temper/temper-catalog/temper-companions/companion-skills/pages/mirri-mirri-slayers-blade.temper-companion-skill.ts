import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const mirriMirriSlayersBlade = {
  id: "019e6484-388c-785e-bf0a-bc50bb7c8b92",
  pageTypeSlug: "temper-companion-skill",
  slug: "mirri-mirri-slayers-blade",
  key: "mirri-slayers-blade",
  title: "Slayer's Blade",
  icon: "/esoui/art/icons/ability_companion_nightblade_017.dds",
  description:
    "Your Companion thrusts a magic blade with lethal precision to finish off an enemy, dealing $1 Magic Damage.",
  companionId: "mirri",
  abilityId: 153855,
  skillLineId: "companion-mirri-deadly-assassin",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
