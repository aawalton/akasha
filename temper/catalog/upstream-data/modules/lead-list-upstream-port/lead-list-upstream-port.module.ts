import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const leadListUpstreamPort = {
  id: "01a1836b-0298-734f-a5d5-474749ba0517",
  type: "page-type/module",
  slug: "lead-list-upstream-port",
  definition: "the antiquity lead table upstream Lead List carries, copied out as TypeScript",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Lead List's English location file is the only Lead List file read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is copied in Lead List's own wording, and no wording is mended here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row naming an id other than its key is refused rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The table is written whole into its parts and the module joining them, in one landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part holds 50 rows in id order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table needing a part no module holds is refused, and says how many it needs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run leaving the table empty is refused rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The location types are written beside the table, in Lead List's own strings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Of Lead List's strings, only the ones the add-on names are written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string the add-on names that Lead List lacks is refused rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file already holding what a run would write is left out of that landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that would change no file lands nothing and says so.",
    },
  ],
  createdAt: "2026-10-28T16:49:50.742Z",
  updatedAt: "2026-10-28T17:05:33.724Z",
} as const satisfies Module
