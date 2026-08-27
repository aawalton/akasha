import { HUD_SCENE_CATALOG } from "@temper/shared-interface-hud-scene-catalog/generated/hud-scene-catalog.generated"
import { createHideRegistry, type HideRegistry } from "./hide-registry"
import {
  migrateComponentVisibility,
  readComponentVisible,
  writeComponentVisible,
} from "./saved-variables"

const registry: HideRegistry = createHideRegistry()
let initialized = false

const PERFORMANCE_METER_ID = "performance-meter-fragment"
const HIDE_REASON = "TemperHud"

type GlobalTable = Record<string, unknown>
function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}
const GLOBALS: GlobalTable = asGlobalTable(_G)

export function defaultComponentVisible(this: void, id: string): boolean {
  return id !== PERFORMANCE_METER_ID
}

export function isComponentVisible(this: void, id: string): boolean {
  return readComponentVisible(id) ?? defaultComponentVisible(id)
}

export function getHideRegistry(this: void): HideRegistry {
  return registry
}

export function setComponentVisiblePersistent(this: void, id: string, visible: boolean): undefined {
  writeComponentVisible(id, visible)
  registry.setHidden(id, !visible)
  registry.applyOne(id)
}

export function initializeComponentHiding(this: void): undefined {
  if (initialized) return
  initialized = true

  migrateComponentVisibility(HUD_SCENE_CATALOG.map((record) => record.id))

  for (const record of HUD_SCENE_CATALOG) {
    const esoGlobal = record.esoGlobal
    registry.register({
      id: record.id,
      resolve: () => GLOBALS[esoGlobal],
      reason: HIDE_REASON,
    })
    registry.setHidden(record.id, !isComponentVisible(record.id))
  }
  registry.apply()

  EVENT_MANAGER.RegisterForEvent(
    "TemperHud_ComponentHiding_PlayerActivated",
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      registry.apply()
    }
  )
  SCENE_MANAGER.GetScene("hud").RegisterCallback("StateChange", function (this: void): undefined {
    registry.apply()
  })
}
