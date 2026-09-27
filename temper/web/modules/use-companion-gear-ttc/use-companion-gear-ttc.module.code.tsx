"use client"

import { usePages } from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import {
  COMPANION_GEAR_TTC_TYPES,
  type CompanionGearTtc,
  type CompanionGearTtcType,
  companionGearTtcFrom,
  holdCompanionGearTtc,
} from "akasha/temper/economy/trading/pricing/modules/companion-gear-price-lookup/companion-gear-price-lookup.module.code.ts"
import { useMemo } from "react"

const EVERY = 500

export function useCompanionGearTtc(): CompanionGearTtc | null {
  const types = COMPANION_GEAR_TTC_TYPES
  const armorPiece = usePages({ pageTypeSlug: types.armorPiece, limit: EVERY })
  const jewelrySlot = usePages({ pageTypeSlug: types.jewelrySlot, limit: EVERY })
  const weaponType = usePages({ pageTypeSlug: types.weaponType, limit: EVERY })
  const armorWeight = usePages({ pageTypeSlug: types.armorWeight, limit: EVERY })
  const trait = usePages({ pageTypeSlug: types.trait, limit: EVERY })
  const quality = usePages({ pageTypeSlug: types.quality, limit: EVERY })
  const read = [armorPiece, jewelrySlot, weaponType, armorWeight, trait, quality]
  const failed = read.find((one) => one.error !== null)?.error ?? null
  const loading = read.some((one) => one.isLoading)
  const ttc = useMemo(() => {
    if (loading) return null
    const byKind = {
      armorPiece: armorPiece.rows,
      jewelrySlot: jewelrySlot.rows,
      weaponType: weaponType.rows,
      armorWeight: armorWeight.rows,
      trait: trait.rows,
      quality: quality.rows,
    } satisfies Record<CompanionGearTtcType, unknown>
    return holdCompanionGearTtc(companionGearTtcFrom((kind) => byKind[kind]))
  }, [
    loading,
    armorPiece.rows,
    jewelrySlot.rows,
    weaponType.rows,
    armorWeight.rows,
    trait.rows,
    quality.rows,
  ])
  if (failed !== null) throw failed
  return ttc
}
