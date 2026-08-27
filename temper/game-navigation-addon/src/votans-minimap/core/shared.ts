import { asAnyAsyncTask, asAnyTable, asMapScene, asRecord, asString } from "../casts"
import { MAP_MODE_VOTANS_MINIMAP as MAP_MODE_VOTANS_MINIMAP_VALUE } from "../constants"
import { holder } from "../holder"


MAP_MODE_VOTANS_MINIMAP = MAP_MODE_VOTANS_MINIMAP_VALUE

export function NoOp(this: void, ..._args: unknown[]): undefined {}

export function GetScene(this: void): MapScene {
  return asMapScene(IsInGamepadPreferredMode() ? GAMEPAD_WORLD_MAP_SCENE : WORLD_MAP_SCENE)
}

function FakeIsInGamepadPreferredMode(this: void): boolean {
  return false
}

export function NoGamepad(
  this: void,
  func: (this: void, ...args: unknown[]) => unknown,
  ...args: unknown[]
): undefined {
  const g = asRecord(globalThis)
  const orgIsInGamepadPreferredMode = g.IsInGamepadPreferredMode
  g.IsInGamepadPreferredMode = FakeIsInGamepadPreferredMode
  func(...args)
  g.IsInGamepadPreferredMode = orgIsInGamepadPreferredMode
}

const dbgLog = LibDebugLogger ? LibDebugLogger.Create(holder.name) : undefined
export function dbg(this: void, ...args: unknown[]): undefined {
  if (dbgLog) {
    dbgLog.Debug(...args)
  } else {
    df(asString(args[0]), ...args.slice(1))
  }
}

export function pinTaskOnError(this: void, err: unknown): undefined {
  const msg = asString(err)
  const [pinHit] = string.find(msg, "Map/MapPin", 1, true)
  const [nilHit] = string.find(msg, "attempt to index a nil value", 1, true)
  if (pinHit != null && nilHit != null) {
    return
  }
  df("TemperVotansMiniMap pin task error: %s", msg)
}

export function createAsyncTask(this: void, name: string): AnyAsyncTask {
  const task = asAnyAsyncTask(LibAsync.Create(name))
  task.OnError(pinTaskOnError)
  return task
}

export function pins(this: void): AnyTable {
  return asAnyTable(holder.pinManager)
}
export function panZoom(this: void): AnyTable {
  return asAnyTable(holder.panZoom)
}

holder.pinManager = asAnyTable(ZO_WorldMap_GetPinManager())
holder.panZoom = asAnyTable(ZO_WorldMap_GetPanAndZoom())
