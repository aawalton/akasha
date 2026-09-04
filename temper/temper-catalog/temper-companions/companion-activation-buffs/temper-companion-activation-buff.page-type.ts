import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionActivationBuff = TemperCompanionThing

export const temperCompanionActivationBuff = {
  id: "01a05fcd-41a7-7f50-b3d4-a62fb6c122e1",
  pageTypeSlug: "page-type",
  slug: "temper-companion-activation-buff",
  definition: "a sort of buff a companion ability grants on activation",
  pluralSlug: "temper-companion-activation-buffs",
  extendsSlug: ["page-type/temper-companion-thing"],
  properties: [{ pagePropertySlug: "key", required: true, many: false }],
} as const satisfies PageType
