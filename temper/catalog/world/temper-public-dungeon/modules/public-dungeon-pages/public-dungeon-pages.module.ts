import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const publicDungeonPages = {
  id: "01a0d8a5-1cee-7341-899a-4f34c7fb7a44",
  type: "page-type/module",
  slug: "public-dungeon-pages",
  definition: "every public dungeon page, in the order of its display order",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "These pages are imported rather than read, so an add-on and a browser hold them as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No glob finds these pages, since an add-on's Lua has no glob.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A public dungeon page is in the lists only once this module imports it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order is taken from each page's display order rather than from the imports.",
    },
  ],
} as const satisfies Module
