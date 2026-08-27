export type Pack = Record<string, true>

export interface PackKeybind {
  packName?: string
  charName?: string
}

export interface SelectedPackRef {
  packName: string
  charName: string
  timestamp: number
}

export type SavedVariablesData = {
  addonPacks: Record<string, Pack>
  addonPacksOfChar: Record<string, Record<string, Pack>>
  autoReloadUI: boolean
  showGlobalPacks: boolean
  showGroupedByCharacterName: boolean
  saveGroupedByCharacterName: boolean
  selectedPackNameForCharacters: Record<string, SelectedPackRef>
  packKeybinds: PackKeybind[]
  packChangedBeforeReloadUI: boolean
}

export interface AddonEntry {
  index: number
  name: string
  title: string
  enabled: boolean
  isLibrary: boolean
}
