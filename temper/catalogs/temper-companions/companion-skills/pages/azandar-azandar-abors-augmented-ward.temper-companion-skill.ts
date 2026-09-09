import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const azandarAzandarAborsAugmentedWard = {
  id: "019e6484-3837-75fc-a834-638f18af72f8",
  pageTypeSlug: "temper-companion-skill",
  slug: "azandar-azandar-abors-augmented-ward",
  key: "azandar-abors-augmented-ward",
  title: "Abor's Augmented Ward",
  icon: "/esoui/art/icons/ability_companion_arcanist_fatewovenarmor.dds",
  description:
    "Your Companion draws on advanced research to gain a damage shield that absorbs up to 25% of their Max Health for $$1 seconds. The first time they take direct damage after casting, the shield retaliates and deals $2 Magic Damage to the attacker.",
  companionId: "azandar",
  abilityId: 191939,
  skillLineId: "companion-azandar-quill-knight",
  skillType: "active",
  validRoles: ["dps", "tank"],
  tags: ["max-health-shield-25pct", "retaliation-damage"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
