import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const verifiedStats = {
  id: "01a13b68-e80f-777b-8625-32a325ab6946",
  type: "page-type/file-property",
  slug: "verified-stats",
  propertySlug: "verified-stats",
  definition: "a build, the bar held, and the stats the game reported while it was held",
  extensions: ["json"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The file names the build by the hash the add-on saved for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file keeps each pinned stat and each known gap with the game's number.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-14T17:14:53.326Z",
  updatedAt: "2026-10-14T17:14:53.326Z",
} as const satisfies FileProperty
