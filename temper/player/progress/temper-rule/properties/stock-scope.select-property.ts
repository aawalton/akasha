import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const stockScope = {
  id: "01a05fd0-3aa6-791c-b6da-a96ebc31c770",
  type: "page-type/select-property",
  slug: "stock-scope",
  propertySlug: "stock-scope",
  definition: "how widely a stocking rule counts what is already held",
  values: ["current-character", "any-character"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule counting the current character alone stocks each character apart.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:51:17.158Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies SelectProperty
