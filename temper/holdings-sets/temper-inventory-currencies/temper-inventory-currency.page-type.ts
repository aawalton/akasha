import type { PageType } from "@akasha/pages/page-type"
import type { TemperThing } from "../../things/temper-thing.page-type.types.ts"

export type TemperInventoryCurrency = TemperThing

export const temperInventoryCurrency = {
  id: "01a05fcb-fd2c-79e2-b426-908dcfb8bf4a",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-inventory-currency",
  definition: "a kind of money an account has an amount of",
  pluralSlug: "temper-inventory-currencies",
  extends: ["page-type/temper-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
} as const satisfies PageType
