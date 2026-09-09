import type { TemperCharacterSkillActivation } from "../../temper-character-skill-activation.page-type.ts"

export const solarDisturbance = {
  id: "019e646c-c4e2-7198-a5a7-d5d105f2b4e0",
  pageTypeSlug: "temper-character-skill-activation",
  slug: "solar-disturbance",
  title: "Solar Disturbance",
  descriptionTemplate:
    "Call down a fragment of the sun, dealing $1 Magic Damage every 1 second for 8 seconds to enemies in the area and applying Major Maim to them for 10 seconds, reducing their damage done by 10%.\n\nAn ally near the fragment can activate the Supernova synergy, dealing $2 Magic Damage to all enemies in the area and stunning them for 3 seconds.",
  activationEffects: "jsonl",
} as const satisfies TemperCharacterSkillActivation
