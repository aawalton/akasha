import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  holdKioskNames,
  KIOSK_NAME_FIELDS,
  type KioskNames,
  kioskNamesFrom,
} from "akasha/temper/economy/trading/pricing/modules/kiosk-location-name/kiosk-location-name.module.code.ts"
import { temperGuildTrader } from "akasha/temper/player/holdings/temper-guild-trader/temper-guild-trader.page-type.ts"

export function holdKioskNamesFromCheckout(): KioskNames {
  const asked = asking(akashaRoot(), {
    pageTypeSlug: temperGuildTrader.slug,
    keys: KIOSK_NAME_FIELDS,
  } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  return holdKioskNames(kioskNamesFrom(asked.rows as readonly Value[]))
}
