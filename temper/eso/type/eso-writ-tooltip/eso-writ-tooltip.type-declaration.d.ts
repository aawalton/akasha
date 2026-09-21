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

interface WritGamepadTooltip {
  tooltips: { [tooltipType: number]: unknown }
  GetTooltipInfo: (
    this: WritGamepadTooltip,
    tooltipType: number
  ) => { control: { container?: unknown } }
  ClearTooltip: (this: WritGamepadTooltip, tooltipType: number, reset?: boolean) => void
  LayoutItem: (
    this: WritGamepadTooltip,
    tooltipType: number,
    itemLink: string,
    a?: boolean,
    b?: unknown,
    c?: boolean
  ) => void
}
