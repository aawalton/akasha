import type { Route } from "@akasha/code/route"

export const apiWatcherUpsertMinedQuests = {
  id: "01a082aa-3e30-76e3-bcc6-cec49c69facc",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-watcher-upsert-mined-quests",
  definition: "the mined quests the watcher posts",
  code: "ts",
  urlPath: "api/watcher/upsert-mined-quests",
  invariants: [
    {
      invariantKind: "gap",
      statement: "No mined quest posted here is kept.",
    },
    {
      invariantKind: "constraint",
      statement: "A row sits inside a page's body, and the store writes a path and a whole body.",
    },
    {
      invariantKind: "departure",
      statement: "This route answers 503 and says plainly that nothing was kept.",
    },
  ],
} as const satisfies Route
