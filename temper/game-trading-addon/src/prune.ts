import { ADDON_NAME } from "./constants"
import { getSavedVariables } from "./saved-variables"

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
