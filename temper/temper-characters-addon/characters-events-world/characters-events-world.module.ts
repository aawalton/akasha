import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersEventsWorld = {
  id: "01a0632d-cc07-702c-b838-1700356d3d00",
  pageTypeSlug: "module",
  slug: "characters-events-world",
  definition: "what this add-on does when the played character's progress in the world changes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A finished quest counts as a daily writ only where its type is crafting.",
    },
  ],
} as const satisfies Module
