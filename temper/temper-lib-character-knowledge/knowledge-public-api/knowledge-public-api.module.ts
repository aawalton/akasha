import type { Module } from "@akasha/code-system/module"

export const knowledgePublicApi = {
  id: "01a0622b-dc5a-7644-abf2-0615e1f975a5",
  pageTypeSlug: "module",
  slug: "knowledge-public-api",
  definition: "the names the library puts where every other addon reaches them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name the game reads keeps its upstream spelling on the global table.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Whichever copy of a shared library loads first and is newest is the one the game uses.",
    },
  ],
} as const satisfies Module
