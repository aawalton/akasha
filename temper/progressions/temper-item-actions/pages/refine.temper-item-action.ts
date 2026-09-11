import type { TemperItemAction } from "akasha/temper/progressions/temper-item-actions/temper-item-action.page-type.types.ts"

export const refine = {
  id: "01a071f0-4c86-72f2-9d33-e4fd765cf675",
  type: "temper-item-action",
  slug: "refine",
  title: "Refine",
  description: "Refines raw material into the worked form.",
} as const satisfies TemperItemAction
