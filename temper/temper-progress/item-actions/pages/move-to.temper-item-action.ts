import type { TemperItemAction } from "../temper-item-action.page-type.ts"

export const moveTo = {
  id: "01a071f0-4c85-7772-9c83-1d70b2f35077",
  pageTypeSlug: "temper-item-action",
  slug: "move-to",
  title: "Move",
  description: "Moves the item to the destination the rule names.",
} as const satisfies TemperItemAction
