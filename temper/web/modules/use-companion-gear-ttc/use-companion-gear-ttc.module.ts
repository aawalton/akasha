import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useCompanionGearTtc = {
  id: "01a0e0bf-70b2-701d-b71a-f3e0311fcb51",
  type: "page-type/module",
  slug: "use-companion-gear-ttc",
  definition:
    "the Tamriel Trade Centre numbers for companion gear as a browser reads them from the companion pages",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until every page type is read there are no numbers rather than empty ones.",
    },
  ],
} as const satisfies Module
