import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const apiWatcherUpsertMinedItems = {
  id: "01a082a9-b67b-7606-b042-c4f5c9e5d6ac",
  pageTypeSlug: "route",
  type: "route",
  slug: "api-watcher-upsert-mined-items",
  definition: "the mined items the watcher posts",
  code: "ts",
  urlPath: "api/watcher/upsert-mined-items",
  invariants: [
    {
      invariantKind: "gap",
      statement: "No mined item posted here is kept.",
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
