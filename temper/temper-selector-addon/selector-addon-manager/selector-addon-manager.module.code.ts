import { ADDON_NAME } from "../selector-constants/selector-constants.module.code.ts"
import type { AddonEntry } from "../selector-types/selector-types.module.code.ts"

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
    const [name, title, , , enabled, , , isLibrary] = mgr.GetAddOnInfo(i)
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
