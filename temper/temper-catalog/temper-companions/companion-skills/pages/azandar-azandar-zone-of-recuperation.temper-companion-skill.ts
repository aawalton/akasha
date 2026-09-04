import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const azandarAzandarZoneOfRecuperation = {
  id: "019e6484-3845-7a06-872c-e1a6dc8cb1f4",
  pageTypeSlug: "temper-companion-skill",
  slug: "azandar-azandar-zone-of-recuperation",
  key: "azandar-zone-of-recuperation",
  title: "Zone of Recuperation",
  icon: "/esoui/art/icons/ability_companion_arcanist_domain.dds",
  description:
    "Your Companion outlines a domain of eldritch power, healing them and their allies standing within for $1 Health over $$1 seconds and granting 150 Health, Magicka, and Stamina Recovery.",
  companionId: "azandar",
  abilityId: 193126,
  skillLineId: "companion-azandar-revitalizing-researcher",
  skillType: "active",
  validRoles: ["healer", "tank"],
  tags: ["ground-effect"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
