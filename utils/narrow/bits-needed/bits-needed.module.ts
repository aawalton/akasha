import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const bitsNeeded = {
  id: "01a08deb-5f4a-73ea-bf9a-4cd5d1172729",
  type: "module",
  slug: "bits-needed",
  definition: "how many bits index one thing out of a count of things",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A count of one or none still takes one bit rather than none.",
    },
  ],
} as const satisfies Module
