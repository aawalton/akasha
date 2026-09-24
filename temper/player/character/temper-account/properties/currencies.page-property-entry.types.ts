import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { CurrencyAmount } from "akasha/temper/player/character/temper-account/properties/currency-amount.number-property.types.ts"
import type { CurrencyKey } from "akasha/temper/player/character/temper-account/properties/currency-key.relation-property.types.ts"
import type { CurrencyScope } from "akasha/temper/player/character/temper-account/properties/currency-scope.text-property.types.ts"
import type { LastScannedAt } from "akasha/temper/player/character/temper-account/properties/last-scanned-at.instant-property.types.ts"
import type { EsoCharacterId } from "akasha/temper/thing/properties/eso-character-id.text-property.types.ts"

export type Currencies = "jsonl"

export type CurrenciesRow = {
  id: Id
  scope: CurrencyScope
  esoCharacterId?: EsoCharacterId
  currencyKey: CurrencyKey
  amount: CurrencyAmount
  lastScannedAt?: LastScannedAt
}
