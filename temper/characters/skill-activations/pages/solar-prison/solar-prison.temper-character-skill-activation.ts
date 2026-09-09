import type { TemperCharacterSkillActivation } from "../../temper-character-skill-activation.page-type.ts"

export const solarPrison = {
  id: "019e646c-c4df-7b45-9afc-9ba7522a425d",
  pageTypeSlug: "temper-character-skill-activation",
  slug: "solar-prison",
  title: "Solar Prison",
  descriptionTemplate:
    "Call down a fragment of the sun, dealing $1 Magic Damage every 1 second for 8 seconds to enemies in the area and afflicting them with Major Maim, reducing their damage done by 10%.\n\nAn ally near the fragment can activate the Gravity Crush synergy, dealing $2 Magic Damage to all enemies in the area and stunning them for 5 seconds.",
  activationEffects: "jsonl",
} as const satisfies TemperCharacterSkillActivation
