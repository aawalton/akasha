import type { TestFixture } from "akasha/testing-system/test-fixtures/test-fixture.page-type.types.ts"

export const minting = {
  id: "01a04e33-9351-7e79-8041-89abfa036830",
  type: "test-fixture",
  slug: "minting",
  definition: "the pages a test sets up in a root of its own, and the ids it mints them under",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check a test mints states each phase the check runs on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One place mints the checks.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The index names a check a test mints.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check a test mints has the same value in the index and in its own body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page type a minted check is of is filed under a path the minted root has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A minted id is worked out from the slug the id is minted for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two slugs minted into one root are two ids.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One slug minted twice is one id.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a fixture beside another module.",
    },
  ],
} as const satisfies TestFixture
