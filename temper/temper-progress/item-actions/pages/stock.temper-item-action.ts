import type { TemperItemAction } from "../temper-item-action.page-type.ts"

export const stock = {
  id: "01a071f0-4c86-735a-92fe-07fa9541b270",
  pageTypeSlug: "temper-item-action",
  slug: "stock",
  title: "Stock",
  description: "Keeps a target quantity of the item at the destination the rule names.",
} as const satisfies TemperItemAction
