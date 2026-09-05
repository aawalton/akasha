import type { TemperItemAction } from "../temper-item-action.page-type.ts"

export const lock = {
  id: "01a071f0-4c85-7404-8a53-dd9a8dc5e1e0",
  pageTypeSlug: "temper-item-action",
  slug: "lock",
  title: "Lock",
  description: "Locks the item against other rules.",
} as const satisfies TemperItemAction
