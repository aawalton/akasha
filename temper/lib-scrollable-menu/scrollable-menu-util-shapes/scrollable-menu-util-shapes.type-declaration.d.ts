interface AnimationManagerLike {
  CreateTimelineFromVirtual: (
    this: AnimationManagerLike,
    timelineName: string,
    animatedControl: unknown
  ) => unknown
  [key: string]: unknown
}

interface EventManagerLike {
  RegisterForUpdate: (
    this: EventManagerLike,
    namespace: string,
    interval: number,
    callback: (this: void) => undefined
  ) => undefined
  UnregisterForUpdate: (this: EventManagerLike, namespace: string) => undefined
  [key: string]: unknown
}

interface ControlLike {
  GetName?: (this: ControlLike) => string
  GetAnchor: (
    this: ControlLike,
    index: number
  ) => LuaMultiReturn<[boolean, number, ControlLike | undefined, number, number, number, number]>
  GetRight: (this: ControlLike) => number
  GetWidth: (this: ControlLike) => number
  GetHeight: (this: ControlLike) => number
  SetFadeGradient: (
    this: ControlLike,
    gradientIndex: number,
    normalX: number,
    normalY: number,
    gradientLength: number
  ) => undefined
  [key: string]: unknown
}

interface ComboBoxLike {
  m_enableMultiSelect?: unknown
  m_multiSelectItemData?: unknown
  m_dropdownObject?: unknown
  m_sortedItems?: unknown
  openingControl?: unknown
  isSubmenu?: unknown
  isContextMenu?: unknown
  [key: string]: unknown
}

interface SelfWithSubmenu {
  GetSubmenu: (this: SelfWithSubmenu) => unknown
  [key: string]: unknown
}
