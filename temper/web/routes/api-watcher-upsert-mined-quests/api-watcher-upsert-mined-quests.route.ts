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
      decisionKind: "decision-kind/gap",
      statement: "No mined quest posted here is kept.",
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
      statement: "This route answers 503 and says plainly that nothing was kept.",
    },
  ],
} as const satisfies Route
