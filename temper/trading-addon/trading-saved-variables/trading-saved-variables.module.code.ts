import "akasha/temper/eso-types/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso-types/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import { SAVED_VARIABLES_NAME } from "../trading-constants/trading-constants.module.code.ts"
import {
  type GuildSnapshot,
  SAVED_VARIABLES_DEFAULTS,
  type SavedVariablesData,
} from "../trading-types/trading-types.module.code.ts"
export let savedVarsInstance: SavedVariablesData | undefined

export function initializeSavedVariables(): SavedVariablesData {
  savedVarsInstance = ZO_SavedVars.NewAccountWide(
    SAVED_VARIABLES_NAME,
    1,
    undefined,
    SAVED_VARIABLES_DEFAULTS
  )

  savedVarsInstance.displayName = GetDisplayName()
  savedVarsInstance.worldName = GetWorldName()

  return savedVarsInstance
}

export function getSavedVariables(): SavedVariablesData {
  if (!savedVarsInstance) {
    throw new Error("Saved variables not initialized. Call initializeSavedVariables() first.")
  }
  return savedVarsInstance
}

export function ensureGuild(guildName: string, kioskName: string): GuildSnapshot {
  const sv = getSavedVariables()
  if (!sv.guilds[guildName]) {
    sv.guilds[guildName] = {
      guildName: guildName,
      kioskName: kioskName,
      listings: {},
    }
  }
  sv.guilds[guildName].kioskName = kioskName
  return sv.guilds[guildName]
}
