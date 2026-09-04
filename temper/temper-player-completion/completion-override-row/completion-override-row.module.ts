import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionOverrideRow = {
  id: "01a06108-2ff4-791d-9194-955da44a9b86",
  pageTypeSlug: "module",
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
