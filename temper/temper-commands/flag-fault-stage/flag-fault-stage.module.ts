import type { Module } from "@akasha/code/module"

export const flagFaultStage = {
  id: "01a07bca-476d-73d6-89a9-15c0d6172d43",
  pageTypeSlug: "module",
  slug: "flag-fault-stage",
  definition: "a flag's value, a fault said in one line, and a folder staged to write into",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag's value is the word said after that flag.",
    },
    {
      invariantKind: "departure",
      statement: "A flag said more than once answers with the first value said after that flag.",
    },
    {
      invariantKind: "departure",
      statement: "A flag no word follows answers nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A flag the call does not have answers nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A fault is said in one line.",
    },
    {
      invariantKind: "departure",
      statement: "A run of blank space in a fault's message is made one space.",
    },
    {
      invariantKind: "departure",
      statement: "A thrown thing that is no error is said as the text of that thrown thing.",
    },
    {
      invariantKind: "departure",
      statement: "A staged folder nothing named is a fresh folder under /var/tmp.",
    },
    {
      invariantKind: "departure",
      statement: "A staged folder the caller named is made where no folder is at that path.",
    },
    {
      invariantKind: "departure",
      statement: "A staged folder is answered as the real path of that folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes into the folder staged.",
    },
  ],
} as const satisfies Module
