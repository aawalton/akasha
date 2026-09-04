import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const tsNodeShapes = {
  id: "01a06287-7841-7895-be68-97c06e83843f",
  pageTypeSlug: "module",
  slug: "ts-node-shapes",
  definition: "what a TypeScript syntax node is and what it is named",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A node's name is read off the node or off what the node is bound to.",
    },
    {
      invariantKind: "constraint",
      statement: "The enclosing function of a node is the outermost enclosing function.",
    },
  ],
} as const satisfies Module
