declare function CreateControl(
  name: string | undefined,
  parent: Control | undefined,
  controlType: CtLabel
): LabelControl
declare function CreateControl(
  name: string | undefined,
  parent: Control | undefined,
  controlType: CtTexture
): TextureControl
declare function CreateControl(
  name: string | undefined,
  parent: Control | undefined,
  controlType: CtButton
): ButtonControl
declare function CreateControl(
  name: string | undefined,
  parent: Control | undefined,
  controlType: CtEditBox
): EditControl
declare function CreateControl(
  name: string | undefined,
  parent: Control | undefined,
  controlType: CtBackdrop
): BackdropControl
declare function CreateControl(
  name: string | undefined,
  parent: Control | undefined,
  controlType: CtTopLevel
): TopLevelWindow
declare function CreateControl(
  name: string | undefined,
  parent: Control | undefined,
  controlType: CtControl | CtScroll
): Control
declare function CreateControl(
  name: string | undefined,
  parent: Control | undefined,
  controlType: number
): Control

declare const ELLIPSIS: number
