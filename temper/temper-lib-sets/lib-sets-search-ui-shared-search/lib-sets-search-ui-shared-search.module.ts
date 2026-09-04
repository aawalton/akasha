import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiSharedSearch = {
  id: "01a0623c-2df8-77cc-aa20-7ad23b772da9",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-shared-search",
  definition: "the text matching that decides whether a set answers a typed search",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A term after a minus sign excludes any set the term matches.",
    },
    {
      invariantKind: "constraint",
      statement: "A colon in a bonus term limits the match to that bonus line.",
    },
  ],
} as const satisfies Module
