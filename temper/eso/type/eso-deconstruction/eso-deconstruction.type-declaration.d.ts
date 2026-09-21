interface SmithingExtractionSlot {
  HasItems: (this: SmithingExtractionSlot) => boolean
  GetStackCount: (this: SmithingExtractionSlot) => number
}

interface SmithingDeconstructionPanel {
  savedVars: { includeBankedItemsChecked: boolean }
  extractionSlot: SmithingExtractionSlot
  ExtractSingle: (this: SmithingDeconstructionPanel) => void
}

interface SmithingRefinementPanel {
  extractionSlot: SmithingExtractionSlot
  IsExtractable: (this: SmithingRefinementPanel) => boolean
  ClearSelections: (this: SmithingRefinementPanel) => void
  ExtractSingle: (this: SmithingRefinementPanel) => void
  ExtractAll: (this: SmithingRefinementPanel) => void
}

interface SmithingStation {
  mode: number
  modeBar: Control
  deconstructionPanel: SmithingDeconstructionPanel
  refinementPanel: SmithingRefinementPanel
  AddItemToCraft: (this: SmithingStation, bagId: number, slotIndex: number) => void
}

interface EnchantingStation {
  enchantingMode: number
  modeBar: object
  AddItemToCraft: (this: EnchantingStation, bagId: number, slotIndex: number) => void
  ExtractAll: (this: EnchantingStation) => void
}

declare const UNIVERSAL_DECONSTRUCTION: SmithingStation
declare const UNIVERSAL_DECONSTRUCTION_GAMEPAD: SmithingStation

interface DeconstructionPanelHost {
  deconstructionPanel: SmithingDeconstructionPanel
}
declare function GetDeconstructionPanel(this: void): DeconstructionPanelHost

declare function CanItemBeSmithingExtractedOrRefined(
  this: void,
  bagId: number,
  slotIndex: number,
  craftingType: number
): boolean

declare const ZO_MenuBar_AddButton: (
  this: void,
  menuBar: Control,
  buttonData: object
) => Control | undefined

declare const ZO_MenuBar_GetSelectedDescriptor: (this: void, menuBar: Control) => number | string

declare const ZO_MenuBar_SelectDescriptor: (
  this: void,
  menuBar: Control,
  descriptor: number | string,
  skipAnimation?: boolean,
  reselectIfSelected?: boolean
) => boolean

declare const SMITHING_MODE_REFINMENT: number
declare const SMITHING_MODE_DECONSTRUCTION: number
declare const ENCHANTING_MODE_EXTRACTION: number
