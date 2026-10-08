import type { TemperCharacterSkillActivation } from "akasha/temper/player/character/skill-activation/temper-character-skill-activation.page-type.types.ts"

export const radiantGlory = {
  id: "019e646c-c4ec-7752-bf6b-35862f20781c",
  type: "page-type/temper-character-skill-activation",
  slug: "radiant-glory",
  title: "Radiant Glory",
  descriptionTemplate:
    "Burn an enemy with a ray of holy fire, dealing $1 Magic Damage over 3.8 seconds. Deals up to 500% more damage to enemies below 33% Health.\n\nYou heal for 15% of the damage inflicted.\n\nThis ability is considered direct damage.",
  activationEffects: "jsonl",
  createdAt: "2026-05-26T13:15:10.444Z",
  updatedAt: "2026-09-21T15:29:06.000Z",
} as const satisfies TemperCharacterSkillActivation
