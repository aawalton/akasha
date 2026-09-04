import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointFinderMenu = {
  id: "01a060ec-5840-75bd-916c-91a32fd40413",
  pageTypeSlug: "module",
  slug: "skill-point-finder-menu",
  definition: "the skill point window's settings inside the game's own add-on menu",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A setting is held per character rather than per account.",
    },
  ],
} as const satisfies Module
