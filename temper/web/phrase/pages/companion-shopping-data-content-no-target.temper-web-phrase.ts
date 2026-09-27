import type { TemperWebPhrase } from "akasha/temper/web/phrase/temper-web-phrase.page-type.types.ts"

export const companionShoppingDataContentNoTarget = {
  id: "01a0e2ae-14a3-77dd-88c0-1d594fdf760e",
  type: "page-type/temper-web-phrase",
  slug: "companion-shopping-data-content-no-target",
  title: "No companion has a target build",
  description:
    "A shopping list is built from a companion's target build, and none is set. Importing from the game does not create one.",
} as const satisfies TemperWebPhrase
