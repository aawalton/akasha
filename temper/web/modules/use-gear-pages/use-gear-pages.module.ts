import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useGearPages = {
  id: "01a0e107-cf3c-7860-82f3-d5a0a554c6cf",
  type: "page-type/module",
  slug: "use-gear-pages",
  definition: "the gear pages a screen reads for the skill catalogue, live while it is open",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The gear page reads sit apart from the catalogue hook so each file stays small.",
    },
  ],
} as const satisfies Module
