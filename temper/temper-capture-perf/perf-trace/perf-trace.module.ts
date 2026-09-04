import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const perfTrace = {
  id: "01a060a9-5d58-7bc3-a680-2ccdb8dd5bf3",
  pageTypeSlug: "module",
  slug: "perf-trace",
  definition: "the milliseconds an add-on spent loading",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The clock is the game's own millisecond counter.",
    },
    {
      invariantKind: "departure",
      statement: "The announcement waits for the player to enter the world.",
    },
    {
      invariantKind: "departure",
      statement: "A saved setting reading anything but `minimal` announces nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The saved settings are read off the global table rather than declared.",
    },
  ],
} as const satisfies Module
