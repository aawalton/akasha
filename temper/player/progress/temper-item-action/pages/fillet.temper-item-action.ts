import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const fillet = {
  id: "01a12630-8bb4-717c-acd8-18d63ea8384f",
  type: "page-type/temper-item-action",
  slug: "fillet",
  title: "Fillet",
  description: "Fillets the fish at a provisioning station for the ingredients the fish yields.",
  key: "fillet",
  displayOrder: 19,
  createdAt: "2026-10-10T14:21:18.132Z",
  updatedAt: "2026-10-10T14:21:18.132Z",
} as const satisfies TemperItemAction
