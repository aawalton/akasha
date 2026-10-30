import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const temperHandover = {
  id: "01a0bb8f-d316-75c8-b3d6-0f9e6134e682",
  type: "page-type/route",
  slug: "temper-handover",
  definition: "the path a browser opens with a code from alanwalton.com",
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
  createdAt: "2026-09-19T21:26:00.214Z",
  updatedAt: "2026-10-30T15:54:31.792Z",
} as const satisfies Route
