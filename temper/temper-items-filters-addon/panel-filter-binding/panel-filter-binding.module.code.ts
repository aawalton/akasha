import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-inventory"
import type { ActiveFilterValues } from "@akasha/temper-items-filters-core/search-filter-set"
import { itemPassesFilters } from "@akasha/temper-items-filters-core/search-filter-set"
import type {
  AnyTemperFilter,
  FilterId,
  FilterValue,
} from "@akasha/temper-items-filters-core/search-filter-types"
import type { ItemFacts } from "@akasha/temper-items-rules-eval/item-facts"

export type FactsSource = (this: void, slotData: InventoryRowSlotData) => ItemFacts | undefined

export interface FilterController {
  setFilter: (id: FilterId, value: FilterValue) => void
  clearFilter: (id: FilterId) => void
  clearAll: () => void
  getActive: () => ActiveFilterValues
  refresh: () => void
}

export interface InventoryFilterController extends FilterController {
  reinstallSurface: (inventoryType: number) => void
}

export interface FilterBindingConfig {
  readonly index: ReadonlyMap<FilterId, AnyTemperFilter>
  readonly factsSource: FactsSource
  readonly inventoryTypes: readonly number[]
}

export function createFilterController(config: FilterBindingConfig): InventoryFilterController {
  const active = new Map<FilterId, FilterValue>()
  const installed = new Set<number>()
  const baseFilters = new Map<number, PlayerInventoryDefinition["additionalFilter"]>()
  const ourWrap = new Map<number, PlayerInventoryDefinition["additionalFilter"]>()
  let craftBagHookInstalled = false

  function passes(slotData: InventoryRowSlotData): boolean {
    if (active.size === 0) return true
    const facts = config.factsSource(slotData)
    if (facts === undefined) return true
    return itemPassesFilters(config.index, active, facts)
  }

  function wrap(inv: PlayerInventoryDefinition, inventoryType: number): undefined {
    let original = baseFilters.get(inventoryType)
    if (original === undefined && !baseFilters.has(inventoryType)) {
      original = inv.additionalFilter
      baseFilters.set(inventoryType, original)
    }
    const wrapped: PlayerInventoryDefinition["additionalFilter"] = (slotData) =>
      (original === undefined || original(slotData)) && passes(slotData)
    inv.additionalFilter = wrapped
    ourWrap.set(inventoryType, wrapped)
  }

  function reinstallSurface(inventoryType: number): undefined {
    const inv = PLAYER_INVENTORY.inventories[inventoryType]
    if (inv === undefined) return
    if (inv.additionalFilter !== ourWrap.get(inventoryType)) {
      baseFilters.set(inventoryType, inv.additionalFilter)
    }
    installed.add(inventoryType)
    wrap(inv, inventoryType)
    PLAYER_INVENTORY.UpdateList(inventoryType)
  }

  function installCraftBagGuard(): undefined {
    if (craftBagHookInstalled) return
    if (!config.inventoryTypes.includes(INVENTORY_CRAFT_BAG)) return
    SecurePostHook(PLAYER_INVENTORY, "ApplyBackpackLayout", () => {
      reinstallSurface(INVENTORY_CRAFT_BAG)
    })
    craftBagHookInstalled = true
  }

  function install(): undefined {
    installCraftBagGuard()
    for (const inventoryType of config.inventoryTypes) {
      if (installed.has(inventoryType)) continue
      const inv = PLAYER_INVENTORY.inventories[inventoryType]
      if (inv === undefined) continue
      wrap(inv, inventoryType)
      installed.add(inventoryType)
    }
  }

  function refresh(): undefined {
    install()
    for (const inventoryType of config.inventoryTypes) {
      PLAYER_INVENTORY.UpdateList(inventoryType)
    }
  }

  return {
    setFilter(id, value) {
      active.set(id, value)
      refresh()
    },
    clearFilter(id) {
      active.delete(id)
      refresh()
    },
    clearAll() {
      active.clear()
      refresh()
    },
    getActive() {
      return active
    },
    refresh,
    reinstallSurface,
  }
}
