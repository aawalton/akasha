import type { KeybindScrollEntry } from "../types"

declare global {
  interface KeybindScrollbar {
    GetValue(): number
    SetValue(value: number): void
  }

  interface KeybindTimeline {
    Stop(): void
  }

  interface KeybindScrollListControl {
    scrollbar: KeybindScrollbar
    timeline: KeybindTimeline
  }

  interface KeybindingsSortFilterList {
    list: KeybindScrollListControl
    masterList: KeybindScrollEntry[]
    RefreshFilters(): void
    FilterScrollList(this: KeybindingsSortFilterList): void
  }

  interface KeybindingManager {
    list: KeybindingsSortFilterList
  }

  interface ScrollListDataType {
    setupCallback: (this: void, control: object, data: object, list: object) => void
    hideCallback?: (this: void, control: object, data: object) => void
  }

  const KEYBOARD_KEYBINDING_MANAGER: KeybindingManager | undefined
  const KEYBINDING_MANAGER: KeybindingManager | undefined

  const KEYBOARD_OPTIONS: {
    currentPanelId: number
    panelNames: Record<number, string>
  }

  const ZO_KeybindingsList: object

  function ZO_ScrollList_GetDataTypeTable(
    this: void,
    list: object,
    typeId: number
  ): ScrollListDataType

  function ZO_GameMenu_AddControlsPanel(
    this: void,
    panel: {
      id: number
      name: string
      callback: (this: void) => void
      unselectedCallback: (this: void) => void
    }
  ): void

  const ZO_GameMenu_InGame: {
    gameMenu: { navigationTree: Record<string, unknown> }
  }

  const KEYBINDINGS_FRAGMENT: SceneFragment

  const SI_GAME_MENU_KEYBINDINGS: number

  const SI_NONSTR_INGAMESHAREDSTRINGS_LAST_ENTRY: number

  function SafeAddString(this: void, stringId: number, text: string, numOptionalArgs?: number): void
}
