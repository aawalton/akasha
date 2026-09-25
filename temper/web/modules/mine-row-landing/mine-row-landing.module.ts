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
      statement: "A write states the commit the spans were read at, and is tried again if refused.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The store answers a whole file, and answers no row by its key.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The parts are not ordered by key, so two parts may hold keys between one pair.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lowest and highest key of each part are kept beside the page as its span.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spans are kept rather than the part of every key, or parts kept in key order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is looked for only in the parts whose span holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last part is read whatever its span, since a row is appended there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part with no span is read, so a mine with no spans has every part read once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The span of every part read is worked out again and written with the rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every write puts the spans, so a write landing over another write is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every write names this module as the one its puts come through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`landMineRows` is the only writer of the mine's item and quest parts.",
    },
  ],
} as const satisfies Module
