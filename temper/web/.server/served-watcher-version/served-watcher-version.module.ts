import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const servedWatcherVersion = {
  id: "01a0640f-850f-75fc-8894-4e1d0d24e30c",
  type: "page-type/module",
  slug: "served-watcher-version",
  definition: "the watcher version the server is handing out",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stamp file that is absent or empty is taken as no version served.",
    },
  ],
} as const satisfies Module
