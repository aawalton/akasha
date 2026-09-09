import type { PageType } from "@akasha/pages/page-type"
import type { TemperProgressThing } from "../progress-things/temper-progress-thing.page-type.ts"

export type TemperItemAction = TemperProgressThing

export const temperItemAction = {
  id: "01a071e1-92d5-7458-b0c0-499ac75aeb8b",
  pageTypeSlug: "page-type",
  slug: "temper-item-action",
  definition: "one thing an item rule does to an item the rule matches",
  pluralSlug: "temper-item-actions",
  extends: ["page-type/temper-progress-thing"],
  properties: [{ pageProperty: "text-property/description", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The slug is the action an item rule writes.",
    },
    {
      invariantKind: "departure",
      statement: "The title is the action a reader is shown.",
    },
  ],
} as const satisfies PageType
