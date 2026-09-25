import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const itemBrowserPlaceKind = {
  id: "01a0d9db-b44a-7b8a-a683-9a01b1a45123",
  type: "page-type/number-property",
  slug: "item-browser-place-kind",
  propertySlug: "item-browser-place-kind",
  definition: "the kind of place the item browser files a place as",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind is the number the item browser's drop filter picks it with, less three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place no set drops from states no kind.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
