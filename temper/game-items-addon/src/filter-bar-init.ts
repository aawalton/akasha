import { createFilterBar } from "@temper/game-items-filters-addon/filter-bar"
import { createFilterController } from "@temper/game-items-filters-addon/panel-filter-binding"
import { buildFilterIndex } from "@temper/game-items-filters-core/filter-registry"
import { buildItemFactsForSlot } from "./build-item-facts"
import { getSavedVariables } from "./saved-variables"

export function InitializeFilterBar(): undefined {
  const index = buildFilterIndex()

  const controller = createFilterController({
    index,
    factsSource: (slotData) =>
      slotData.bagId !== undefined && slotData.slotIndex !== undefined
        ? buildItemFactsForSlot(slotData.bagId, slotData.slotIndex)
        : undefined,
    inventoryTypes: [
      INVENTORY_BACKPACK,
      INVENTORY_BANK,
      INVENTORY_GUILD_BANK,
      INVENTORY_HOUSE_BANK,
      INVENTORY_CRAFT_BAG,
      INVENTORY_QUEST_ITEM,
    ],
  })

  EVENT_MANAGER.RegisterForEvent(
    "TemperInventoryFilterBarGuildBank",
    EVENT_GUILD_BANK_ITEMS_READY,
    function (this: void): undefined {
      controller.reinstallSurface(INVENTORY_GUILD_BANK)
    }
  )

  createFilterBar({
    controller,
    loadPosition: () => {
      const saved = getSavedVariables().inventoryFilterPanel
      if (saved === undefined) return undefined
      return { left: saved.left, top: saved.top }
    },
    savePosition: (position) => {
      getSavedVariables().inventoryFilterPanel = { left: position.left, top: position.top }
    },
    surfaceAnchors: [
      {
        isActive: () => IsGuildBankOpen(),
        anchorTargets: ["ZO_GuildBankBackpack"],
      },
    ],
  })
}
