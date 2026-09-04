import {
  asCallback,
  asNumber,
  asRecord,
  asString,
} from "../knowledge-casts/knowledge-casts.module.code.ts"

const NAME = "LibCodesCommonCode"
const VERSION = 36

const SERVER_NAME_MAP: Record<string, string> = {
  "NA Megaserver": "NA",
  "EU Megaserver": "EU",
  XB1live: "NA",
  "XB1live-eu": "EU",
  PS4live: "NA",
  "PS4live-eu": "EU",
}

const RAW_WORLD_NAME = GetWorldName()
const SERVER_NAME: string = SERVER_NAME_MAP[RAW_WORLD_NAME] ?? RAW_WORLD_NAME

export function getServerName(this: void): string {
  return SERVER_NAME
}

const LOADSCREEN = { count: 0 }

export function runAfterInitialLoadscreen(
  this: void,
  func: (this: void, eventCode: number, ...args: unknown[]) => void
): undefined {
  LOADSCREEN.count = LOADSCREEN.count + 1
  EVENT_MANAGER.RegisterForEvent(
    string.format("%s%d_%d", NAME, VERSION, LOADSCREEN.count),
    EVENT_PLAYER_ACTIVATED,
    func,
    true
  )
}

const ZONE_EVENT_NAME = string.format("%s%d_ZoneChange", NAME, VERSION)
const ZONE_CALLBACKS: Record<
  string,
  ((this: void, currentZoneId: number, previousZoneId: number) => void) | undefined
> = {}
const ZONE_STATE: { registered: boolean; zoneId?: number; difficulty?: number } = {
  registered: false,
}

function onZonePlayerActivated(this: void): undefined {
  const previousZoneId = ZONE_STATE.zoneId
  const nextZoneId = getZoneId()
  const nextDifficulty = GetCurrentZoneDungeonDifficulty()

  if (ZONE_STATE.zoneId !== nextZoneId || ZONE_STATE.difficulty !== nextDifficulty) {
    ZONE_STATE.zoneId = nextZoneId
    ZONE_STATE.difficulty = nextDifficulty
    for (const [, callback] of pairs(ZONE_CALLBACKS)) {
      if (callback !== undefined) {
        callback(nextZoneId, previousZoneId ?? 0)
      }
    }
  }
}

export function monitorZoneChanges(
  this: void,
  id: string,
  callback?: (this: void, currentZoneId: number, previousZoneId: number) => void
): undefined {
  ZONE_CALLBACKS[id] = callback
  const [firstZoneKey] = next(ZONE_CALLBACKS)
  if (!ZONE_STATE.registered && firstZoneKey !== undefined) {
    ZONE_STATE.registered = true
    EVENT_MANAGER.RegisterForEvent(ZONE_EVENT_NAME, EVENT_PLAYER_ACTIVATED, onZonePlayerActivated)
  }
}

export function getZoneId(this: void): number {
  return GetZoneId(asNumber(GetUnitZoneIndex("player")))
}

export function getZoneName(this: void, zoneId: number, useFallback?: boolean): string {
  const zoneName = GetZoneNameById(zoneId)
  if (useFallback === true && zoneName === "") {
    return string.format("[#%d]", zoneId)
  } else {
    return zo_strformat(SI_ZONE_NAME, zoneName)
  }
}

const DTA_WHITELIST: Record<number, boolean> = {
  [1562]: true,
  [1563]: true,
  [1564]: true,
  [1565]: true,
}

export function isInDungeonTrialArena(this: void): boolean {
  return (
    GetCurrentZoneDungeonDifficulty() !== DUNGEON_DIFFICULTY_NONE ||
    DTA_WHITELIST[getZoneId()] === true
  )
}

export function registerSlashCommands(
  this: void,
  func: (this: void, ...args: unknown[]) => void,
  ...commands: string[]
): (this: void, ...args: unknown[]) => void {
  const count = select("#", ...commands)
  for (let i = 1; i <= count; i++) {
    const [command] = select(i, ...commands)
    asRecord(SLASH_COMMANDS)[asString(command)] = func
  }
  return func
}

export function tokenizeSlashCommandParameters(
  this: void,
  params: unknown
): Record<string, boolean> {
  const tokens: Record<string, boolean> = {}
  if (type(params) === "string") {
    for (const [, token] of ipairs([...zo_strsplit(" ", zo_strlower(asString(params)))])) {
      tokens[asString(token)] = true
    }
  }
  return tokens
}

function splitCharId(this: void, charId: string): string {
  const length = zo_strlen(charId)
  return zo_strsub(charId, 1, length - 8) + "_" + zo_strsub(charId, length - 9, length)
}

export function compareCharIds(this: void, a: string, b: string): boolean {
  return splitCharId(a) < splitCharId(b)
}

export function fixNumber(this: void, a: unknown): unknown {
  if (type(a) === "string") {
    const [start] = string.find(asString(a), "^[+-]?[%.%d]*%d$")
    if (start !== undefined) {
      return tonumber(asString(a))
    }
  }
  return a
}

export function matchStrings(this: void, a: string, b: string): boolean {
  return zo_strformat("<<z:1>>", a) === zo_strformat("<<z:1>>", b)
}

export function registerString(this: void, id: string, text: string, version?: number): undefined {
  const globals = asRecord(_G)
  if (globals[id] !== undefined) {
    SafeAddString(asNumber(globals[id]), text, version ?? 1)
  } else {
    ZO_CreateStringId(id, text)
    if (version !== undefined) {
      SafeAddVersion(asNumber(globals[id]), version)
    }
  }
}

const LANG = GetCVar("Language.2")

export function getLocalizedData(this: void, data: unknown): unknown {
  if (type(data) === "table") {
    const rec = asRecord(data)
    return rec[LANG] ?? rec["default"]
  }
  return undefined
}

interface GroupMember {
  unitTag: string
  account: string
  name: string
  role: number
  class: number
}

const ROLE_ORDER: Record<number, number> = {
  [LFG_ROLE_TANK]: 1,
  [LFG_ROLE_HEAL]: 2,
  [LFG_ROLE_DPS]: 3,
  [LFG_ROLE_INVALID]: 4,
}

function compareGroupMembers(this: void, a: GroupMember, b: GroupMember): boolean {
  const ra = ROLE_ORDER[a.role]
  const rb = ROLE_ORDER[b.role]
  if (ra === rb) {
    return a.account < b.account
  } else {
    return asNumber(ra) < asNumber(rb)
  }
}

export function getSortedGroupMembers(this: void): GroupMember[] {
  const groupSize = GetGroupSize()

  if (groupSize > 0) {
    const units: GroupMember[] = []

    for (let i = 1; i <= groupSize; i++) {
      const unitTag = GetGroupUnitTagByIndex(i)
      if (unitTag !== undefined) {
        units.push({
          unitTag: unitTag,
          account: GetUnitDisplayName(unitTag),
          name: GetUnitName(unitTag),
          role: GetGroupMemberSelectedRole(unitTag),
          class: GetUnitClassId(unitTag),
        })
      }
    }

    table.sort(units, compareGroupMembers)
    return units
  } else {
    return [
      {
        unitTag: "player",
        account: GetDisplayName(),
        name: GetUnitName("player"),
        role: GetSelectedLFGRole(),
        class: GetUnitClassId("player"),
      },
    ]
  }
}

export function getAddOnVersion(this: void, name: string): number | undefined {
  const am = GetAddOnManager()
  for (let i = 1; i <= am.GetNumAddOns(); i++) {
    const [addonName] = am.GetAddOnInfo(i)
    if (addonName === name) {
      return am.GetAddOnVersion(i)
    }
  }
  return undefined
}

export function formatVersion(this: void, version: unknown): string {
  const fields: Record<number, number | undefined> = {}
  if (type(version) === "number") {
    let v = asNumber(version)
    for (const [i, base] of ipairs([10, 100, 100, 10000])) {
      fields[5 - i] = v % base
      v = zo_floor(v / base)
    }
    if (fields[4] === 0) {
      fields[4] = undefined
    }
  }
  const ordered: string[] = []
  for (let k = 1; k <= 4; k++) {
    const value = fields[k]
    if (value === undefined) {
      break
    }
    ordered.push(tostring(value))
  }
  return table.concat(ordered, ".")
}

const LINK_CALLBACKS: Record<string, ((this: void, ...args: unknown[]) => void) | undefined> = {}
const LINK_STATE = { registered: false }

function linkClicked(
  this: void,
  _a: unknown,
  _b: unknown,
  _c: unknown,
  _d: unknown,
  tag: unknown,
  ...rest: unknown[]
): boolean | undefined {
  if (type(tag) === "string" && LINK_CALLBACKS[asString(tag)] !== undefined) {
    asCallback(LINK_CALLBACKS[asString(tag)])(...rest)
    return true
  }
  return undefined
}

export function registerLinkHandler(
  this: void,
  tag: string,
  callback?: (this: void, ...args: unknown[]) => void
): undefined {
  LINK_CALLBACKS[tag] = callback
  const [firstLinkKey] = next(LINK_CALLBACKS)
  if (!LINK_STATE.registered && firstLinkKey !== undefined) {
    LINK_STATE.registered = true
    LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_MOUSE_UP_EVENT, linkClicked)
    LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_CLICKED_EVENT, linkClicked)
  }
}

export function getLibAddonMenu(this: void): unknown {
  return LibAddonMenu2
}

export const clamp = zo_clamp
