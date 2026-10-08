import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperItemsFilters = {
  id: "01a0c489-136c-7149-a691-bfc23d4a8013",
  type: "page-type/domain",
  slug: "temper-items-filters",
  definition: "how a player narrows a list of items",
  parts: ["domain/temper-items-filters-core", "domain/temper-items-filters-addon"],
  createdAt: "2026-09-21T15:15:12.876Z",
  updatedAt: "2026-09-21T15:37:03.000Z",
} as const satisfies Domain
