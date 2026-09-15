import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoChatterNames = {
  id: "01a069cf-7042-7000-8df6-e6b7ffd0efc8",
  type: "module",
  slug: "eso-chatter-names",
  definition:
    "the chatter and interaction names the emitted declarations hold, rendered as a module",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name is rendered as a literal the JSON writer quoted.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The module rendered here carries no prose.",
    },
  ],
} as const satisfies Module
