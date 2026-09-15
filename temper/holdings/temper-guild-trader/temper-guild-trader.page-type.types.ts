import type { KioskId } from "akasha/temper/holdings/temper-guild-trader/properties/kiosk-id.number-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperGuildTrader = TemperThing & {
  kioskId: KioskId
}
