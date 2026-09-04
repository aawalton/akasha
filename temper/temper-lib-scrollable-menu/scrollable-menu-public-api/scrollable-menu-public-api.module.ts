import type { Module } from "@akasha/code-system/module"

export const scrollableMenuPublicApi = {
  id: "01a06275-c449-763b-b921-cfa7dd2c3f9b",
  pageTypeSlug: "module",
  slug: "scrollable-menu-public-api",
  definition: "the placing of the library object and its constants into the global namespace",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The library is published on globalThis under LibScrollableMenu.",
    },
    {
      invariantKind: "departure",
      statement: "Every entry-type and highlight name is copied into _G as a separate global.",
    },
    {
      invariantKind: "departure",
      statement: "Update mode constants are published as three separate globals.",
    },
  ],
} as const satisfies Module
