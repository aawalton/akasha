import type { Module } from "@akasha/code-system/module"

export const watcherDir = {
  id: "01a0640f-850f-7f75-abe1-b02d6a21efda",
  pageTypeSlug: "module",
  slug: "watcher-dir",
  definition: "the folder the watcher's downloads are served out of",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder named relative is taken against the folder the server runs in.",
    },
  ],
} as const satisfies Module
