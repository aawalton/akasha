import type { TemperCharacterSkillActivation } from "akasha/temper/player/character/skill-activation/temper-character-skill-activation.page-type.types.ts"

export const vampiresBane = {
  id: "019e646c-c4d7-7476-98c1-519adf268149",
  type: "page-type/temper-character-skill-activation",
  slug: "vampires-bane",
  title: "Vampire's Bane",
  descriptionTemplate:
    "Blast an enemy with a charge of radiant heat, dealing $1 Flame Damage, and an additional $2 Flame Damage over 30 seconds.\n\nUpon activation you gain Major Savagery and Major Prophecy for 30 seconds, increasing your Weapon and Spell Critical rating by 2629.",
  activationEffects: "jsonl",
  createdAt: "2026-05-26T13:15:10.423Z",
  updatedAt: "2026-09-21T15:29:06.000Z",
} as const satisfies TemperCharacterSkillActivation
