import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const assertSchemaKeysMatchPayload = {
  id: "01a15a2d-b686-7f31-a7d4-116d2771b439",
  type: "page-type/module",
  slug: "assert-schema-keys-match-payload",
  definition:
    "a call refusing to typecheck unless a zod schema and a payload type name the same keys",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The check here runs in the type system rather than at runtime.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys are held the same at every depth, through lists and records.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the payload writes and the schema does not admit is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the schema admits and the payload never writes is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key any one member of a payload union writes is held to the schema.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What each key holds is not compared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the path of every key that disagrees.",
    },
  ],
  createdAt: "2026-10-20T16:38:27.718Z",
  updatedAt: "2026-10-20T16:38:27.718Z",
} as const satisfies Module
