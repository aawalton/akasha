import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { heldReading } from "akasha/page/service/modules/held-reading/held-reading.module.code.ts"
import {
  heldKioskNames,
  holdKioskNames,
  KIOSK_NAME_FIELDS,
  type KioskNames,
  kioskNamesFrom,
} from "akasha/temper/economy/trading/pricing/modules/kiosk-location-name/kiosk-location-name.module.code.ts"
import { temperGuildTrader } from "akasha/temper/player/holdings/temper-guild-trader/temper-guild-trader.page-type.ts"

const EVERY = 500

const kept = heldReading([temperGuildTrader.slug], async () => {
  const { rows } = await getPages({
    pageTypeSlug: temperGuildTrader.slug,
    select: KIOSK_NAME_FIELDS,
    limit: EVERY,
  })
  return holdKioskNames(kioskNamesFrom(rows))
})

export async function loadKioskNames(): Promise<KioskNames> {
  return heldKioskNames() ?? (await kept())
}
