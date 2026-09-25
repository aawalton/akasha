import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mineRowLanding = {
  id: "01a0d8c0-ee3f-7d46-8a94-09141a86ca9b",
  type: "page-type/module",
  slug: "mine-row-landing",
  definition: "the mined rows the watcher posts, kept in the mine page's parts",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A posted row replaces the row in the mine that has its key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A replaced row keeps the id the mine gave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row whose key the mine has not got is appended to the last part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row the last part has no room for starts the next part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A replaced row a part has no room for is taken out and appended instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Of two rows in one post with one key, the later one is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is titled by its name and marked with the time it was kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the entry does not declare is left out of the row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write states the commit the parts were read at, and is tried again if refused.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every part is read to find a key, because the parts are not ordered by key.",
    },
  ],
} as const satisfies Module
