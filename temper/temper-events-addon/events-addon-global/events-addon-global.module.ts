import type { Module } from "@akasha/code/module"

export const eventsAddonGlobal = {
  id: "01a06157-8355-7167-94a2-afe46cd04bb8",
  pageTypeSlug: "module",
  slug: "events-addon-global",
  definition: "the name another add-on reaches this one by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Another add-on reaches this add-on through the global rather than through an import.",
    },
    {
      invariantKind: "departure",
      statement: "The global has the add-on's name and version and nothing else.",
    },
  ],
} as const satisfies Module
