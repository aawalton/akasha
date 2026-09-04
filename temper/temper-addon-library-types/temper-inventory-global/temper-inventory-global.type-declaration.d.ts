interface TemperInventoryCharacterAutomation {
  equipment?: boolean
  food?: boolean
  potions?: boolean
}

interface TemperInventoryCompanionAutomation {
  equipment?: boolean
  skills?: boolean
}

interface TemperInventoryAutomation {
  characters: Record<string, TemperInventoryCharacterAutomation>
  companions: Record<string, TemperInventoryCompanionAutomation>
}

interface TemperInventoryBackpack {
  bufferSlots?: number
}

interface TemperInventorySavedVariables {
  automation?: TemperInventoryAutomation
  backpack?: TemperInventoryBackpack
}

interface TemperInventoryActionSummary {
  totalSlots: number
  venues: { label: string; count: number }[]
}

interface TemperInventoryApi {
  ToggleHoveredItemSell: (this: void) => undefined
  ToggleHoveredItemLock: (this: void) => undefined
  ToggleInventoryBrowser: (this: void) => undefined
  getInventoryActionSummary: (this: void) => TemperInventoryActionSummary | undefined
  getBackpackFreeSlots: (this: void) => number
  getSavedVariables: (this: void) => TemperInventorySavedVariables
  isSavedVariablesReady: (this: void) => boolean
}

declare var TemperInventory: TemperInventoryApi | undefined
