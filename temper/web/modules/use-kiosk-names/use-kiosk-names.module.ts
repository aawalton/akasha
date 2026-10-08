import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useKioskNames = {
  id: "01a0e0b5-f996-7001-9bab-93d329240b99",
  type: "page-type/module",
  slug: "use-kiosk-names",
  definition:
    "the kiosk names a browser reads from the guild trader pages, read again as they change",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the pages are read no kiosk has a name, and each answers with its number.",
    },
  ],
  createdAt: "2026-09-27T02:33:37.430Z",
  updatedAt: "2026-09-27T02:35:33.000Z",
} as const satisfies Module
