declare const TemperCrafting_CharacterPanelBoxScrollChild: TemperCraftingControl

declare const TemperCrafting_CharacterPanel: TemperCraftingControl

declare const TemperCrafting_PanelButtonCharacters: TemperCraftingButton

declare const TemperCrafting_CharacterFrame1: TemperCraftingControl | undefined

declare const TemperCrafting_ButtonFrame: TemperCraftingControl

declare const TemperCrafting_ButtonFrameButtonBG: TopLevelWindow

declare const TemperCrafting_Quest: TopLevelWindow

declare const TemperCrafting_Panel: TopLevelWindow

declare const TemperCrafting_PanelButtonCraftedSets: TemperCraftingButton

declare const TemperCrafting_SetPanel: TemperCraftingControl

declare const TemperCrafting_SetPanelScrollChild: TemperCraftingControl

declare const TemperCrafting_Style: TemperCraftingControl

type CsResearchRef = [number, number, number, unknown]

interface CsComboBoxControl extends Control {
  dropdown: CsComboBox
  name: unknown
}

declare const TemperCrafting_Panel12Hours: LabelControl

declare const TemperCrafting_Panel24Hours: LabelControl

declare const TemperCrafting_PanelFenceGoldText: TemperCraftingLabel

declare const TemperCrafting_PanelQuestButton: TemperCraftingControl

declare const TemperCrafting_ButtonFrameButton: TemperCraftingControl

declare const TemperCrafting_CharacterPanelHeader: LabelControl

declare const TemperCrafting_StylePreviewType: CsComboBoxControl

declare const TemperCrafting_CookSpaceButton: TemperCraftingControl

declare const TemperCrafting_CookCategoryButtonFavorites: TemperCraftingControl

declare const TemperCrafting_CookCategoryButtonWrit: TemperCraftingControl

declare const TemperCrafting_CookCategoryButtonFurniture: TemperCraftingControl

declare const TemperCrafting_CookCategoryButtonFurnitureFavorites: TemperCraftingControl

declare const TemperCrafting_CookCategoryButtonFillet: TemperCraftingControl

declare const TemperCrafting_BlueprintCategoryButton1: TemperCraftingControl

declare const TemperCrafting_BlueprintCategoryButton2: TemperCraftingControl

declare const TemperCrafting_BlueprintCategoryButton3: TemperCraftingControl

declare const TemperCrafting_BlueprintCategoryButton4: TemperCraftingControl

declare const TemperCrafting_BlueprintCategoryButton5: TemperCraftingControl

declare const TemperCrafting_BlueprintCategoryButton6: TemperCraftingControl

declare const TemperCrafting_BlueprintCategoryButton7: TemperCraftingControl

declare const TemperCrafting_RuneMenu: TemperCraftingControl

declare const TemperCrafting_RuneArmorButton: TemperCraftingControl

declare const TemperCrafting_RuneWeaponButton: TemperCraftingControl

declare const TemperCrafting_RuneJewelryButton: TemperCraftingControl

declare const TemperCrafting_RuneSpaceButton: TemperCraftingControl

declare const TemperCrafting_RuneCreateButton: TemperCraftingControl

declare const TemperCrafting_RuneRefineButton: TemperCraftingControl

declare const TemperCrafting_RuneFavoriteButton: TemperCraftingControl

declare const TemperCrafting_RuneWritButton: TemperCraftingControl

declare const TemperCrafting_RuneFurnitureButton: TemperCraftingControl

declare const TemperCrafting_RuneFavoriteFurnitureButton: TemperCraftingControl

declare const TemperCrafting_RuneRefineAllButton: TemperCraftingControl

declare const TemperCrafting_RuneHandmadeButton: TemperCraftingControl

declare const TemperCrafting_QuestText: LabelControl

declare const TemperCrafting_DolgubonsWritsEndpoint: LabelControl | undefined

declare const TemperCrafting_CookSpaceButtonName: LabelControl

declare var _CS: unknown

declare const TemperCrafting_Rune: TopLevelWindow

declare const TemperCrafting_RuneHeader: BackdropControl

declare const TemperCrafting_RuneInfo: LabelControl

declare const TemperCrafting_RuneAmountLabel: LabelControl

declare const TemperCrafting_RuneSearch: EditControl

declare const TemperCrafting_RuneSearchBG: BackdropControl

declare const TemperCrafting_RuneLevelButton: TemperCraftingButton

declare const TemperCrafting_RuneGlyphSectionScrollChild: TemperCraftingControl

declare const TemperCrafting_RuneGlyphSectionScrollChildRefine: TemperCraftingControl

declare const TemperCrafting_RuneGlyphSectionScrollChildSelection: TemperCraftingControl

declare const TemperCrafting_RuneGlyphDivider: BackdropControl

declare const TemperCrafting_RuneCloseButton: TemperCraftingButton

declare const TemperCrafting_RuneSpaceButtonName: LabelControl

declare const TemperCrafting_RuneHighlight1: TextureControl

declare const TemperCrafting_RuneHighlight2: TextureControl

declare const TemperCrafting_QuestFrame: TemperCraftingControl & {
  CreateControl: <T extends Control = InspirationContainer>(name: string, controlType: number) => T
}

declare const TemperCrafting_Alarm: {
  AddMessage: (text: string, r: number, g: number, b: number, a: number) => undefined
}

declare const TemperCrafting_Recipe_Window: TopLevelWindow

declare const TemperCrafting_Recipe: BackdropControl

declare const TemperCrafting_RecipePanelScrollChild: TemperCraftingControl

declare const TemperCrafting_RecipeHeadline: LabelControl

declare const TemperCrafting_RecipeInfo: LabelControl

declare const TemperCrafting_RecipeSearch: EditControl

declare const TemperCrafting_RecipeHideKnownButton: TemperCraftingButton

declare const TemperCrafting_RecipeHideUnknownButton: TemperCraftingButton

declare const TemperCrafting_Cook: TopLevelWindow

declare const TemperCrafting_CookFoodSectionScrollChild: TemperCraftingControl

declare const TemperCrafting_CookHeadline: LabelControl

declare const TemperCrafting_CookInfo: LabelControl

declare const TemperCrafting_CookAmount: EditControl

declare const TemperCrafting_CookSearch: EditControl

declare const TemperCrafting_RuneAmount: EditControl

declare const TemperCrafting_Style_Window: TopLevelWindow

declare const TemperCrafting_StylePanelScrollChildStyles: TemperCraftingControl

declare const TemperCrafting_StylePanelScrollChildSets: TemperCraftingControl

declare const TemperCrafting_StyleHeader: LabelControl

declare const TemperCrafting_StyleHideButton: TemperCraftingButton

declare const TemperCrafting_StyleHideCrownButton: TemperCraftingButton

declare const TemperCrafting_StyleHidePerfectedButton: TemperCraftingButton

declare const TemperCrafting_StyleHideUnknownButton: TemperCraftingButton

declare const TemperCrafting_Blueprint_Window: TopLevelWindow

declare const TemperCrafting_Blueprint: BackdropControl

declare const TemperCrafting_BlueprintPanelScrollChild: TemperCraftingControl

declare const TemperCrafting_BlueprintHeadline: LabelControl

declare const TemperCrafting_BlueprintInfo: LabelControl

declare const TemperCrafting_BlueprintSearch: EditControl

declare const TemperCrafting_BlueprintHideKnownButton: TemperCraftingButton

declare const TemperCrafting_BlueprintHideUnknownButton: TemperCraftingButton

interface ObjectPool<T> {
  ReleaseObject: (key: number) => undefined
}

interface SceneManager {
  HideTopLevel: (topLevelWindow: Control) => undefined
}

interface TemperCraftingControl extends Control {
  data?: TemperCraftingControlData
  checkState?: number
  tristate?: boolean
}

interface TemperCraftingLabel extends LabelControl {
  data?: TemperCraftingControlData
}

interface TemperCraftingButton extends ButtonControl {
  data?: TemperCraftingControlData
  checkState?: number
  tristate?: boolean
}

interface ButtonControl {
  SetHorizontalAlignment: (alignment: number) => undefined
  SetVerticalAlignment: (alignment: number) => undefined
}

interface TooltipControl {
  SetWornItem: (slotIndex: number, ...rest: unknown[]) => undefined
  SetAttachedMailItem: (mailId: Id64, attachmentIndex: number, ...rest: unknown[]) => undefined
  SetBuybackItem: (entryIndex: number, ...rest: unknown[]) => undefined
  SetTradingHouseListing: (tradingHouseListingIndex: number, ...rest: unknown[]) => undefined
  SetTradeItem: (tradeWho: number, slotIndex: number, ...rest: unknown[]) => undefined
  SetQuestReward: (rewardIndex: number, ...rest: unknown[]) => undefined
}

interface MasterMerchantApi {
  addStatsAndGraph: (tooltip: TooltipControl, itemLink: string, extend: boolean) => undefined
}

interface TamrielTradeCentrePriceApi {
  AppendPriceInfo: (tooltip: TooltipControl, itemInfo: unknown) => undefined
}

interface LamEditboxControl {
  type: "editbox"
  name: string
  tooltip?: string
  isMultiline?: boolean
  getFunc: (this: void) => string | number
  setFunc: (this: void, value: string) => undefined
  default?: string | number
}

interface TemperCraftingControlData {
  abilityId?: number
  research?: CsResearchRef
  addline?: string[]
  level?: number
  charactername?: string
  info?: string
  link?: string
  nr?: number
  zone?: Record<number, number>
  node?: Record<number, number>
  name?: string
  buttons?: Record<number, string | undefined>
  set?: number
  travel?: boolean
  crafting?: [{ GetText: () => string }, number]
  craftable?: boolean
}

interface CsComboBox {
  SetSelectedItem: (name: string) => undefined
  CreateItemEntry: (
    name: string,
    callback: (comboBox: unknown, choiceText: string, choice: ComboBoxItem) => undefined
  ) => ComboBoxItem
  AddItem: (entry: ComboBoxItem) => undefined
}

interface CsTooltipCraftField {
  GetText: () => string
}

interface InventorySlotData {
  bagId: number
  uniqueId: string
  uid?: string
  quality: number
  lnk?: string
  lootId?: number
}

interface FcoisApi {
  addonVars: FcoisAddonVars
  IsEnchantingLocked: (this: void, bagId: number, slotIndex: number) => boolean
  IsJewelryResearchLocked: (this: void, bagId: number, slotIndex: number) => boolean
  IsResearchLocked: (this: void, bagId: number, slotIndex: number) => boolean
  IsAlchemyDestroyLocked: (this: void, bagId: number, slotIndex: number) => boolean
}

interface ScaleAnimation extends ZO_Animation {
  SetStartScale: (scale: number) => undefined
  SetEndScale: (scale: number) => undefined
}

interface CenterScreenAnnounceMessageParams {
  SetSound: (sound: string | undefined) => undefined
  MarkSuppressIconFrame: () => undefined
  MarkShowImmediately: () => undefined
}

declare const _: string | undefined
