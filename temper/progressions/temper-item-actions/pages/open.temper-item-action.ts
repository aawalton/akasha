import type { TemperItemAction } from "akasha/temper/progressions/temper-item-actions/temper-item-action.page-type.types.ts"

export const open = {
  id: "01a071f0-4c85-7ee8-b672-ae4b86c4dedf",
  type: "temper-item-action",
  slug: "open",
  title: "Open",
  description: "Opens the container.",
} as const satisfies TemperItemAction
