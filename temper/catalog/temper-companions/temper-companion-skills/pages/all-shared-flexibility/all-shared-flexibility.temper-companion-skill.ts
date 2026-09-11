import type { TemperCompanionSkill } from "akasha/temper/catalog/temper-companions/temper-companion-skills/temper-companion-skill.page-type.types.ts"

export const allSharedFlexibility = {
  id: "019e6484-3835-78f0-aac4-b3f011617cbb",
  type: "temper-companion-skill",
  slug: "all-shared-flexibility",
  key: "shared-flexibility",
  title: "Flexibility",
  icon: "/esoui/art/icons/passive_companion_armor_medium.dds",
  description:
    "Increases damage done by 1% for each piece of Medium Armor equipped. Decreases Roll Dodge cooldown by 5% for each piece of Medium Armor equipped.",
  companionId: "all",
  abilityId: 157729,
  skillLineId: "armor-medium",
  skillType: "passive",
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
