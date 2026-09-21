import { getCombinedZone } from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-map-zone/dungeon-champion-map-zone.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

function myPrint(message: string): undefined {
  CHAT_SYSTEM.AddMessage(message)
  return undefined
}

function showPosition(label: string | number): undefined {
  if (SetMapToPlayerLocation() === SET_MAP_RESULT_MAP_CHANGED) {
    CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
  }
  const [x, y] = GetMapPlayerPosition("player")
  const locX = string.format("%05.02f", zo_round(x * 10000) / 100)
  const locY = string.format("%05.02f", zo_round(y * 10000) / 100)
  myPrint(zo_strformat("<<1>>: <<2>>×<<3>> (<<4>>)", label, locX, locY, getCombinedZone()))
  return undefined
}

function showMyPosition(this: void): undefined {
  return showPosition(GetMapName())
}

function showMyPosition2(this: void): undefined {
  return showPosition(GetCurrentMapId())
}

export function registerSlashCommands(this: void): undefined {
  SLASH_COMMANDS["/dc_mypos"] = showMyPosition
  SLASH_COMMANDS["/dc_mypos2"] = showMyPosition2
  return undefined
}
