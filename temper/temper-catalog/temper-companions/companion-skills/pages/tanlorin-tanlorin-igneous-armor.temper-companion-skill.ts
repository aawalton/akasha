import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinIgneousArmor = {
  id: "019e6484-38a5-7607-82f5-b623e4ff3f9b",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-igneous-armor",
  key: "tanlorin-igneous-armor",
  title: "Igneous Armor",
  icon: "/esoui/art/icons/ability_companion_tanlorin_igneousarmor.dds",
  description:
    "Your Companion releases their inner Dragon to gain Major Resolve for themselves and their grouped allies, increasing their Physical and Spell Resistance by 5948 for $$1 seconds. They gain a damage shield that absorbs up to $1 damage for $$2 seconds, scaling off their Max Health.",
  companionId: "tanlorin",
  abilityId: 215048,
  skillLineId: "companion-tanlorin-draconic-armor",
  skillType: "active",
  validRoles: ["tank", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
