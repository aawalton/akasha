import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const utilsTiming = {
  id: "01a090ac-e14d-7590-abfd-665fd9dc0024",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "utils-timing",
  definition: "when a piece of work is set to happen later",
  parts: ["module/armed-timer"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The timers work is scheduled through are handed in so a test needs no wait.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock of its own.",
    },
  ],
} as const satisfies Domain
