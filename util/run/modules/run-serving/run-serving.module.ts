import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const runServing = {
  id: "01a082e2-e993-788b-956d-19267f41c187",
  type: "module",
  slug: "run-serving",
  definition: "a server reading run after run off its input and answering each on its output",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One request is read and run and answered before the next request is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The server ends where the channel the server reads from ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run is started by the same code a caller starting a run would use.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seconds answered are the seconds the process the server started spent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The peak answered is the peak the process the server started reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether that peak was measured is answered beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ceiling is judged here rather than in the process that asked for the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A throw from starting a process goes back in the head rather than ending the server.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here starts a server.",
    },
  ],
  reachedByPath: ["serving"],
} as const satisfies Module
