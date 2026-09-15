import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const referenceBuildData = {
  id: "01a06152-c2da-7538-9de2-da50c79de469",
  type: "module",
  slug: "reference-build-data",
  definition: "lazily decoded reference companion build and its cached support baseline",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The build decoder is injected at runtime through registerCompanionDecoder.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The reference build code is a fixed literal string.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Decoding throws when no decoder has been registered.",
    },
  ],
} as const satisfies Module
