interface WritGamepadTooltipSection {
  AddLine: (this: WritGamepadTooltipSection, text: string, style?: unknown) => void
}

interface WritGamepadTooltip {
  GetTooltip: (this: WritGamepadTooltip, tooltipType: number) => WritGamepadTooltip
  AcquireSection: (this: WritGamepadTooltip, style: unknown) => WritGamepadTooltipSection
  GetStyle: (this: WritGamepadTooltip, styleName: string) => unknown
  AddSection: (this: WritGamepadTooltip, section: WritGamepadTooltipSection) => void
}

declare const GAMEPAD_TOOLTIPS: WritGamepadTooltip

declare const GAMEPAD_LEFT_TOOLTIP: number

declare const ConfirmMasterWrit: object | undefined

interface TooltipControl {
  SetLootItem: (lootId: number, ...rest: unknown[]) => void
  SetTradingHouseItem: (tradingHouseIndex: number, ...rest: unknown[]) => void
}
