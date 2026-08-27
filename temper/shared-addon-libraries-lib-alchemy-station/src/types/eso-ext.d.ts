declare function ZO_MenuBar_AddButton(menuBar: Control, buttonData: object): Control | undefined
declare function ZO_MenuBar_SelectDescriptor(
  menuBar: Control,
  descriptor: number | string,
  animate: boolean
): boolean
declare function ZO_MenuBar_GetSelectedDescriptor(menuBar: Control): number | string

declare function GetString(stringId: number | string): string

interface AlchemyStation {
  mode: number | string
  modeBar: Control
  modeBarLabel: LabelControl
  control: Control
  SetMode(this: AlchemyStation, mode: number | string): void
}
declare const ALCHEMY: AlchemyStation

declare const ZO_AlchemyTopLevel: Control
declare const ZO_SharedRightPanelBackground: Control

interface Control {
  SetExcludeFromResizeToFitExtents(exclude: boolean): void
}
