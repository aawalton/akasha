import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoPathsResolve = {
  id: "01a06079-c3b5-7e9b-86a5-dfbfd908990c",
  type: "module",
  slug: "eso-paths-resolve",
  definition: "the one live directory picked out of the candidates a workstation could have",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A single candidate is answered without asking the disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first candidate that is a directory is the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A candidate that is a file rather than a directory is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in the test that says a candidate is present.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No candidate being present is refused with every candidate named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Saved variables and addons sit beneath the live directory.",
    },
  ],
} as const satisfies Module
