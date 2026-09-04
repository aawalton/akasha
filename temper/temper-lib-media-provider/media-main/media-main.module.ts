import type { Module } from "@akasha/code-system/module"

export const mediaMain = {
  id: "01a06069-f8c4-7b14-aede-050c4b2d0c98",
  pageTypeSlug: "module",
  slug: "media-main",
  definition: "the entry the game loads the library through",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here is exported.",
    },
  ],
} as const satisfies Module
