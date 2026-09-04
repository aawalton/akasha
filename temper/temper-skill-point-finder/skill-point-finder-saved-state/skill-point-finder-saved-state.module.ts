import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointFinderSavedState = {
  id: "01a060ec-5841-70ce-a022-116830ebd04a",
  pageTypeSlug: "module",
  slug: "skill-point-finder-saved-state",
  definition: "the skill point window's own saved variables, read forward from older shapes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A saved shape from an older version is read forward on load.",
    },
    {
      invariantKind: "constraint",
      statement: "The game is the only writer of a saved-variables file.",
    },
  ],
} as const satisfies Module
