import { ADDON_NAME } from "./constants"
import type { AddonEntry } from "./types"

function manager(): AddOnManager {
  return GetAddOnManager()
}

export function getNumAddOns(): number {
  return manager().GetNumAddOns()
}

export function listAddons(): AddonEntry[] {
  const mgr = manager()
  const count = mgr.GetNumAddOns()
  const out: AddonEntry[] = []
  for (let i = 1; i <= count; i++) {
    const [name, title, _author, _description, enabled, _state, _isOutOfDate, isLibrary] =
      mgr.GetAddOnInfo(i)
    out.push({ index: i, name, title, enabled, isLibrary })
  }
  return out
}

export function setAddOnEnabled(index: number, enabled: boolean): undefined {
  manager().SetAddOnEnabled(index, enabled)
}

export function areAddOnsEnabled(): boolean {
  return manager().AreAddOnsEnabled()
}

export function requestPrioritySave(): undefined {
  manager().RequestAddOnSavedVariablesPrioritySave(ADDON_NAME)
}

export function reloadUI(): undefined {
  ReloadUI("ingame")
}
