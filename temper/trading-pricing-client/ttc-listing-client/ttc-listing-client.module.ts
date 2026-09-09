import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ttcListingClient = {
  id: "01a0609f-a419-7ed6-80f9-4695f2d6e695",
  pageTypeSlug: "module",
  slug: "ttc-listing-client",
  definition: "a paced reader of guild store listings from the Tamriel Trade Centre api",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A search waits its turn before asking.",
    },
    {
      invariantKind: "departure",
      statement: "A caller setting no pace gets one request per six seconds.",
    },
    {
      invariantKind: "departure",
      statement: "A listing failing the parse is dropped rather than failing the page.",
    },
    {
      invariantKind: "departure",
      statement: "Three failures in a row across a batch are thrown rather than swallowed.",
    },
    {
      invariantKind: "departure",
      statement: "A demand for reCAPTCHA is reported as live search being unavailable.",
    },
  ],
} as const satisfies Module
