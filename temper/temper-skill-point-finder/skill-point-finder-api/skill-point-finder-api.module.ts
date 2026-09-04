import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointFinderApi = {
  id: "01a060ec-5830-7970-9982-411f52b14cd8",
  pageTypeSlug: "module",
  slug: "skill-point-finder-api",
  definition: "the skill point window reachable by another add-on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The window is offered as one global object the game loads.",
    },
  ],
} as const satisfies Module
