import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const flagFaultStage = {
  id: "01a07bca-476d-73d6-89a9-15c0d6172d43",
  type: "module",
  slug: "flag-fault-stage",
  definition: "a fault said in one line, and a folder staged to write into",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a call's words, which the one argument reader does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fault is said in one line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run of blank space in a fault's message is made one space.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A thrown thing that is no error is said as the text of that thrown thing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A staged folder nothing named is a fresh folder under /var/tmp.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A staged folder the caller named is made where no folder is at that path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A staged folder is answered as the real path of that folder.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes into the folder staged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A staged folder this made is named to the caller as soon as it is made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder already there is named by nothing, since nothing made it.",
    },
  ],
} as const satisfies Module
