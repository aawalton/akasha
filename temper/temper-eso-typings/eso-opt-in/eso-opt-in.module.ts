import type { Module } from "@akasha/code-system/module"

export const esoOptIn = {
  id: "01a0686c-fd2c-7000-ae86-fd9462cb29d6",
  pageTypeSlug: "module",
  slug: "eso-opt-in",
  definition: "the manifest naming which eso tokens are declared",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The manifest is read from beside this module rather than from the checkout root.",
    },
    {
      invariantKind: "departure",
      statement:
        "A manifest naming no function is refused rather than read as a scope that names none.",
    },
  ],
} as const satisfies Module
