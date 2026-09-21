import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperItemsFilters = {
  id: "01a0c489-136c-7149-a691-bfc23d4a8013",
  type: "page-type/domain",
  slug: "temper-items-filters",
  definition: "how a player narrows a list of items",
  parts: ["domain/temper-items-filters-core"],
} as const satisfies Domain
