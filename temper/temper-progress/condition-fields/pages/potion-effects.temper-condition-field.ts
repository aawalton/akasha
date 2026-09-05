import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const potionEffects = {
  id: "01a07209-6b52-7fc6-bb71-edad7d1fc8e9",
  pageTypeSlug: "temper-condition-field",
  slug: "potion-effects",
  title: "Potion Effects",
  key: "potionEffects",
  description:
    "An item's granted potion effect metric ids must cover the list of effect ids stated, under whichever quantifier `potionEffectsMode` names.",
} as const satisfies TemperConditionField
