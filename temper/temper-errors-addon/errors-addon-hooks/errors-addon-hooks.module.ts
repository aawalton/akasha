import type { Module } from "@akasha/code-system/module"

export const errorsAddonHooks = {
  id: "01a060d8-091a-7436-a0ac-00c5553d0e0b",
  pageTypeSlug: "module",
  slug: "errors-addon-hooks",
  definition: "listening for the game's Lua error and low memory announcements",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An error raised before saved variables are ready is held in memory.",
    },
    {
      invariantKind: "departure",
      statement: "A held error is recorded once saved variables are ready.",
    },
    {
      invariantKind: "departure",
      statement: "A failure inside recording is swallowed rather than raised back into the game.",
    },
    {
      invariantKind: "constraint",
      statement: "The game announces a Lua error to every listener registered for that event.",
    },
  ],
} as const satisfies Module
