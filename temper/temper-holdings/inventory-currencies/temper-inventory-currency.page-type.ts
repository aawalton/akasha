import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperThing } from "../../temper-things/temper-thing.page-type.ts"

export type TemperInventoryCurrency = TemperThing

export const temperInventoryCurrency = {
  id: "01a05fcb-fd2c-79e2-b426-908dcfb8bf4a",
  pageTypeSlug: "page-type",
  slug: "temper-inventory-currency",
  definition: "a kind of money an account holds an amount of",
  pluralSlug: "temper-inventory-currencies",
  extendsSlug: ["page-type/temper-thing"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
  ],
} as const satisfies PageType
