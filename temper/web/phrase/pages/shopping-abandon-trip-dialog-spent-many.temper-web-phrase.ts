import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const shoppingAbandonTripDialogSpentMany = {
  id: "01a0e2a8-fbc2-79e4-be9d-d45fb7df8984",
  type: "page-type/temper-web-phrase",
  slug: "shopping-abandon-trip-dialog-spent-many",
  title:
    "You've spent {gold} on {count} items so far. Clearing the list discards this trip and its progress.",
} as const satisfies TemperWebPhrase
