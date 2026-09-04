import type { NumberProperty } from "@akasha/pages-system/number-property"

export type KioskId = number

export const kioskId = {
  id: "01a05fcb-fd2c-797f-87db-5d4343649f75",
  pageTypeSlug: "number-property",
  slug: "kiosk-id",
  propertySlug: "kiosk-id",
  definition: "the number The Elder Scrolls Online gives a trading kiosk",
  max: null,
} as const satisfies NumberProperty
