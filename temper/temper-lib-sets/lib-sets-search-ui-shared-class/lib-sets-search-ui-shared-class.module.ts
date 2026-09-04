import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiSharedClass = {
  id: "01a0623c-2df8-793e-9947-dbed82a8c7c5",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-shared-class",
  definition: "the class both search windows take their shared behaviour from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The parent methods are handed out as a second plainly typed view of the class.",
    },
  ],
} as const satisfies Module
