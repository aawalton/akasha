import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ttcListingClient = {
  id: "01a0609f-a419-7ed6-80f9-4695f2d6e695",
  type: "page-type/module",
  slug: "ttc-listing-client",
  definition: "a paced reader of guild store listings from the Tamriel Trade Centre api",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing here is Tamriel Trade Centre's answer right now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tamriel Trade Centre is asked no faster than the pace the caller sets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search waits its turn before asking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller setting no pace gets one request per six seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing failing the parse is dropped rather than failing the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Three failures in a row across a batch are thrown rather than swallowed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A demand for reCAPTCHA is reported as live search being unavailable.",
    },
  ],
} as const satisfies Module
