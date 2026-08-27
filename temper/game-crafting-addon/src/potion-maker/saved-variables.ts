import { asRecord } from "./casts"
import { SAVED_VARIABLES_NAME } from "./constants"
import { PotMaker } from "./state"
import type { AccountSettings, Favorite, PlayerSettings } from "./types"

let playerSettings: PlayerSettings | undefined
let accountSettings: AccountSettings | undefined

function asPlayerSettings(value: unknown): PlayerSettings {
  return value as PlayerSettings
}

function asAccountSettings(value: unknown): AccountSettings {
  return value as AccountSettings
}

export function initializeSavedVariables(this: void): undefined {
  const player = asPlayerSettings(
    ZO_SavedVars.NewCharacterIdSettings(
      SAVED_VARIABLES_NAME,
      1,
      undefined,
      PotMaker.dataDefaults,
      undefined
    )
  )

  const accountDefaults = asRecord(PotMaker.accountDefaults)
  const playerBag = asRecord(player)
  if (playerBag.showAsDefault !== undefined) {
    for (const key in accountDefaults) {
      accountDefaults[key] = playerBag[key]
      playerBag[key] = undefined
    }
  }

  const account = asAccountSettings(
    ZO_SavedVars.NewAccountWide(SAVED_VARIABLES_NAME, 1, undefined, PotMaker.accountDefaults)
  )

  if (account.favorites === undefined) {
    account.favorites = player.favorites ?? {}
  } else if (player.favorites !== undefined) {
    for (const k in player.favorites) {
      const fav = player.favorites[k]
      if (fav !== undefined) {
        account.favorites[k] = fav
      }
    }
  }
  player.favorites = undefined

  for (const id in account.favorites) {
    const data = account.favorites[id]
    if (data === undefined || !(data.samePotion === true && data.sameTraits === true)) {
      delete account.favorites[id]
    }
  }

  playerSettings = player
  accountSettings = account
}

export function getPlayerSettings(this: void): PlayerSettings {
  if (playerSettings === undefined) {
    throw new Error("TemperPotions saved variables not initialized")
  }
  return playerSettings
}

export function getAccountSettings(this: void): AccountSettings {
  if (accountSettings === undefined) {
    throw new Error("TemperPotions saved variables not initialized")
  }
  return accountSettings
}

export function getSavedFavorites(this: void): Record<string, Favorite> {
  return getAccountSettings().favorites
}
