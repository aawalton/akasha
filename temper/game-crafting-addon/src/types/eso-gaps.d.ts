declare const ZO_KeybindStripControl: Control

declare const SI_GAMEPAD_HELP_SEARCH: number

declare function PlaySound(soundName: string | undefined): void

interface Control {
  GetAnchor(): LuaMultiReturn<[boolean, number, Control | undefined, number, number, number]>
  SetHeight(height: number): void
}

interface ButtonControl {
  SetFont(font: string): void
  SetNormalFontColor(r: number, g: number, b: number, a: number): void
  SetMouseOverFontColor(r: number, g: number, b: number, a: number): void
  SetHorizontalAlignment(alignment: number): void
  SetVerticalAlignment(alignment: number): void
  EnableMouseButton(button: number, enabled: boolean): void
}

interface TooltipControl {
  SetWornItem(slotIndex: number, ...rest: unknown[]): void
  SetLootItem(lootId: number, ...rest: unknown[]): void
  SetLink(itemLink: string, ...rest: unknown[]): void
  SetAttachedMailItem(mailId: Id64, attachmentIndex: number, ...rest: unknown[]): void
  SetBuybackItem(entryIndex: number, ...rest: unknown[]): void
  SetTradingHouseItem(tradingHouseIndex: number, ...rest: unknown[]): void
  SetTradingHouseListing(tradingHouseListingIndex: number, ...rest: unknown[]): void
  SetTradeItem(tradeWho: number, slotIndex: number, ...rest: unknown[]): void
  SetQuestReward(rewardIndex: number, ...rest: unknown[]): void
}

interface SmithingResultTooltipControl extends TooltipControl {
  SetPendingSmithingItem(
    patternIndex: number,
    materialIndex: number,
    materialQuantity: number,
    itemStyleId: number,
    traitIndex: number
  ): void
}
declare const ZO_SmithingTopLevelCreationPanelResultTooltip: SmithingResultTooltipControl

declare function ZO_ItemTooltip_ClearCondition(tooltip: TooltipControl): void
declare function ZO_ItemTooltip_ClearCharges(tooltip: TooltipControl): void

interface SimpleAnimation {
  SetDuration(durationMs: number): void
  SetStartScale(scale: number): void
  SetEndScale(scale: number): void
}
interface SimpleAnimationTimeline {
  SetPlaybackType(playbackType: number, loopCount?: number): void
  PlayFromStart(): void
}
declare function CreateSimpleAnimation(
  animationType: number,
  controlToAnimate: Control,
  delay?: number
): LuaMultiReturn<[animation: SimpleAnimation, timeline: SimpleAnimationTimeline]>

interface EsoAchievementsManager {
  popup: { Hide(): void }
}

interface CsStyleApi {
  IsPerfectedStyle: (style: number) => boolean
  IsUnknownStyle: (style: number) => boolean
  IsCrownStyle: (style: number) => boolean
  IsSimpleStyle: (style: number) => boolean
  GetChapterId: (style: number, chapter: number) => number
}

interface TemperCraftingControlData {
  crafting?: [{ GetText(): string }, number]
  craftable?: boolean
}

interface MasterMerchantApi {
  isInitialized: boolean
  addStatsAndGraph(tooltip: TooltipControl, itemLink: string, extend: boolean): void
}
declare const MasterMerchant: MasterMerchantApi | undefined

interface TamrielTradeCentrePriceApi {
  AppendPriceInfo(tooltip: TooltipControl, itemInfo: unknown): void
}
declare const TamrielTradeCentre: object | undefined
interface TamrielTradeCentreItemInfoStatic {
  New(itemLink: string): unknown
}
declare const TamrielTradeCentre_ItemInfo: TamrielTradeCentreItemInfoStatic | undefined
