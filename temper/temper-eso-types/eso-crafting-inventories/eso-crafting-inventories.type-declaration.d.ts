declare const SI_BULLET: number

declare function ZO_PopupTooltip_Hide(): undefined

interface EsoAchievementsManager {
  ShowAchievementPopup: (...args: unknown[]) => undefined
}

declare const ACHIEVEMENTS: EsoAchievementsManager

declare const ZO_SmithingTopLevelImprovementPanelInventoryBackpack: ZoScrollListControl

declare const ZO_UniversalDeconstructionTopLevel_KeyboardPanelInventoryBackpack: ZoScrollListControl

declare const ZO_LootAlphaContainerList: ZoScrollListControl

interface EsoTradingHouseKeyboard {
  searchResultsList: ZoScrollListControl
}

interface SharedInventorySlotData {
  bagId: number
  slotIndex: number
  stackCount: number
  uniqueId: Id64
  itemType: number
  iconFile: string
  name: string
  quality: number
  uid?: string
  lnk?: string
}
