interface TextBufferControl extends Control {
  AddMessage: (text?: string, r?: number, g?: number, b?: number, colorId?: number) => void
  Clear: () => void
  GetDrawLastEntryIfOutOfRoom: () => boolean
  GetHorizontalAlignment: () => TextAlignment
  GetLineFade: () => LuaMultiReturn<
    [timeBeforeLineBeginsToFade: number, timeItTakesLineToFade: number]
  >
  GetLinkEnabled: () => boolean
  GetMaxHistoryLines: () => number
  GetNumHistoryLines: () => number
  GetNumVisibleLines: () => number
  GetScrollPosition: () => number
  IsSplittingLongMessages: () => boolean
  MoveScrollPosition: (numLines?: number) => void
  SetClearBufferAfterFadeout: (clearAfterFade?: boolean) => void
  SetColorById: (colorId?: number, r?: number, g?: number, b?: number) => void
  SetDrawLastEntryIfOutOfRoom: (drawLastIfOutOfRoom?: boolean) => void
  SetFont: (fontString?: string) => void
  SetHorizontalAlignment: (horizontalAlign?: TextAlignment) => void
  SetLineFade: (timeBeforeLineFadeBegins?: number, timeForLineToFade?: number) => void
  SetLinesInheritAlpha: (linesInheritAlpha?: boolean) => void
  SetLinkEnabled: (linkEnabed?: boolean) => void
  SetMaxHistoryLines: (numLines?: number) => void
  SetScrollPosition: (line?: number) => void
  SetSplitLongMessages: (splitLongMessages?: boolean) => void
  ShowFadedLines: () => void
}
interface TopLevelWindow extends Control {
  AllowBringToTop: () => boolean
  BringWindowToTop: () => void
  SetAllowBringToTop: (allow?: boolean) => void
  SetDrawWhenGuiHidden: (drawWhenHidden?: boolean) => void
  SetTopmost: (isTopmost?: boolean) => void
}
