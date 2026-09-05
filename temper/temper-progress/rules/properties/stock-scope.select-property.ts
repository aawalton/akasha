import type { SelectProperty } from "@akasha/pages-system/select-property"

export const stockScope = {
  id: "01a05fd0-3aa6-791c-b6da-a96ebc31c770",
  pageTypeSlug: "select-property",
  slug: "stock-scope",
  propertySlug: "stock-scope",
  definition: "how widely a stocking rule counts what is already held",
  values: ["current-character", "any-character"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule counting the current character alone stocks each character apart.",
    },
  ],
} as const satisfies SelectProperty

export type StockScope = (typeof stockScope.values)[number]
