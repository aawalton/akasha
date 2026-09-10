import type { TypeDeclaration } from "../../../code-system/type-declarations/type-declaration.page-type.types.ts"

export const debugLoggerSavedVariables = {
  id: "01a06061-408f-7283-a6ff-efcb493f633f",
  pageTypeSlug: "type-declaration",
  type: "type-declaration",
  slug: "debug-logger-saved-variables",
  definition: "the two tables the game keeps for this library between sessions",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The settings and the log are kept apart.",
    },
  ],
} as const satisfies TypeDeclaration
