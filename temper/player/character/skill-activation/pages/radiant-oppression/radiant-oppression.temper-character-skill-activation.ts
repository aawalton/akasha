import type { TemperCharacterSkillActivation } from "akasha/temper/player/character/skill-activation/temper-character-skill-activation.page-type.types.ts"

export const radiantOppression = {
  id: "019e646c-c4ed-7ba0-8d00-df4d036b4685",
  type: "page-type/temper-character-skill-activation",
  slug: "radiant-oppression",
  title: "Radiant Oppression",
  descriptionTemplate:
    "Burn an enemy with a ray of holy fire, dealing $1 Magic Damage over 3.8 seconds. Deals up to 500% more damage to enemies below 40% Health.\n\nThis ability is considered direct damage.",
  activationEffects: "jsonl",
  createdAt: "2026-05-26T13:15:10.445Z",
  updatedAt: "2026-09-21T15:29:06.000Z",
} as const satisfies TemperCharacterSkillActivation
