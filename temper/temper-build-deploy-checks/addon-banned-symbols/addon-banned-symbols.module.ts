import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonBannedSymbols = {
  id: "01a06365-e827-7002-bfdd-914c6a139782",
  pageTypeSlug: "module",
  slug: "addon-banned-symbols",
  definition: "the Lua symbols an emitted bundle names that the game's sandbox took away",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A manifest yielding no banned construct refuses to load rather than scanning.",
    },
    {
      invariantKind: "constraint",
      statement: "A symbol inside a string literal is masked before the line is scanned.",
    },
    {
      invariantKind: "constraint",
      statement: "A matched namespace with no allow-set in the manifest throws.",
    },
    {
      invariantKind: "constraint",
      statement: "A member the manifest allows on a partial namespace is no finding.",
    },
    {
      invariantKind: "constraint",
      statement: "Every finding names which family of the manifest the symbol was matched by.",
    },
  ],
} as const satisfies Module
