import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const bind = {
  id: "01a11be5-bca5-7580-9467-a1281d3ef8fa",
  type: "page-type/temper-item-action",
  slug: "bind",
  title: "Bind",
  description: "Binds the item to the account, which adds it to the set collection.",
  key: "bind",
  displayOrder: 18,
} as const satisfies TemperItemAction
