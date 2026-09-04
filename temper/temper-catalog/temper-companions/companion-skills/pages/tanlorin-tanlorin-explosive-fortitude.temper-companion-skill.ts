import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinExplosiveFortitude = {
  id: "019e6484-38a2-74a4-bf45-812de424b289",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-explosive-fortitude",
  key: "tanlorin-explosive-fortitude",
  title: "Explosive Fortitude",
  icon: "/esoui/art/icons/ability_companion_tanlorin_explosivefortitude.dds",
  description:
    "Your Companion's soul explodes outwards, dealing $1 Magic Damage around them. When they take damage, deal an additional $1 Magic Damage to nearby enemies. This effect can occur once every $$3 seconds over $$2 seconds.",
  companionId: "tanlorin",
  abilityId: 214948,
  skillLineId: "companion-tanlorin-empathic-fighter",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
