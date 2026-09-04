import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpSleetmail = {
  id: "019e6484-389d-7072-92c9-f2ce91f8e120",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-sleetmail",
  key: "sharp-sleetmail",
  title: "Sleetmail",
  icon: "/esoui/art/icons/ability_companion_warden_frostcloak.dds",
  description:
    "Your Companion conjures ice armor for themselves and nearby grouped allies. Your Companion reduces their Damage Taken by 20% for $$1 seconds. Allies gain Major Resolve, increasing Physical and Spell Resistance by 5948 for $$2 seconds.",
  companionId: "sharp-as-night",
  abilityId: 186603,
  skillLineId: "companion-sharp-as-night-winters-bite",
  skillType: "active",
  validRoles: ["tank", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
