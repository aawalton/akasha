import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const esoOptIn = {
  id: "01a0686c-fd2c-7000-ae86-fd9462cb29d6",
  type: "module",
  slug: "eso-opt-in",
  definition: "the manifest naming which eso tokens are declared",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where the manifest sits is asked of the index rather than spelled.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest naming no function is refused rather than read as a scope naming no function.",
    },
  ],
} as const satisfies Module
