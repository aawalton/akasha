import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const savedVariablesReader = {
  id: "01a06084-d41a-7898-b2c6-0be1faa981da",
  type: "page-type/module",
  slug: "saved-variables-reader",
  definition: "one summary for each account, read out of the catalog addon's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text the parser refuses answers an empty list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account key opens with `@` and every other key is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account whose account-wide table the zod schema refuses is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key outside the metadata set is reported as a domain key that is present.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing count reads as zero and a missing flag reads as false.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A summary holds the value each present domain key has, as the parser read it.",
    },
  ],
  createdAt: "2026-09-02T05:08:32.922Z",
  updatedAt: "2026-10-19T17:29:58.466Z",
} as const satisfies Module
