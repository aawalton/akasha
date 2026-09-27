"use client"

import type { CompanionGearTtc } from "akasha/temper/economy/trading/pricing/modules/companion-gear-price-lookup/companion-gear-price-lookup.module.code.ts"
import { useCompanionGearTtc } from "akasha/temper/web/modules/use-companion-gear-ttc/use-companion-gear-ttc.module.code.tsx"
import type { ReactNode } from "react"

export function CompanionGearTtcGate({
  children,
  fallback,
}: {
  children: (ttc: CompanionGearTtc) => ReactNode
  fallback: ReactNode
}) {
  const ttc = useCompanionGearTtc()
  return <>{ttc === null ? fallback : children(ttc)}</>
}
