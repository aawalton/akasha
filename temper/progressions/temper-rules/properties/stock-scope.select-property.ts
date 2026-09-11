import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const stockScope = {
  id: "01a05fd0-3aa6-791c-b6da-a96ebc31c770",
  type: "select-property",
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
  types: "ts",
} as const satisfies SelectProperty
