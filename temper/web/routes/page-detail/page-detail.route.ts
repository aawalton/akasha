import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const pageDetail = {
  id: "01a08297-9668-70a3-8a39-06a85b120863",
  type: "page-type/route",
  slug: "page-detail",
  definition: "a page of any page type, read on a screen of its own",
  code: "tsx",
  urlPath: ":pageTypeSlug/:pageHrefParam",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A route's loader runs beside the root loader rather than after it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This route reads the companion catalogue itself rather than waiting on the root loader.",
    },
  ],
} as const satisfies Route
