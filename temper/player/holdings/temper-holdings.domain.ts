import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperHoldings = {
  id: "01a05fac-7582-7d58-82ce-cb03ba05751f",
  type: "page-type/domain",
  slug: "temper-holdings",
  definition: "what an account has and what the holdings are worth",
  parts: [
    "page-type/temper-guild",
    "page-type/temper-guild-trader",
    "page-type/temper-holdings-thing",
    "page-type/temper-inventory-currency",
    "page-type/temper-item-category-tree",
    "page-type/temper-location-view",
    "page-type/temper-net-worth-hour",
    "page-type/temper-sale",
  ],
  createdAt: "2026-09-02T01:12:12.930Z",
  updatedAt: "2026-09-27T03:14:22.000Z",
} as const satisfies Domain
