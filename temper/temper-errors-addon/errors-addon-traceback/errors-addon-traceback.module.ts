import type { Module } from "@akasha/code-system/module"

export const errorsAddonTraceback = {
  id: "01a060d8-0918-794b-b5f8-4d8440ca2d4b",
  pageTypeSlug: "module",
  slug: "errors-addon-traceback",
  definition: "the message and the callstack read out of what the game hands an error listener",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A traceback loses its Locals blocks before being kept.",
    },
    {
      invariantKind: "departure",
      statement: "An error carrying no visible text is recorded under a sentinel message.",
    },
    {
      invariantKind: "departure",
      statement: "An error that is not a string is recorded under a sentinel message.",
    },
    {
      invariantKind: "departure",
      statement: "A sentinel message carries the listener's own callstack for want of the origin.",
    },
  ],
} as const satisfies Module
