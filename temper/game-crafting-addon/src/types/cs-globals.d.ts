declare function GetCurrentMoney(): number

declare const SI_GAMEPAD_MAIL_INBOX_INVENTORY: number
declare const SI_RECIPECRAFTINGSYSTEM1: number
declare const SI_RECIPECRAFTINGSYSTEM2: number
declare const SI_RECIPECRAFTINGSYSTEM3: number
declare const SI_RECIPECRAFTINGSYSTEM4: number
declare const SI_RECIPECRAFTINGSYSTEM5: number
declare const SI_RECIPECRAFTINGSYSTEM6: number
declare const SI_RECIPECRAFTINGSYSTEM7: number

interface SceneManager {
  HideTopLevel(topLevelWindow: Control): void
  ToggleTopLevel(topLevelWindow: Control): void
}

type CsResearchRef = [number, number, number, unknown]

interface TemperCraftingControlData {
  research?: CsResearchRef
  addline?: string[]
  level?: number
}

interface Control {
  SetText(text: string | number | undefined): void
  SetColor(r: number, g: number, b: number, a?: number): void
  GetType(): number
  BringWindowToTop(): void
}

interface BackdropControl {
  SetEdgeTexture(
    texture: string | undefined,
    width: number,
    height: number,
    edgeSize: number,
    padding: number
  ): void
}

interface CsComboBox {
  SetSelectedItem(name: string): void
  CreateItemEntry(
    name: string,
    callback: (comboBox: unknown, choiceText: string, choice: ComboBoxItem) => void
  ): ComboBoxItem
  AddItem(entry: ComboBoxItem): void
}

interface CsComboBoxControl extends Control {
  dropdown: CsComboBox
  name: unknown
}

interface CsTooltipCraftField {
  GetText(): string
}

declare const TemperCrafting_Panel12Hours: LabelControl
declare const TemperCrafting_Panel24Hours: LabelControl
declare const TemperCrafting_PanelFenceGoldText: LabelControl
declare const TemperCrafting_PanelQuestButton: Control
declare const TemperCrafting_ButtonFrameButton: Control
declare const TemperCrafting_CharacterPanelHeader: LabelControl
declare const TemperCrafting_StylePreviewType: CsComboBoxControl
declare const TemperCrafting_CookSpaceButton: Control
declare const TemperCrafting_CookCategoryButtonFavorites: Control
declare const TemperCrafting_CookCategoryButtonWrit: Control
declare const TemperCrafting_CookCategoryButtonFurniture: Control
declare const TemperCrafting_CookCategoryButtonFurnitureFavorites: Control
declare const TemperCrafting_CookCategoryButtonFillet: Control
declare const TemperCrafting_BlueprintCategoryButton1: Control
declare const TemperCrafting_BlueprintCategoryButton2: Control
declare const TemperCrafting_BlueprintCategoryButton3: Control
declare const TemperCrafting_BlueprintCategoryButton4: Control
declare const TemperCrafting_BlueprintCategoryButton5: Control
declare const TemperCrafting_BlueprintCategoryButton6: Control
declare const TemperCrafting_BlueprintCategoryButton7: Control
declare const TemperCrafting_RuneMenu: Control
declare const TemperCrafting_RuneArmorButton: Control
declare const TemperCrafting_RuneWeaponButton: Control
declare const TemperCrafting_RuneJewelryButton: Control
declare const TemperCrafting_RuneSpaceButton: Control
declare const TemperCrafting_RuneCreateButton: Control
declare const TemperCrafting_RuneRefineButton: Control
declare const TemperCrafting_RuneFavoriteButton: Control
declare const TemperCrafting_RuneWritButton: Control
declare const TemperCrafting_RuneFurnitureButton: Control
declare const TemperCrafting_RuneFavoriteFurnitureButton: Control
declare const TemperCrafting_RuneRefineAllButton: Control
declare const TemperCrafting_RuneHandmadeButton: Control
