import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const shoppingAbandonTripDialogSpentOne = {
  id: "01a0e2a8-fbc2-730e-9fc3-fcdf20cfd955",
  type: "page-type/temper-web-phrase",
  slug: "shopping-abandon-trip-dialog-spent-one",
  title:
    "You've spent {gold} on {count} item so far. Clearing the list discards this trip and its progress.",
} as const satisfies TemperWebPhrase
