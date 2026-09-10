import type { TemperThing } from "../../things/temper-thing.page-type.types.ts"
import type { KioskId } from "./properties/kiosk-id.number-property.types.ts"

export type TemperGuildTrader = TemperThing & {
  kioskId: KioskId
}
