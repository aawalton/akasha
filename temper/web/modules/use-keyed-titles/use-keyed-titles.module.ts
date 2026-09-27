import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useKeyedTitles = {
  id: "01a0e0a0-2424-7002-ba1d-fa31bcb70e5b",
  type: "page-type/module",
  slug: "use-keyed-titles",
  definition:
    "the keyed titles of a page type as a browser reads them, read again as those pages change",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the pages are read there are no titles rather than empty ones.",
    },
  ],
} as const satisfies Module
