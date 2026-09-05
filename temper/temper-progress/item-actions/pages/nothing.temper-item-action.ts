import type { TemperItemAction } from "../temper-item-action.page-type.ts"

export const nothing = {
  id: "01a071f0-4c85-7eb9-9625-4b57c018d0b1",
  pageTypeSlug: "temper-item-action",
  slug: "nothing",
  title: "Leave alone",
  description: "Leaves the item in place.",
} as const satisfies TemperItemAction
