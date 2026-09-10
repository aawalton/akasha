import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const rotationTypes = {
  id: "01a06152-c2da-7a46-9d70-0b6d3eec75de",
  pageTypeSlug: "module",
  slug: "rotation-types",
  definition: "the vocabulary a companion rotation simulation is written in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Rotation state is a mutable record the simulator writes through.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The default target armor is read from the dungeon entry of the target armor table.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A rotation skill identifier admits the literal light-attack alongside real skill ids.",
    },
  ],
} as const satisfies Module
