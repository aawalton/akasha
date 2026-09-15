import type { TemperItemAction } from "akasha/temper/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const list = {
  id: "01a071f0-4c85-705f-8d7c-29387f5b39ab",
  type: "temper-item-action",
  slug: "list",
  title: "List",
  description: "Lists the item at a guild trader.",
} as const satisfies TemperItemAction
