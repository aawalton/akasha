import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const potionEffects = {
  id: "01a07209-6b52-7fc6-bb71-edad7d1fc8e9",
  type: "page-type/temper-condition-field",
  slug: "potion-effects",
  title: "Potion Effects",
  key: "potionEffects",
  description:
    'An item\'s granted potion effect metric ids must cover the list of effect ids stated, under whichever quantifier `potionEffectsMode` names. The value a rule states is a JSON array of effect ids, and stays an array where one effect is named: `["Restore Health"]` states that one, and bare `Restore Health` states nothing this field takes.',
  createdAt: "2026-09-05T14:46:55.058Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
