import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setCatalogGate = {
  id: "01a0de3d-b262-7edd-adda-aa5233b03c71",
  type: "page-type/module",
  slug: "set-catalog-gate",
  definition: "what shows its content only once the set catalogue is read",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The content is handed the catalogue, so nothing in it reads a catalogue unread.",
    },
  ],
} as const satisfies Module
