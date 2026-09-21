import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const temperRequests = {
  id: "01a0c4b8-da51-7e74-aff9-5b384e20b5c3",
  type: "page-type/route",
  slug: "temper-requests",
  definition: "the feature requests Temper players have published",
  code: "tsx",
  urlPath: "requests",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Anyone reads Temper's published feature requests without signing in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This page serves the published requests alone, most points first.",
    },
  ],
} as const satisfies Route
