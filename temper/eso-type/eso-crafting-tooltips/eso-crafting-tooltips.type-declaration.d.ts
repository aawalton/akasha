declare const ZO_KeybindStripControl: Control

declare const SI_GAMEPAD_HELP_SEARCH: number

interface SmithingResultTooltipControl extends TooltipControl {
  SetPendingSmithingItem: (
    patternIndex: number,
    materialIndex: number,
    materialQuantity: number,
    itemStyleId: number,
    traitIndex: number
  ) => undefined
}

declare const ZO_SmithingTopLevelCreationPanelResultTooltip: SmithingResultTooltipControl

declare function ZO_ItemTooltip_ClearCondition(tooltip: TooltipControl): undefined

declare function ZO_ItemTooltip_ClearCharges(tooltip: TooltipControl): undefined

interface SimpleAnimation {
  SetDuration: (durationMs: number) => undefined
  SetStartScale: (scale: number) => undefined
  SetEndScale: (scale: number) => undefined
}

interface SimpleAnimationTimeline {
  SetPlaybackType: (playbackType: number, loopCount?: number) => undefined
  PlayFromStart: () => undefined
}

interface EsoAchievementsManager {
  popup: { Hide: () => undefined }
}
