import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonRemovedRefs = {
  id: "01a06365-e827-7004-83d6-2a85f1a30c02",
  pageTypeSlug: "module",
  slug: "addon-removed-refs",
  definition: "the references an emitted bundle keeps to a third-party add-on that is gone",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A reference inside a string literal is masked before the line is scanned.",
    },
    {
      invariantKind: "constraint",
      statement: "Every finding names the add-on the global belonged to and the remedy.",
    },
    {
      invariantKind: "constraint",
      statement: "A global is matched whole rather than as part of a longer name.",
    },
  ],
} as const satisfies Module
