"use client"

import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  type KioskNames,
  kioskNamesFrom,
  NO_KIOSK_NAMES,
} from "akasha/temper/economy/trading/pricing/modules/kiosk-location-name/kiosk-location-name.module.code.ts"
import { temperGuildTrader } from "akasha/temper/player/holdings/temper-guild-trader/temper-guild-trader.page-type.ts"
import { useMemo } from "react"

const EVERY = 500

export function useKioskNames(): KioskNames {
  const pages = usePages({ pageTypeSlug: temperGuildTrader.slug, limit: EVERY })
  const names = useMemo(
    () => (pages.isLoading ? NO_KIOSK_NAMES : kioskNamesFrom(pages.rows)),
    [pages.isLoading, pages.rows]
  )
  if (pages.error !== null) throw pages.error
  return names
}
