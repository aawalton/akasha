import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildMetadata = {
  id: "01a061c0-88d8-7527-81f9-44b8e63a9668",
  type: "module",
  slug: "build-metadata",
  definition: "a build's name, description and roles read off its state and put back on it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character's metadata and a companion's metadata are read by separate calls.",
    },
    {
      invariantKind: "absence",
      statement: "Metadata put back on a state leaves every other field of that state alone.",
    },
  ],
} as const satisfies Module
