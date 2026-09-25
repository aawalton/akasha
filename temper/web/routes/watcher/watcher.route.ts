import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const watcher = {
  id: "01a08305-acff-78b1-8828-d1255b856bde",
  type: "page-type/route",
  slug: "watcher",
  definition: "how the player's watcher is running and what it last sent",
  code: "tsx",
  urlPath: "watcher",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What the watcher last sent is shown again as soon as it changes.",
    },
  ],
} as const satisfies Route
