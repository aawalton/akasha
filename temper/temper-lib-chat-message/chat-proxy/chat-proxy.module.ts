import type { Module } from "@akasha/code-system/module"

export const chatProxy = {
  id: "01a06060-0d16-7e3b-99f0-9bc14b4374ad",
  pageTypeSlug: "module",
  slug: "chat-proxy",
  definition: "the handle an addon prints tagged chat messages through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tag color is cleared once the tag carrying that color has been built.",
    },
    {
      invariantKind: "departure",
      statement: "Calling the library object itself makes a new proxy.",
    },
    {
      invariantKind: "departure",
      statement: "A disabled proxy prints nothing.",
    },
  ],
} as const satisfies Module
