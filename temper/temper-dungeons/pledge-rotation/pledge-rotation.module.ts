import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const pledgeRotation = {
  id: "01a06031-70e5-7122-83f1-7221c174553d",
  pageTypeSlug: "module",
  slug: "pledge-rotation",
  definition: "which dungeon each quest giver asks for on the day an instant falls in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rotation is counted in whole days from the giver's own epoch.",
    },
    {
      invariantKind: "departure",
      statement: "A day here is the day the game resets on rather than the calendar day.",
    },
    {
      invariantKind: "constraint",
      statement: "A giver whose rotation has no dungeon at today's position is refused.",
    },
  ],
} as const satisfies Module
