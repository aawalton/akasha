import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperProgressThing } from "../progress-things/temper-progress-thing.page-type.ts"
import type { Floor } from "./properties/floor.number-property.ts"
import type { OverrideReason } from "./properties/override-reason.text-property.ts"

export type TemperCompletionOverride = TemperProgressThing & {
  floor: Floor
  overrideReason: OverrideReason
}

export const temperCompletionOverride = {
  id: "01a05fd0-3aa7-7efc-9f5f-080d0b9f5bd0",
  pageTypeSlug: "page-type",
  slug: "temper-completion-override",
  definition: "a completion count set by hand where the game reports it too low",
  pluralSlug: "temper-completion-overrides",
  extendsSlug: ["page-type/temper-progress-thing"],
  partSlugs: ["number-property/floor", "text-property/override-reason"],
  properties: [
    { pagePropertySlug: "account-page", required: true, many: false },
    { pagePropertySlug: "character", required: true, many: false },
    { pagePropertySlug: "completion-card-id", required: true, many: false },
    { pagePropertySlug: "completion-item-path", required: true, many: true, max: null },
    { pagePropertySlug: "floor", required: true, many: false },
    { pagePropertySlug: "override-reason", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A count the game reports above the floor is taken as the game reports.",
    },
    {
      invariantKind: "departure",
      statement: "One override answers one item of one card for one character.",
    },
  ],
} as const satisfies PageType
