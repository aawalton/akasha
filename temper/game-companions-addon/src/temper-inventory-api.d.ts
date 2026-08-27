declare namespace TemperInventory {
  function getSavedVariables(): {
    automation?: {
      characters: Record<string, { equipment?: boolean; food?: boolean; potions?: boolean }>
      companions: Record<string, { equipment?: boolean; skills?: boolean }>
    }
  }
}
