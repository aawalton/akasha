declare function GetItemLink(bagId: number, slotIndex: number): string

declare function ExtractEnchantingItem(bagId: number, slotIndex: number): void

declare function zo_strsplit(delimiter: string, s: string): LuaMultiReturn<string[]>

declare function ZO_MenuBar_SelectDescriptor(menuBar: object, descriptor: number): boolean

interface EnchantingSceneObject {
  modeBar: object
  enchantingMode: number
}

declare const ENCHANTING: EnchantingSceneObject

declare const ENCHANTING_MODE_CREATION: number
declare const ENCHANTING_MODE_EXTRACTION: number
declare const ENCHANTING_MODE_RECIPES: number

declare const SI_ENCHANTING_CREATION: number
declare const SI_ENCHANTING_EXTRACTION: number
declare const SI_CRAFTING_PERFORM_FREE_CRAFT: number

interface Control {
  SetHeight(height: number): void
  GetAnchor(): LuaMultiReturn<
    [
      isValid: boolean,
      point: number,
      relativeTo: Control | undefined,
      relativePoint: number,
      offsetX: number,
      offsetY: number,
    ]
  >
  SetHandler(event: string, handler: ((this: void, ...args: never[]) => void) | undefined): void
}

interface ButtonControl {
  SetFont(font: string): void
  SetNormalFontColor(r: number, g: number, b: number, a?: number): void
  SetMouseOverFontColor(r: number, g: number, b: number, a?: number): void
  SetHorizontalAlignment(alignment: number): void
  SetVerticalAlignment(alignment: number): void
  EnableMouseButton(button: number, enabled: boolean): void
}

declare const ZO_EnchantingTopLevel: Control
declare const ZO_EnchantingTopLevelModeMenu: Control
declare const ZO_EnchantingTopLevelInventory: Control
declare const ZO_EnchantingTopLevelInventoryTabs: Control
declare const ZO_EnchantingTopLevelTooltip: Control
declare const ZO_EnchantingTopLevelRuneSlotContainer: Control
declare const ZO_EnchantingTopLevelExtractionSlotContainer: Control

declare const TemperCrafting_Rune: TopLevelWindow
declare const TemperCrafting_RuneHeader: BackdropControl
declare const TemperCrafting_RuneInfo: LabelControl
declare const TemperCrafting_RuneAmountLabel: LabelControl
declare const TemperCrafting_RuneSearch: EditControl
declare const TemperCrafting_RuneSearchBG: BackdropControl
declare const TemperCrafting_RuneLevelButton: ButtonControl
declare const TemperCrafting_RuneGlyphSectionScrollChild: Control
declare const TemperCrafting_RuneGlyphSectionScrollChildRefine: Control
declare const TemperCrafting_RuneGlyphSectionScrollChildSelection: Control
declare const TemperCrafting_RuneGlyphDivider: BackdropControl
declare const TemperCrafting_RuneCloseButton: ButtonControl
declare const TemperCrafting_RuneSpaceButtonName: LabelControl
declare const TemperCrafting_RuneHighlight1: TextureControl
declare const TemperCrafting_RuneHighlight2: TextureControl
