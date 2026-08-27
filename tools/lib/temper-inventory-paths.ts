import { savedVarsFile as esoSavedVarsFile } from "@temper/shared-foundation-misc-eso-paths-resolve/eso-paths-resolve"

const SAVED_VARS =
  "/home/walton/.steam/steam/steamapps/compatdata/306130/pfx/drive_c/users/steamuser/Documents/Elder Scrolls Online/live/SavedVariables"

export const TEMPER_INVENTORY_LUA = `${SAVED_VARS}/TemperInventory.lua`

export const TEMPER_CHARACTERS_LUA = `${SAVED_VARS}/TemperCharacters.lua`

export async function savedVarsFile(name: string): Promise<string> {
  return esoSavedVarsFile(name)
}
