import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperProgressThing } from "../progress-things/temper-progress-thing.page-type.ts"

export type TemperConditionField = TemperProgressThing

export const temperConditionField = {
  id: "01a07202-f0fd-7b35-bff8-c4cc5e25da86",
  pageTypeSlug: "page-type",
  slug: "temper-condition-field",
  definition: "one thing about an item that a rule condition tests",
  pluralSlug: "temper-condition-fields",
  extendsSlug: ["page-type/temper-progress-thing"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The key is the field an item rule writes.",
    },
    {
      invariantKind: "departure",
      statement: "The title is the field a reader is shown.",
    },
    {
      invariantKind: "departure",
      statement: "A condition names one field here and what that field is tested against.",
    },
    {
      invariantKind: "departure",
      statement: "A field whose key ends in Op says how another field's number is compared.",
    },
  ],
} as const satisfies PageType
