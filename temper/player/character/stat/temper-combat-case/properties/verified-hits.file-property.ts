import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const verifiedHits = {
  id: "01a15f6b-eb31-7230-80d8-7692f40f0103",
  type: "page-type/file-property",
  slug: "verified-hits",
  propertySlug: "verified-hits",
  definition: "the hits a build landed in fights, and the reading their formula takes",
  extensions: ["json"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The file names the reading and the game version its tooltip was read under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file keeps the tooltip text its formula takes as the game gave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file keeps each hit with the effects the fight log had on its target.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-21T17:04:30.512Z",
  updatedAt: "2026-10-21T17:04:30.512Z",
} as const satisfies FileProperty
