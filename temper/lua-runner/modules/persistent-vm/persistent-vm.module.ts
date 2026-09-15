import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const persistentVm = {
  id: "01a06059-2492-704f-948b-8334eefba455",
  type: "page-type/module",
  slug: "persistent-vm",
  definition: "a Lua subprocess started, handed scripts one at a time, and shut down",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The subprocess loads the driver from the file beside the driver's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A start is proved by a handshake script whose answer is known beforehand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A handshake that hangs is given a deadline rather than waited on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A start that fails is tried again a fixed number of times.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failure names the subprocess and the work the subprocess did before failing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bytes the subprocess wrote to its error stream are kept for that report.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the last four kilobytes of the error stream are kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A script handed to a closed subprocess is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Closing ends the subprocess input and waits for the subprocess to exit.",
    },
  ],
} as const satisfies Module
