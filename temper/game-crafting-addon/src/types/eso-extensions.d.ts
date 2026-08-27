declare function GetCraftingSkillLineIndices(
  tradeskillType: number
): LuaMultiReturn<[skillType: number, skillLineIndex: number]>

declare const SI_BULLET: number

declare function GetRecallCost(): number

declare function ZO_PopupTooltip_Hide(): void

interface EsoAchievementsManager {
  ShowAchievementPopup(...args: unknown[]): void
}
declare const ACHIEVEMENTS: EsoAchievementsManager

declare const ZO_PlayerInventoryList: ZoScrollListControl
declare const ZO_PlayerBankBackpack: ZoScrollListControl
declare const ZO_GuildBankBackpack: ZoScrollListControl
declare const ZO_HouseBankBackpack: ZoScrollListControl
declare const ZO_SmithingTopLevelDeconstructionPanelInventoryBackpack: ZoScrollListControl
declare const ZO_SmithingTopLevelImprovementPanelInventoryBackpack: ZoScrollListControl
declare const ZO_UniversalDeconstructionTopLevel_KeyboardPanelInventoryBackpack: ZoScrollListControl
declare const ZO_LootAlphaContainerList: ZoScrollListControl

interface EsoTradingHouseKeyboard {
  searchResultsList: ZoScrollListControl
}
declare const TRADING_HOUSE: EsoTradingHouseKeyboard

interface TemperCraftingControlData {
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
}

interface Control {
  data?: TemperCraftingControlData
  SetDimensions(width: number | undefined, height: number): void
  SetMovable(movable: boolean): void
}

interface Control {
  GetChild<T extends Control = Control>(index: number): T | undefined
}
