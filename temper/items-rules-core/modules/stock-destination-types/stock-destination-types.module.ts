import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stockDestinationTypes = {
  id: "01a060d9-44cd-7492-b42b-190488055dda",
  type: "module",
  slug: "stock-destination-types",
  definition: "what a stock-destination decision is given to read about a character's holdings",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stock decision reads holdings through the context handed to the decision.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character priority is the order the characters are offered the stock in.",
    },
  ],
} as const satisfies Module
