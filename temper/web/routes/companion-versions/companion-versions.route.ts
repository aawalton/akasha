import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const companionVersions = {
  id: "01a08294-ce76-7540-86fe-0dddd869093b",
  type: "page-type/route",
  slug: "companion-versions",
  definition: "the saved revisions of a companion's build",
  code: "ts",
  urlPath: "api/companion-versions/:buildSlug",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal answers a reason code and no wording, which the client words.",
    },
  ],
  createdAt: "2026-09-08T19:53:05.398Z",
  updatedAt: "2026-09-27T12:48:15.000Z",
} as const satisfies Route
