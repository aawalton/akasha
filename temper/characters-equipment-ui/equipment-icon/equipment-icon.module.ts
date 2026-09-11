import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const equipmentIcon = {
  id: "01a06333-1bba-7ed5-888a-b5a3ca70eacf",
  type: "module",
  slug: "equipment-icon",
  definition: "the picture that represents one piece of equipment",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A picture that fails to load is replaced rather than left broken.",
    },
  ],
} as const satisfies Module
