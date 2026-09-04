import type { Module } from "@akasha/code-system/module"

export const errorsAddonEntry = {
  id: "01a060d8-091a-7ce1-8550-de2e11a20429",
  pageTypeSlug: "module",
  slug: "errors-addon-entry",
  definition: "what the error add-on does as the game loads it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Listening begins before saved variables are ready.",
    },
    {
      invariantKind: "departure",
      statement: "Saved variables are opened through the capture writer.",
    },
  ],
} as const satisfies Module
