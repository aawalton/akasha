import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const apiShape = {
  id: "01a0e172-7749-7e43-bba1-fc59fde42b86",
  type: "page-type/route",
  slug: "api-shape",
  definition: "the shape of a page type a browser asks for",
  code: "ts",
  urlPath: "api/shape",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "This route exports `action` alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The screens any page falls back to read a page type's shape through this route.",
    },
  ],
} as const satisfies Route
