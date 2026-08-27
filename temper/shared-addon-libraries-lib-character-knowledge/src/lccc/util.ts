import { asCallback, asNumber, asRecord, asString } from "../casts"


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

const rawWorldName = GetWorldName()
const serverName: string = SERVER_NAME_MAP[rawWorldName] ?? rawWorldName

export function GetServerName(this: void): string {
  return serverName
}

let loadscreenId = 0

export function RunAfterInitialLoadscreen(
  this: void,
  func: (this: void, eventCode: number, ...args: unknown[]) => void
): undefined {
  loadscreenId = loadscreenId + 1
  EVENT_MANAGER.RegisterForEvent(
    string.format("%s%d_%d", NAME, VERSION, loadscreenId),
    EVENT_PLAYER_ACTIVATED,
    func,
    true
  )
}

const zoneEventName = string.format("%s%d_ZoneChange", NAME, VERSION)
const zoneCallbacks: Record<
  string,
  ((this: void, currentZoneId: number, previousZoneId: number) => void) | undefined
> = {}
let zoneRegistered = false
let currentZoneId: number | undefined
let currentDifficulty: number | undefined

function onZonePlayerActivated(this: void): undefined {
  const previousZoneId = currentZoneId
  const nextZoneId = getZoneIdImpl()
  const nextDifficulty = GetCurrentZoneDungeonDifficulty()

  if (currentZoneId !== nextZoneId || currentDifficulty !== nextDifficulty) {
    currentZoneId = nextZoneId
    currentDifficulty = nextDifficulty
    for (const [_id, callback] of pairs(zoneCallbacks)) {
      if (callback !== undefined) {
        callback(nextZoneId, previousZoneId ?? 0)
      }
    }
  }
}

export function MonitorZoneChanges(
  this: void,
  id: string,
  callback?: (this: void, currentZoneId: number, previousZoneId: number) => void
): undefined {
  zoneCallbacks[id] = callback
  const [firstZoneKey] = next(zoneCallbacks)
  if (!zoneRegistered && firstZoneKey !== undefined) {
    zoneRegistered = true
    EVENT_MANAGER.RegisterForEvent(zoneEventName, EVENT_PLAYER_ACTIVATED, onZonePlayerActivated)
  }
}

function getZoneIdImpl(this: void): number {
  return GetZoneId(asNumber(GetUnitZoneIndex("player")))
}

export { getZoneIdImpl as GetZoneId }

export function GetZoneName(this: void, zoneId: number, useFallback?: boolean): string {
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

export function IsInDungeonTrialArena(this: void): boolean {
  return (
    GetCurrentZoneDungeonDifficulty() !== DUNGEON_DIFFICULTY_NONE ||
    DTA_WHITELIST[getZoneIdImpl()] === true
  )
}

export function RegisterSlashCommands(
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

export function TokenizeSlashCommandParameters(
  this: void,
  params: unknown
): Record<string, boolean> {
  const tokens: Record<string, boolean> = {}
  if (type(params) === "string") {
    for (const [_index, token] of ipairs([...zo_strsplit(" ", zo_strlower(asString(params)))])) {
      tokens[asString(token)] = true
    }
  }
  return tokens
}

function splitCharId(this: void, charId: string): string {
  const length = zo_strlen(charId)
  return zo_strsub(charId, 1, length - 8) + "_" + zo_strsub(charId, length - 9, length)
}

export function CompareCharIds(this: void, a: string, b: string): boolean {
  return splitCharId(a) < splitCharId(b)
}

export function FixNumber(this: void, a: unknown): unknown {
  if (type(a) === "string") {
    const [start] = string.find(asString(a), "^[+-]?[%.%d]*%d$")
    if (start !== undefined) {
      return tonumber(asString(a))
    }
  }
  return a
}

export function MatchStrings(this: void, a: string, b: string): boolean {
  return zo_strformat("<<z:1>>", a) === zo_strformat("<<z:1>>", b)
}

export function RegisterString(this: void, id: string, text: string, version?: number): undefined {
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

export function GetLocalizedData(this: void, data: unknown): unknown {
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

export function GetSortedGroupMembers(this: void): GroupMember[] {
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

export function GetAddOnVersion(this: void, name: string): number | undefined {
  const am = GetAddOnManager()
  for (let i = 1; i <= am.GetNumAddOns(); i++) {
    const [addonName] = am.GetAddOnInfo(i)
    if (addonName === name) {
      return am.GetAddOnVersion(i)
    }
  }
  return undefined
}

export function FormatVersion(this: void, version: unknown): string {
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

const linkCallbacks: Record<string, ((this: void, ...args: unknown[]) => void) | undefined> = {}
let linkRegistered = false

function linkClicked(
  this: void,
  _a: unknown,
  _b: unknown,
  _c: unknown,
  _d: unknown,
  tag: unknown,
  ...rest: unknown[]
): boolean | undefined {
  if (type(tag) === "string" && linkCallbacks[asString(tag)] !== undefined) {
    asCallback(linkCallbacks[asString(tag)])(...rest)
    return true
  }
  return undefined
}

export function RegisterLinkHandler(
  this: void,
  tag: string,
  callback?: (this: void, ...args: unknown[]) => void
): undefined {
  linkCallbacks[tag] = callback
  const [firstLinkKey] = next(linkCallbacks)
  if (!linkRegistered && firstLinkKey !== undefined) {
    linkRegistered = true
    LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_MOUSE_UP_EVENT, linkClicked)
    LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_CLICKED_EVENT, linkClicked)
  }
}

export function GetLibAddonMenu(this: void): unknown {
  return LibAddonMenu2
}

export const Clamp = zo_clamp
