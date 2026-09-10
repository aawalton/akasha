import type { Module } from "../../../code-system/modules/module.page-type.types.ts"

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
      statement: "One request is read and run and answered before the next request is read.",
    },
    {
      invariantKind: "departure",
      statement: "The server ends where the channel the server reads from ends.",
    },
    {
      invariantKind: "departure",
      statement: "A run is started by the same code a caller starting a run would use.",
    },
    {
      invariantKind: "departure",
      statement: "The seconds answered are the seconds the process the server started spent.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling is judged here rather than in the process that asked for the run.",
    },
    {
      invariantKind: "departure",
      statement:
        "A throw from starting a process goes back in the head rather than ending the server.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a server.",
    },
  ],
} as const satisfies Module
