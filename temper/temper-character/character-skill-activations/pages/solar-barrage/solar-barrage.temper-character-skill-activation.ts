import type { TemperCharacterSkillActivation } from "../../temper-character-skill-activation.page-type.ts"

export const solarBarrage = {
  id: "019e646c-c4eb-7243-aa0a-27d3366fa972",
  pageTypeSlug: "temper-character-skill-activation",
  slug: "solar-barrage",
  title: "Solar Barrage",
  descriptionTemplate:
    "Conjure solar energy to blast enemies around you, dealing $1 Magic Damage every 2 seconds and increasing your damage done with class abilities by 5% for 20 seconds.\n\nWhile this ability is active you gain Empower, increasing the damage of your Heavy Attacks against monsters by 70%.",
  activationEffects: "jsonl",
} as const satisfies TemperCharacterSkillActivation
