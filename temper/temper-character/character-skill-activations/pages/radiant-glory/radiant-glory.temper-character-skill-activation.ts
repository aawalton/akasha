import type { TemperCharacterSkillActivation } from "../../temper-character-skill-activation.page-type.ts"

export const radiantGlory = {
  id: "019e646c-c4ec-7752-bf6b-35862f20781c",
  pageTypeSlug: "temper-character-skill-activation",
  slug: "radiant-glory",
  title: "Radiant Glory",
  descriptionTemplate:
    "Burn an enemy with a ray of holy fire, dealing $1 Magic Damage over 3.8 seconds. Deals up to 500% more damage to enemies below 33% Health.\n\nYou heal for 15% of the damage inflicted.\n\nThis ability is considered direct damage.",
  activationEffects: "jsonl",
} as const satisfies TemperCharacterSkillActivation
