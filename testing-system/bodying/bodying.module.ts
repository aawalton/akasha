import type { Module } from "@akasha/code-system/module"

export const bodying = {
  id: "01a04ee7-be07-7a1b-9f3f-f5e6d4693e70",
  pageTypeSlug: "module",
  slug: "bodying",
  definition: "the bytes, and the body standing at a path, that a test hands to what it tries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test names the root once and is handed a way to make bodies under the root.",
    },
    {
      invariantKind: "departure",
      statement: "Text and bytes are both taken.",
    },
    {
      invariantKind: "departure",
      statement: "A check is handed bytes.",
    },
    {
      invariantKind: "departure",
      statement: "A test says text.",
    },
    {
      invariantKind: "departure",
      statement: "What a test binds is what the test was handed rather than a function of its own.",
    },
  ],
} as const satisfies Module
