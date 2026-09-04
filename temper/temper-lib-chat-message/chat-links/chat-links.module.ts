import type { Module } from "@akasha/code-system/module"

export const chatLinks = {
  id: "01a06060-0d16-7826-bea5-a5a6d3a4be60",
  pageTypeSlug: "module",
  slug: "chat-links",
  definition: "the custom chat links this library rewrites as a message is formatted",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A link of a type no addon registered is rewritten as an unknown link.",
    },
  ],
} as const satisfies Module
