import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionImport = {
  id: "01a0640f-8510-72bd-a455-0d889d0077fd",
  type: "module",
  slug: "companion-import",
  definition: "a companion build decoded from a hash and filed against the reader's account",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reader who is not signed in imports nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hash the codec will not decode is refused rather than part-imported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hash the reader already has gives back the build already filed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A companion build is always live.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The build name is the companion and the main-hand weapon.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A companion with no readable main-hand weapon is named by the companion.",
    },
  ],
} as const satisfies Module
