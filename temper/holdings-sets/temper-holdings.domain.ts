import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperHoldings = {
  id: "01a05fac-7582-7d58-82ce-cb03ba05751f",
  type: "domain",
  slug: "temper-holdings",
  definition: "what an account has and what the holdings are worth",
  pluralSlug: "temper-holdings-sets",
  parts: [
    "page-type/temper-guild-trader",
    "page-type/temper-holdings-thing",
    "page-type/temper-inventory-chunk",
    "page-type/temper-inventory-currency",
    "page-type/temper-inventory-snapshot",
    "page-type/temper-item-category-tree",
    "page-type/temper-net-worth-hour",
    "page-type/temper-sale",
  ],
} as const satisfies Domain
