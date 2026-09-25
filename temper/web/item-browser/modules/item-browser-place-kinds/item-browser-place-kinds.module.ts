import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemBrowserPlaceKinds = {
  id: "01a0d9e2-f641-77a9-9bcd-9a03da766786",
  type: "page-type/module",
  slug: "item-browser-place-kinds",
  definition:
    "the kind of each place a set drops from, keyed by the number the browser writes it as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every place's kind is read off that place's own page, imported here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone is keyed by its zone id and a source that is no zone by its source id.",
    },
  ],
} as const satisfies Module
