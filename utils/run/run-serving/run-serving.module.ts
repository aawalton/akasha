import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const runServing = {
  id: "01a082e2-e993-788b-956d-19267f41c187",
  pageTypeSlug: "module",
  slug: "run-serving",
  definition: "a server reading run after run off its input and answering each on its output",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One request is read, run, and answered before the next is read.",
    },
    {
      invariantKind: "departure",
      statement: "The server ends where the channel it reads from ends.",
    },
    {
      invariantKind: "departure",
      statement: "A run is started by the same code a caller starting one itself would use.",
    },
    {
      invariantKind: "departure",
      statement: "The seconds answered are the seconds the process the server started spent.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling is judged here, so the process watching it is a step further away.",
    },
    {
      invariantKind: "departure",
      statement: "A throw from starting a process goes back in the head rather than ending this.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a server.",
    },
  ],
} as const satisfies Module
