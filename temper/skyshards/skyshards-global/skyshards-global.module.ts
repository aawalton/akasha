import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skyshardsGlobal = {
  id: "01a061a8-9c65-7eb2-8892-234022bc7664",
  pageTypeSlug: "module",
  slug: "skyshards-global",
  definition: "the add-on's name and version, put where another add-on can read them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This global is the add-on's own name rather than a name the game owns.",
    },
  ],
} as const satisfies Module
