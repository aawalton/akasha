import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorsAddonHooks = {
  id: "01a060d8-091a-7436-a0ac-00c5553d0e0b",
  type: "module",
  slug: "errors-addon-hooks",
  definition: "listening for the game's Lua error and low memory announcements",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An error raised before saved variables are ready is in memory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A held error is recorded once saved variables are ready.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A failure inside recording is swallowed rather than raised back into the game.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The game announces a Lua error to every listener registered for that event.",
    },
  ],
} as const satisfies Module
