import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const azandarAzandarVigorousTentacularEruption = {
  id: "019e6484-3843-7ef8-96c1-69fd47ca7dae",
  pageTypeSlug: "temper-companion-skill",
  slug: "azandar-azandar-vigorous-tentacular-eruption",
  key: "azandar-vigorous-tentacular-eruption",
  title: "Vigorous Tentacular Eruption",
  icon: "/esoui/art/icons/ability_companion_arcanist_vigoroustentaculareruption.dds",
  description:
    "Your Companion creates a gate to Apocrypha beneath an enemy. After 2 seconds, a swarm of hideous tentacles bursts through the gate, dealing $1 Magic Damage to enemies within the gate, knocking them up in the air and stunning them for $$2 seconds. Enemies damaged by the tentacles receive Major Vulnerability for $$3 seconds, increasing their damage taken by 10%.",
  companionId: "azandar",
  abilityId: 195103,
  skillLineId: "companion-azandar",
  skillType: "ultimate",
  validRoles: ["dps", "support"],
  tags: ["knockup"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
