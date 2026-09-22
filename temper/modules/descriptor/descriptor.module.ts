import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const descriptor = {
  id: "01a06053-3638-7cb5-b297-d04869965330",
  type: "page-type/module",
  slug: "descriptor",
  definition: "the name, version and defaults an add-on hands the game to save under",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The add-on writing a capture and the reader of that capture agree here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The descriptor states whether a load time is kept.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
