import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keyedTitlesLoading = {
  id: "01a0e0a0-2424-7001-a6c0-c7e720ca1843",
  type: "page-type/module",
  slug: "keyed-titles-loading",
  definition:
    "the keyed titles of a page type read on a server and read again when those pages change",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type's keyed titles are read the first time they are asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a page of that type has them read again.",
    },
  ],
} as const satisfies Module
