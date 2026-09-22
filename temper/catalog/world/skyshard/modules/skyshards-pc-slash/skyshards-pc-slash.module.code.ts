import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

function myPrint(this: void, message: string): undefined {
  CHAT_ROUTER.AddSystemMessage(message)
}

function showMyPosition(this: void): undefined {
  if (SetMapToPlayerLocation() === SET_MAP_RESULT_MAP_CHANGED) {
    CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
  }

  const [x, y] = GetMapPlayerPosition("player")

  const locX = string.format("%02.04f", zo_round(x * 10000) / 10000)
  const locY = string.format("%02.04f", zo_round(y * 10000) / 10000)

  const [zone, subzone] = MAP_PINS.GetZoneAndSubzone(false, true, false)
  myPrint(
    zo_strformat("<<1>>: <<2>>\xC3\x97<<3>> (<<4>>/<<5>>)", GetMapName(), locX, locY, zone, subzone)
  )
}

export function registerSlashCommands(this: void): undefined {
  SLASH_COMMANDS["/skypos"] = showMyPosition
}
