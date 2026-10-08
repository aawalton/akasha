import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const kioskNamesLoading = {
  id: "01a0e0b5-f996-7000-99ed-1f1b5400201e",
  type: "page-type/module",
  slug: "kiosk-names-loading",
  definition:
    "the guild trader pages read on the server as kiosk names, and read again as they change",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The kiosk names are read the first time they are asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a guild trader page has them read again.",
    },
  ],
  createdAt: "2026-09-27T02:33:37.430Z",
  updatedAt: "2026-09-27T02:35:33.000Z",
} as const satisfies Module
