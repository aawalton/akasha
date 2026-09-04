import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const stockDestinationTypes = {
  id: "01a060d9-44cd-7492-b42b-190488055dda",
  pageTypeSlug: "module",
  slug: "stock-destination-types",
  definition: "what a stock-destination decision is given to read about a character's holdings",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stock decision reads holdings through the context handed to the decision.",
    },
    {
      invariantKind: "departure",
      statement: "The character priority is the order the characters are offered the stock in.",
    },
  ],
} as const satisfies Module
