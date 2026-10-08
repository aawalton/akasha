import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoChatterNames = {
  id: "01a069cf-7042-7000-8df6-e6b7ffd0efc8",
  type: "page-type/module",
  slug: "eso-chatter-names",
  definition:
    "the chatter and interaction names the emitted declarations hold, rendered as a module",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is rendered as a literal the JSON writer quoted.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The module rendered here carries no prose.",
    },
  ],
  createdAt: "2026-09-04T00:26:37.506Z",
  updatedAt: "2026-09-15T18:38:43.000Z",
} as const satisfies Module
