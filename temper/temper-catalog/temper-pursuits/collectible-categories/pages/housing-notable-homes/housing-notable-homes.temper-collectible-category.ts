import type { TemperCollectibleCategory } from "../../temper-collectible-category.page-type.ts"

export const housingNotableHomes = {
  id: "01a06165-9169-7003-af56-183cc1122a06",
  pageTypeSlug: "temper-collectible-category",
  slug: "housing-notable-homes",
  title: "Notable Homes",
  parent: "housing",
  collectibles: "jsonl",
} as const satisfies TemperCollectibleCategory
