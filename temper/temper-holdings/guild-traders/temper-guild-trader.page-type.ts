import type { PageType } from "@akasha/pages/page-type"
import type { TemperThing } from "../../things/temper-thing.page-type.ts"
import type { KioskId } from "./properties/kiosk-id.number-property.ts"

export type TemperGuildTrader = TemperThing & {
  kioskId: KioskId
}

export const temperGuildTrader = {
  id: "01a05fcb-fd2c-7cff-9144-3d6612a42fa5",
  pageTypeSlug: "page-type",
  slug: "temper-guild-trader",
  definition: "a kiosk a guild rents to sell from",
  pluralSlug: "temper-guild-traders",
  extends: ["page-type/temper-thing"],
  parts: ["number-property/kiosk-id"],
  properties: [{ pagePropertySlug: "number-property/kiosk-id", required: true, many: false }],
} as const satisfies PageType
