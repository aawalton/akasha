import type { TemperItemAction } from "../temper-item-action.page-type.ts"

export const list = {
  id: "01a071f0-4c85-705f-8d7c-29387f5b39ab",
  pageTypeSlug: "temper-item-action",
  slug: "list",
  title: "List",
  description: "Lists the item at a guild trader.",
} as const satisfies TemperItemAction
