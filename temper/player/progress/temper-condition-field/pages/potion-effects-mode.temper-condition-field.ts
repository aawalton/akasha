import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const potionEffectsMode = {
  id: "01a07209-6b52-7535-a7df-730149f628d5",
  type: "page-type/temper-condition-field",
  slug: "potion-effects-mode",
  title: "Potion Effects Mode",
  key: "potionEffectsMode",
  description:
    "This modifier chooses whether `potionEffects` asks for every listed effect under `all` or any one listed effect under `any`, defaulting to `any`.",
  createdAt: "2026-09-05T14:46:55.058Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
