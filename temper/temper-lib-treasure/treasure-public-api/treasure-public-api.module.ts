import type { Module } from "@akasha/code-system/module"

export const treasurePublicApi = {
  id: "01a061d5-d0c1-796e-bcca-9b91d5f6acee",
  pageTypeSlug: "module",
  slug: "treasure-public-api",
  definition: "the names the library puts where every other addon reaches them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name the game reads keeps its upstream spelling on the global table.",
    },
  ],
} as const satisfies Module
