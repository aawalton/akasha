import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const apiWatcherUpsertMinedQuests = {
  id: "01a082aa-3e30-76e3-bcc6-cec49c69facc",
  type: "page-type/route",
  slug: "api-watcher-upsert-mined-quests",
  definition: "the mined quests the watcher posts",
  code: "ts",
  urlPath: "api/watcher/upsert-mined-quests",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every mined quest posted here is kept in the quests of the mine page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quest posted again replaces the row with its quest id rather than adding one.",
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
      statement: "This route answers with the count of quests kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A post the store refuses keeps nothing and is answered 503 with the store's reason.",
    },
  ],
} as const satisfies Route
