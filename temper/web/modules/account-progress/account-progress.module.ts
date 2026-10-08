import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const accountProgress = {
  id: "01a06421-f74b-7ac7-a2c3-4120a9e80006",
  type: "page-type/module",
  slug: "account-progress",
  definition: "the account-wide progress worked out from the catalogs and the saved data",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The zone completion union reads the per-character progress alone and takes no catalog.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-15T18:43:51.000Z",
} as const satisfies Module
