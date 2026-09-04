import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperProgressThing } from "../progress-things/temper-progress-thing.page-type.ts"
import type { FullName } from "./properties/full-name.text-property.ts"

export type TemperRotationBreakdownRow = TemperProgressThing & {
  fullName: FullName
}

export const temperRotationBreakdownRow = {
  id: "01a05fc9-9a03-795c-b95b-c04997733011",
  pageTypeSlug: "page-type",
  slug: "temper-rotation-breakdown-row",
  definition: "one figure a rotation is broken down into",
  pluralSlug: "temper-rotation-breakdown-rows",
  extendsSlug: ["page-type/temper-progress-thing"],
  partSlugs: ["text-property/full-name"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "full-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The title is the short name a narrow column is headed by.",
    },
  ],
} as const satisfies PageType
