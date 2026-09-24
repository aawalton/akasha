import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperBuildHash = {
  id: "01a062c4-7811-7457-9a0e-87d4906e32a4",
  type: "page-type/domain",
  slug: "temper-build-hash",
  definition:
    "the bits a character build is packed into away from the game, and the text carrying them",
  parts: [
    "module/build-hash-base64url",
    "module/build-hash-bit-reader",
    "module/build-hash-bit-writer",
    "test-fixture/build-hash-test-utils",
    "module/record-from-keys", "text-property/hash-indexed",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bit arithmetic goes through the operators the language gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bits go in and come out from the most significant end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text that is no valid encoding is read as nothing rather than as bytes.",
    },
    {
  decisionKind: "decision-kind/departure",
  statement:
    "An entry of a table a build hash indexes is never moved or removed, and a new one goes at the end.",
},
  ],
} as const satisfies Domain
