import { DEFAULT_TAMRIEL_SIZE } from "./constants"
import { internal } from "./lib-state"
import type { WorldSizeClass, WorldSizeInstance } from "./types"

const WorldSize = ZO_Object.Subclass<WorldSizeClass>()

WorldSize.New = function (this: WorldSizeClass): WorldSizeInstance {
  const object = ZO_Object.New<WorldSizeInstance>(this)
  object.Initialize()
  return object
}

WorldSize.Initialize = function (this: WorldSizeInstance): undefined {
  this.id = 0
  this.zoneId = 0

  this.width = DEFAULT_TAMRIEL_SIZE
  this.height = DEFAULT_TAMRIEL_SIZE
}

WorldSize.GetId = function (this: WorldSizeInstance): number {
  return this.id + this.zoneId * 100000
}

WorldSize.GetMapId = function (this: WorldSizeInstance): number {
  return this.id
}

WorldSize.SetMapId = function (this: WorldSizeInstance, id: number): undefined {
  this.id = id
}

WorldSize.SetZoneId = function (this: WorldSizeInstance, zoneId: number): undefined {
  this.zoneId = zoneId
}

WorldSize.GetZoneId = function (this: WorldSizeInstance): number {
  return this.zoneId
}

WorldSize.SetSize = function (this: WorldSizeInstance, width: number, height: number): undefined {
  this.width = width
  this.height = height
}

WorldSize.GetSize = function (this: WorldSizeInstance): LuaMultiReturn<[number, number]> {
  return $multi(this.width, this.height)
}

WorldSize.IsValid = function (this: WorldSizeInstance): boolean {
  return this.id > 0 && this.zoneId > 0
}

WorldSize.GetName = function (this: WorldSizeInstance): string {
  return GetMapNameById(this.GetMapId())
}

const SEPARATOR = ":"
const SERIALIZE_VERSION = "1"
const VERSION_INDEX = 0
const MAP_ID_INDEX = 1
const ZONE_ID_INDEX = 2
const WIDTH_INDEX = 3
const HEIGHT_INDEX = 4
const temp: (string | number)[] = []

WorldSize.Serialize = function (this: WorldSizeInstance): string {
  temp[VERSION_INDEX] = SERIALIZE_VERSION
  temp[MAP_ID_INDEX] = this.id
  temp[ZONE_ID_INDEX] = this.zoneId
  temp[WIDTH_INDEX] = this.width
  temp[HEIGHT_INDEX] = this.height
  return table.concat(temp, SEPARATOR)
}

WorldSize.Deserialize = function (this: WorldSizeInstance, data: string): undefined {
  const splitData = [...zo_strsplit(SEPARATOR, data)]
  if (splitData[VERSION_INDEX] === SERIALIZE_VERSION) {
    this.id = tonumber(splitData[MAP_ID_INDEX]) ?? 0
    this.zoneId = tonumber(splitData[ZONE_ID_INDEX]) ?? 0
    this.width = tonumber(splitData[WIDTH_INDEX]) ?? 0
    this.height = tonumber(splitData[HEIGHT_INDEX]) ?? 0
  } else {
    internal.logger.Warn("Tried to deserialize from unknown version", data)
  }
}

export { WorldSize }
