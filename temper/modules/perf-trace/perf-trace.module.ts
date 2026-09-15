import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const perfTrace = {
  id: "01a060a9-5d58-7bc3-a680-2ccdb8dd5bf3",
  type: "module",
  slug: "perf-trace",
  definition: "the milliseconds an add-on spent loading",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A load time is announced only where the saved settings ask.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The clock is the game's own millisecond counter.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The announcement waits for the player to enter the world.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A saved setting reading anything but `minimal` announces nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The saved settings are read off the global table rather than declared.",
    },
  ],
} as const satisfies Module
