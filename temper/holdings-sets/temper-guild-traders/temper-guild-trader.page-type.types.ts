import type { KioskId } from "akasha/temper/holdings-sets/temper-guild-traders/properties/kiosk-id.number-property.types.ts"
import type { TemperThing } from "akasha/temper/things/temper-thing.page-type.types.ts"

export type TemperGuildTrader = TemperThing & {
  kioskId: KioskId
}
