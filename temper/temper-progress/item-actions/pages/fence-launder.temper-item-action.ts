import type { TemperItemAction } from "../temper-item-action.page-type.ts"

export const fenceLaunder = {
  id: "01a071f0-4c84-7b4d-8467-1404cf41193c",
  pageTypeSlug: "temper-item-action",
  slug: "fence-launder",
  title: "Launder",
  description: "Launders a stolen item at a fence.",
} as const satisfies TemperItemAction
