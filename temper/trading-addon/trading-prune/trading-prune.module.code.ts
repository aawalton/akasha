import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-globals"
import { ADDON_NAME } from "../trading-constants/trading-constants.module.code.ts"
import { getSavedVariables } from "../trading-saved-variables/trading-saved-variables.module.code.ts"

export const EXPIRY_SECONDS = 14 * 24 * 60 * 60

export function pruneExpiredListings(): undefined {
  const sv = getSavedVariables()
  const now = GetTimeStamp()
  const cutoff = now - EXPIRY_SECONDS
  let totalPruned = 0

  for (const [, guild] of Object.entries(sv.guilds)) {
    for (const [uid, listing] of Object.entries(guild.listings)) {
      if (listing.capturedAt < cutoff) {
        delete guild.listings[uid]
        totalPruned++
      }
    }
  }

  if (totalPruned > 0) {
    d(`[${ADDON_NAME}] Pruned ${totalPruned} expired listings`)
  }
}
