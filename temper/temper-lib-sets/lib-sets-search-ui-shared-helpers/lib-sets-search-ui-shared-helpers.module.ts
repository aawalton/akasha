import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiSharedHelpers = {
  id: "01a0623c-2df8-7e9e-914b-b335605e5366",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-shared-helpers",
  definition: "the odd jobs the shared search window keeps outside its class",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The set data is topped up from the library once and never again.",
    },
    {
      invariantKind: "constraint",
      statement: "A term reaches the saved history 1500 milliseconds after the last keystroke.",
    },
  ],
} as const satisfies Module
