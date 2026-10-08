import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const skillPointAchievements = {
  id: "01a0e0fe-fb56-7169-b742-ba2b31b2ac39",
  type: "page-type/page-property-entry",
  slug: "skill-point-achievements",
  propertySlug: "skill-point-achievements",
  definition: "the achievements a skill point source counts, one achievement to a line",
  properties: [{ pageProperty: "number-property/eso-achievement-id", required: true, many: false }],
  types: "ts",
  createdAt: "2026-09-27T03:53:22.006Z",
  updatedAt: "2026-09-27T03:53:34.000Z",
} as const satisfies PagePropertyEntry
