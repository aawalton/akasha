import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const verifiedTooltips = {
  id: "01a15c22-e9f5-74c6-a10b-6146d0edb047",
  type: "page-type/file-property",
  slug: "verified-tooltips",
  propertySlug: "verified-tooltips",
  definition:
    "a build's slotted skills, the tooltip text the game showed for each, and the stats held",
  extensions: ["json"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The file names the game version the tooltips were read under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file keeps each skill's tooltip text as the game gave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file keeps each pinned number and each known gap with the game's number.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-21T01:45:54.419Z",
  updatedAt: "2026-10-21T01:45:54.419Z",
} as const satisfies FileProperty
