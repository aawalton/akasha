import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const skyshardsStringIds = {
  id: "01a061a8-9c6c-77af-ab8d-fc301a1713ff",
  type: "page-type/type-declaration",
  slug: "skyshards-string-ids",
  definition: "the string identifiers of this add-on's own English text",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The text these identifiers have is English alone.",
    },
  ],
} as const satisfies TypeDeclaration
