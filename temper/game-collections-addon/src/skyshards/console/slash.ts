function MyPrint(this: void, message: string): undefined {
  CHAT_ROUTER.AddSystemMessage(message)
}

export function ShowMyPosition(this: void): undefined {
  if (SetMapToPlayerLocation() === SET_MAP_RESULT_MAP_CHANGED) {
    CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
  }

  const [x, y] = GetMapPlayerPosition("player")

  const locX = string.format("%02.04f", zo_round(x * 10000) / 10000)
  const locY = string.format("%02.04f", zo_round(y * 10000) / 10000)

  const [zone, subzone] = LibMapPins.GetZoneAndSubzone(false, true, false)
  MyPrint(
    zo_strformat("<<1>>: <<2>>\xC3\x97<<3>> (<<4>>/<<5>>)", GetMapName(), locX, locY, zone, subzone)
  )
}
