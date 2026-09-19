import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const temperHandover = {
  id: "01a0bb8f-d316-75c8-b3d6-0f9e6134e682",
  type: "page-type/route",
  slug: "temper-handover",
  definition: "where a player arrives from alanwalton.com carrying a code",
  code: "ts",
  urlPath: "handover",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This route draws nothing, and answers with a redirect either way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This route is reached without a session, because the code is what signs a player in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code handed to any other host under tempereso.com is spent on tempereso.com.",
    },
  ],
} as const satisfies Route
