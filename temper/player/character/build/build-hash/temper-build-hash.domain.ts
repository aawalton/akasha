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
    "module/record-from-keys",
    "text-property/build-hash",
    "text-property/hash-indexed",
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
      statement: "An entry of a table a build hash indexes keeps its place for every shipped minor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new entry of such a table goes at the end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A new minor may drop or move entries only where every older minor reads a frozen table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That frozen table holds each entry at the index the older minors read it by.",
    },
  ],
  createdAt: "2026-09-02T15:37:18.097Z",
  updatedAt: "2026-10-20T01:04:15.015Z",
} as const satisfies Domain
