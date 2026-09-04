import type { Module } from "@akasha/code-system/module"

export const libSetsDebugDebugSetScan = {
  id: "01a0623c-2df7-7642-8643-ff60b0ac0a6c",
  pageTypeSlug: "module",
  slug: "lib-sets-debug-debug-set-scan",
  definition: "the item ids tried one by one against the client and the set names that come back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An item id is tried by building a link for it and asking the client for set info.",
    },
    { invariantKind: "departure", statement: "Crafted items are skipped." },
    {
      invariantKind: "constraint",
      statement: "The uncompressed item id table is deleted again unless asked to keep it.",
    },
  ],
} as const satisfies Module
