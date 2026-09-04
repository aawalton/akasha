import type { AddonEntry, Pack } from "../selector-types/selector-types.module.code.ts"

export function buildPackFromEntries(entries: readonly AddonEntry[]): Pack {
  const pack: Pack = {}
  for (const entry of entries) {
    if (entry.enabled === true) {
      pack[entry.name] = true
    }
  }
  return pack
}

export interface EnableAction {
  index: number
  enabled: boolean
}

export function computeEnableActions(pack: Pack, entries: readonly AddonEntry[]): EnableAction[] {
  const actions: EnableAction[] = []
  for (const entry of entries) {
    const shouldBeEnabled = pack[entry.name] !== undefined
    if (shouldBeEnabled !== entry.enabled) {
      actions.push({ index: entry.index, enabled: shouldBeEnabled })
    }
  }
  return actions
}

export function packAddonNames(pack: Pack): string[] {
  const names: string[] = []
  for (const name in pack) {
    names.push(name)
  }
  names.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  return names
}

export function currentEnabledNames(entries: readonly AddonEntry[]): string[] {
  return packAddonNames(buildPackFromEntries(entries))
}

export function isPackActive(pack: Pack, entries: readonly AddonEntry[]): boolean {
  const actions = computeEnableActions(pack, entries)
  return actions.length === 0
}
