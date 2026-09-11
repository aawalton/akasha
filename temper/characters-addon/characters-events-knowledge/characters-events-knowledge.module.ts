import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const charactersEventsKnowledge = {
  id: "01a0632d-cbf1-7021-bce5-f22d1d896a24",
  type: "module",
  slug: "characters-events-knowledge",
  definition: "what this add-on does when what the played character knows changes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A quest leaving the journal unfinished is read as nothing learned.",
    },
  ],
} as const satisfies Module
