import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const completionOverrideRow = {
  id: "01a06108-2ff4-791d-9194-955da44a9b86",
  type: "module",
  slug: "completion-override-row",
  definition: "reading one stored override off an untyped row",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A row that is not an override reads as nothing rather than throwing.",
    },
  ],
} as const satisfies Module
