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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The toast for a build that will not decode reads its wording from a web phrase page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character build's page and a companion build's page draw that build's editor.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A companion build's editor reads gear slots the skill catalogue holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each build editor is drawn only once the skill catalogue is held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character's page and a companion's page draw the editor on their current build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's or companion's own properties are listed beneath that editor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character or companion with no current build is drawn as any other page is.",
    },
  ],
  createdAt: "2026-09-08T19:56:07.656Z",
  updatedAt: "2026-10-20T01:58:03.043Z",
} as const satisfies Route
