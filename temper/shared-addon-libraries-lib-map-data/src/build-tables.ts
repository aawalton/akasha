import { internal, lib } from "./lib-state"

function buildMapNames(this: void): undefined {
  let maxMapId: number | undefined
  for (let i = 1; i <= lib.MAX_NUM_MAPIDS; i++) {
    const mapName = GetMapNameById(i)
    if (mapName !== "") {
      lib.mapNames[i] = mapName
      if (maxMapId === undefined || maxMapId < i) maxMapId = i
    }
  }
  internal.dm("Debug", string.format("maxMapId: %s", maxMapId))
}

function buildMapNamesLookup(this: void): undefined {
  const builtTable: Record<string, number[]> = {}
  for (const [var1, var2] of pairs(lib.mapNames)) {
    if (builtTable[var2] === undefined) builtTable[var2] = []
    if (!internal.ContainsIndex(builtTable, var1)) {
      const ids = builtTable[var2]
      if (ids !== undefined) ids.push(var1)
    }
  }
  lib.mapNamesLookup = builtTable
  lib.mapNames = {}
}

function buildZoneNames(this: void): undefined {
  let maxZoneIndex: number | undefined
  let maxZoneId: number | undefined
  for (let i = 1; i <= lib.MAX_NUM_ZONEINDEXES; i++) {
    const zoneName = GetZoneNameByIndex(i)
    if (zoneName !== "") {
      const zoneId = GetZoneId(i)
      lib.zoneNames[i] = zoneName
      if (maxZoneIndex === undefined || maxZoneIndex < i) maxZoneIndex = i
      if (maxZoneId === undefined || maxZoneId < zoneId) maxZoneId = zoneId
    }
  }
  internal.dm("Debug", string.format("maxZoneIndex: %s", maxZoneIndex))
  internal.dm("Debug", string.format("maxZoneId: %s", maxZoneId))
}

function buildZoneNamesLookup(this: void): undefined {
  const builtTable: Record<string, number> = {}
  for (const [var1, var2] of pairs(lib.zoneNames)) {
    builtTable[var2] = var1
  }
  lib.zoneNamesLookup = builtTable
  lib.zoneNames = {}
}

function buildMapTextureNames(this: void): undefined {
  for (let i = 1; i <= lib.MAX_NUM_MAPIDS; i++) {
    const textureName = GetMapTileTextureForMapId(i)
    if (textureName !== "") {
      const lowered = string.lower(textureName)
      const [noPrefix] = string.gsub(lowered, "^.*/maps/", "")
      const [noSuffix] = string.gsub(noPrefix, "%.dds$", "")
      lib.textureNames[i] = noSuffix
    }
  }
}

function buildMapTextureNamesLookup(this: void): undefined {
  const builtTable: Record<string, number[]> = {}
  for (const [var1, var2] of pairs(lib.textureNames)) {
    if (builtTable[var2] === undefined) builtTable[var2] = []
    if (!internal.ContainsIndex(builtTable, var1)) {
      const ids = builtTable[var2]
      if (ids !== undefined) ids.push(var1)
    }
  }
  lib.textureNamesLookup = builtTable
  lib.textureNames = {}
}

export function buildAllTables(this: void): undefined {
  buildMapNames()
  buildMapNamesLookup()
  buildZoneNames()
  buildZoneNamesLookup()
  buildMapTextureNames()
  buildMapTextureNamesLookup()
}

export function getPlayerPos(this: void): undefined {
  internal.dm("Debug", "-----")
  internal.dm("Debug", "GetPlayerPos")
  if (lib.lastInteractionTarget !== undefined) {
    internal.dm("Debug", `Last Interaction Target: ${lib.lastInteractionTarget}`)
  }
  if (lib.reticleInteractionName !== undefined) {
    internal.dm("Debug", `Reticle Interaction Name: ${lib.reticleInteractionName}`)
  }

  const currentLogSetting = internal.show_log
  internal.show_log = true
  internal.UpdateMapInfo()

  internal.dm("Debug", lib.mapTexture)
  if (lib.zoneName !== undefined) internal.dm("Debug", `zoneName: ${lib.zoneName}`)
  if (lib.mapName !== undefined) internal.dm("Debug", `mapName: ${lib.mapName}`)
  if (lib.subzoneName !== undefined) internal.dm("Debug", `subzoneName: ${lib.subzoneName}`)
  if (lib.subZoneId !== undefined) internal.dm("Debug", `subZoneId: ${lib.subZoneId}`)
  if (lib.zoneId !== undefined) internal.dm("Debug", `ZoneId: ${lib.zoneId}`)
  if (lib.mapIndex !== undefined) internal.dm("Debug", `MapIndex: ${lib.mapIndex}`)
  if (lib.mapId !== undefined) internal.dm("Debug", `mapId: ${lib.mapId}`)
  if (lib.parentZoneMapId !== undefined) {
    internal.dm("Debug", `parentZoneMapId: ${lib.parentZoneMapId}`)
  }
  if (lib.zoneIndex !== undefined) internal.dm("Debug", `zoneIndex: ${lib.zoneIndex}`)
  internal.dm("Debug", `isDungeon: ${tostring(lib.isDungeon)}`)
  internal.dm("Debug", `isMainZone: ${tostring(lib.isMainZone)}`)
  internal.dm("Debug", `isSubzone: ${tostring(lib.isSubzone)}`)
  internal.dm("Debug", `isWorld: ${tostring(lib.isWorld)}`)
  internal.dm("Debug", `isCosmic: ${tostring(lib.isCosmic)}`)
  internal.dm("Debug", `isMacroMap: ${tostring(lib.isMacroMap)}`)
  if (lib.currentFloor !== undefined && lib.numFloors !== undefined) {
    const floorString = string.format("currentFloor: %d of %d", lib.currentFloor, lib.numFloors)
    internal.dm("Debug", floorString)
  }

  internal.dm("Debug", `X: ${lib.normalizedX}`)
  internal.dm("Debug", `Y: ${lib.normalizedY}`)
  internal.dm("Debug", `GPS X: ${lib.libGPSX}`)
  internal.dm("Debug", `GPS Y: ${lib.libGPSY}`)
  internal.dm("Debug", `worldX: ${lib.worldX}`)
  internal.dm("Debug", `worldY: ${lib.worldY}`)
  internal.dm("Debug", `worldZ: ${lib.worldZ}`)

  internal.show_log = currentLogSetting
}
