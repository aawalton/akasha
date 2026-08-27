interface TemperWritInventoryData {
  ui_is_completed?: boolean
}

interface TemperWritInventoryListSingleton {
  UniqueIDToInventoryData(
    this: TemperWritInventoryListSingleton,
    uniqueId: unknown
  ): TemperWritInventoryData | undefined
}

declare const TemperWritInventoryList: { singleton?: TemperWritInventoryListSingleton } | undefined
