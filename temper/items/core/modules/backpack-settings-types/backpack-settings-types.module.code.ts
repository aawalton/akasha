export interface BackpackSettings {
  bufferSlots: number
  autoStack: boolean
}

export const DEFAULT_BACKPACK_SETTINGS: BackpackSettings = {
  bufferSlots: 15,
  autoStack: true,
}
