import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type TierAchievements = "jsonl"

export const tierAchievements = {
  id: "01a05fca-cb88-781e-b113-6703da6a0689",
  pageTypeSlug: "page-property-entry",
  slug: "tier-achievements",
  propertySlug: "tier-achievements",
  definition: "the achievements a scribing source's tiers are counted by, one to a line",
  properties: [
    { pagePropertySlug: "achievement-name", required: true, many: false },
    { pagePropertySlug: "achievement-id", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
