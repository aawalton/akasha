import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const collectionsAddonLoaded = {
  id: "01a0624c-a660-7bb7-a785-531905b18e57",
  type: "module",
  slug: "collections-addon-loaded",
  definition: "what starts each tracker once the game says this add-on has loaded",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every tracker this add-on ships is started from here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The order the trackers are started in is the order the consolidated add-on used.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No tracker is started twice.",
    },
  ],
} as const satisfies Module
