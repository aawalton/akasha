import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionRole = TemperCompanionThing

export const temperCompanionRole = {
  id: "01a05fcd-41a8-7cf6-b803-033e5142d8cf",
  pageTypeSlug: "page-type",
  slug: "temper-companion-role",
  definition: "a mix of parts one companion plays at once",
  pluralSlug: "temper-companion-roles",
  extendsSlug: ["page-type/temper-companion-thing"],
  properties: [{ pagePropertySlug: "key", required: true, many: false }],
} as const satisfies PageType
