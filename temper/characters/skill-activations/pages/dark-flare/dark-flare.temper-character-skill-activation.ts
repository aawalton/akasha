import type { TemperCharacterSkillActivation } from "../../temper-character-skill-activation.page-type.ts"

export const darkFlare = {
  id: "019e646c-c4e9-7d87-8cb4-29b1cb1711e0",
  pageTypeSlug: "temper-character-skill-activation",
  slug: "dark-flare",
  title: "Dark Flare",
  descriptionTemplate:
    "Conjure a ball of solar energy to heave at an enemy, dealing $1 Magic Damage and increasing your damage done with class abilities by 5% for 10 seconds.\n\nAfflicts the target and enemies within 8 meters with Major Defile, reducing their healing received and damage shield strength by 12% for 4 seconds.\n \nAlso grants you Empower for 10 seconds, increasing the damage of your Heavy Attacks against monsters by 70%.",
  activationEffects: "jsonl",
} as const satisfies TemperCharacterSkillActivation
