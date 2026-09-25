import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const apiWatcherUpsertMinedItems = {
  id: "01a082a9-b67b-7606-b042-c4f5c9e5d6ac",
  type: "page-type/route",
  slug: "api-watcher-upsert-mined-items",
  definition: "the mined items the watcher posts",
  code: "ts",
  urlPath: "api/watcher/upsert-mined-items",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every mined item posted here is kept in the items of the mine page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item posted again replaces the row with its item id rather than adding one.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A row sits inside a page's body.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The store writes a path and a whole body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This route answers with the count of items kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A post the store refuses keeps nothing and is answered 503 with the store's reason.",
    },
  ],
} as const satisfies Route
