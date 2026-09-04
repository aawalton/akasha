import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkAddonDependencyCycle = {
  id: "01a06297-7f6a-7484-a95a-2bbf183e482d",
  pageTypeSlug: "module",
  slug: "check-addon-dependency-cycle",
  definition: "the run judging whether the game add-on load graph is acyclic",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The population this run states is the add-ons on the roster.",
    },
    {
      invariantKind: "constraint",
      statement: "An add-on examined is an add-on whose manifest was read.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty roster ends the run rather than passing it.",
    },
  ],
} as const satisfies Module
