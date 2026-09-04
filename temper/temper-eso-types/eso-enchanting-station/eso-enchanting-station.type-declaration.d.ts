declare function ExtractEnchantingItem(bagId: number, slotIndex: number): undefined

interface EnchantingSceneObject {
  modeBar: object
  enchantingMode: number
}

declare const ENCHANTING_MODE_CREATION: number

declare const ENCHANTING_MODE_RECIPES: number

declare const SI_ENCHANTING_CREATION: number

declare const SI_ENCHANTING_EXTRACTION: number

declare const SI_CRAFTING_PERFORM_FREE_CRAFT: number

declare const ZO_EnchantingTopLevel: Control

declare const ZO_EnchantingTopLevelModeMenu: Control

declare const ZO_EnchantingTopLevelInventory: Control

declare const ZO_EnchantingTopLevelInventoryTabs: Control

declare const ZO_EnchantingTopLevelTooltip: Control

declare const ZO_EnchantingTopLevelRuneSlotContainer: Control

declare const ZO_EnchantingTopLevelExtractionSlotContainer: Control
