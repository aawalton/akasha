import type { Module } from "@akasha/code-system/module"

export const esoPathsResolve = {
  id: "01a06079-c3b5-7e9b-86a5-dfbfd908990c",
  pageTypeSlug: "module",
  slug: "eso-paths-resolve",
  definition: "the one live directory picked out of the candidates a workstation could hold",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A single candidate is answered without asking the disk.",
    },
    {
      invariantKind: "departure",
      statement: "The first candidate that is a directory is the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A candidate that is a file rather than a directory is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what counts as present.",
    },
    {
      invariantKind: "departure",
      statement: "No candidate being present is refused with every candidate named.",
    },
    {
      invariantKind: "departure",
      statement: "Saved variables and addons sit beneath the live directory.",
    },
  ],
} as const satisfies Module
