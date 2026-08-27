const INDEX_NO_SET = 0

const setLookupTable: Record<number, number> = {}
function generateSetLookupTable(this: void): undefined {
  for (let i = 1; i <= GetNumConsolidatedSmithingSets(); i = i + 1) {
    setLookupTable[GetConsolidatedSmithingItemSetIdByIndex(i)] = i
  }
}

interface SmithingSceneLike {
  SetMode?: (this: SmithingSceneLike, mode: number) => void
  setSearchBox?: { SetText: (this: unknown, text: string) => void }
  setFilters?: unknown
  RefreshSetCategories?: (this: SmithingSceneLike) => void
  categoryTree?: { SelectNode: (this: unknown, node: unknown) => void }
  setNodeLookupData?: Record<number, unknown>
}

function asSmithingSceneLike(this: void, value: unknown): SmithingSceneLike {
  return value as SmithingSceneLike
}

function smithingScene(this: void): SmithingSceneLike | undefined {
  return asSmithingSceneLike(SMITHING)
}

export function selectConsolidatedSet(this: void, setId: number): undefined {
  if (GetCraftingInteractionMode() !== CRAFTING_INTERACTION_MODE_CONSOLIDATED_STATION) return
  if (setId === INDEX_NO_SET) return

  if (GetNumUnlockedConsolidatedSmithingSets() > 0 && !ZO_IsConsoleOrGameCoreUI()) {
    smithingScene()?.SetMode?.(SMITHING_MODE_CREATION)
  } else if (ZO_IsConsoleOrGameCoreUI()) {
    if (setLookupTable[setId] === undefined) {
      generateSetLookupTable()
    }
    if (!IsConsolidatedSmithingItemSetIdUnlocked(setId)) return
    const consoleIdx = setLookupTable[setId]
    if (consoleIdx === undefined) return
    SetActiveConsolidatedSmithingSetByIndex(consoleIdx)
    return
  }

  if (!ZO_Smithing_IsConsolidatedStationCraftingMode()) return
  if (GetActiveConsolidatedSmithingItemSetId() === setId) return
  if (setLookupTable[setId] === undefined) {
    generateSetLookupTable()
  }

  if (IsInGamepadPreferredMode()) {
    const gamepadIdx = setLookupTable[setId]
    if (gamepadIdx === undefined) return
    SetActiveConsolidatedSmithingSetByIndex(gamepadIdx)
    return
  }

  const scene = smithingScene()
  if (scene === undefined) return
  scene.setSearchBox?.SetText("")
  ZO_ClearTable(scene.setFilters)
  scene.RefreshSetCategories?.()
  const node = scene.setNodeLookupData?.[setId]
  if (node === undefined) return
  scene.categoryTree?.SelectNode(node)
}
