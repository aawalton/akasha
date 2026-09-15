import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventorySnapshotReading = {
  id: "01a068e2-226c-7031-8b22-521c27850f03",
  type: "module",
  slug: "inventory-snapshot-reading",
  definition: "a reading of a player's inventory, found by its page and read from its data file",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The latest reading for an account is the reading captured last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chunk pages record how the transport divided a reading and nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bytes are read from the snapshot's own data file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bytes in that data file are already rejoined.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading nothing has answers as nothing rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type that goes unread is refused by name.",
    },
  ],
} as const satisfies Module
