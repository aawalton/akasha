import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const assertSchemaKeysMatchPayload = {
  id: "01a15f83-1a2c-7682-8365-e36a076d3ca2",
  type: "page-type/test-fixture",
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
  createdAt: "2026-10-21T17:29:49.867Z",
  updatedAt: "2026-10-21T17:29:49.867Z",
} as const satisfies TestFixture
