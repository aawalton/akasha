import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keyedTitles = {
  id: "01a0e0a0-2424-7000-94a9-679ea86899bc",
  type: "page-type/module",
  slug: "keyed-titles",
  definition: "the pages of one type read as keys, each with the title and place its page states",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key's title is the title its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys are ordered by the display order their pages state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key no page states is titled by the key itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is titled by the key itself while its pages are not yet read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no key, title or display order is refused rather than skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One reading is held for each page type, and a new reading replaces it whole.",
    },
  ],
} as const satisfies Module
