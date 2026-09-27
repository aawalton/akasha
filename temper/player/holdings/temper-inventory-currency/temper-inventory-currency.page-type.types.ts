import type { Bankable } from "akasha/temper/player/holdings/temper-inventory-currency/properties/bankable.boolean-property.types.ts"
import type { EsoCurrencyConstant } from "akasha/temper/player/holdings/temper-inventory-currency/properties/eso-currency-constant.text-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperInventoryCurrency = TemperThing & {
  key: Key
  displayOrder: DisplayOrder
  esoCurrencyConstant?: EsoCurrencyConstant
  bankable?: Bankable
}
