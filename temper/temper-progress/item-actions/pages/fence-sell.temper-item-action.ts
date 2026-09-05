import type { TemperItemAction } from "../temper-item-action.page-type.ts"

export const fenceSell = {
  id: "01a071f0-4c85-7ebd-948c-7d677bdb19af",
  pageTypeSlug: "temper-item-action",
  slug: "fence-sell",
  title: "Fence",
  description: "Sells a stolen item at a fence.",
} as const satisfies TemperItemAction
