import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const potionEffectsMode = {
  id: "01a07209-6b52-7535-a7df-730149f628d5",
  pageTypeSlug: "temper-condition-field",
  slug: "potion-effects-mode",
  title: "Potion Effects Mode",
  key: "potionEffectsMode",
  description:
    "This modifier chooses whether `potionEffects` asks for every listed effect under `all` or any one listed effect under `any`, defaulting to `any`.",
} as const satisfies TemperConditionField
