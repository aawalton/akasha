import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const tierAchievements = {
  id: "01a05fca-cb88-781e-b113-6703da6a0689",
  type: "page-type/page-property-entry",
  slug: "tier-achievements",
  propertySlug: "tier-achievements",
  definition: "the achievements a scribing source's tiers are counted by, one to a line",
  properties: [
    { pageProperty: "text-property/achievement-name", required: true, many: false },
    { pageProperty: "number-property/achievement-id", required: true, many: false },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:45:21.032Z",
  updatedAt: "2026-09-21T15:29:38.000Z",
} as const satisfies PagePropertyEntry
