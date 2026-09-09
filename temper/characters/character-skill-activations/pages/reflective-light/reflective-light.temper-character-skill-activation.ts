import type { TemperCharacterSkillActivation } from "../../temper-character-skill-activation.page-type.ts"

export const reflectiveLight = {
  id: "019e646c-c4dd-719a-a195-98c26384f1a9",
  pageTypeSlug: "temper-character-skill-activation",
  slug: "reflective-light",
  title: "Reflective Light",
  descriptionTemplate:
    "Blast up to three enemies with a charge of radiant heat, dealing $1 Flame Damage, an additional $2 Flame Damage over 20 seconds, and reducing their Movement Speed by 40% for 3 seconds.\n\nUpon activation you gain Major Savagery and Major Prophecy for 20 seconds, increasing your Weapon and Spell Critical rating by 2629.",
  activationEffects: "jsonl",
} as const satisfies TemperCharacterSkillActivation
