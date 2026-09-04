import type { Module } from "@akasha/code-system/module"

export const eventsAddonLoaded = {
  id: "01a06157-835a-79f6-9dfd-17774a525329",
  pageTypeSlug: "module",
  slug: "events-addon-loaded",
  definition: "what starts once the game says this add-on has loaded",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every timer this add-on holds is started from here.",
    },
  ],
} as const satisfies Module
