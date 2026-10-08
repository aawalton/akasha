import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ttcListingSchema = {
  id: "01a0609b-e59e-7b1a-960c-fe4f807c30e4",
  type: "page-type/module",
  slug: "ttc-listing-schema",
  definition: "what a Tamriel Trade Centre listing must have before a reader believes it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing missing a field the parse requires is dropped rather than repaired.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the parse does not name is carried through untouched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A garbled page count is read as the first page.",
    },
  ],
  createdAt: "2026-09-02T05:33:44.734Z",
  updatedAt: "2026-09-21T15:12:49.000Z",
} as const satisfies Module
