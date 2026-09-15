import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const addonMenuStringIds = {
  id: "01a06100-0000-7000-8000-000000000032",
  type: "page-type/type-declaration",
  slug: "addon-menu-string-ids",
  definition: "the game string identifiers this library asks the client to translate",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name here keeps the spelling the game gives that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the shared game types already declare is left out.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
