import type { LakTable } from "../addon-keybinds-types/addon-keybinds-types.module.code.ts"

export function addGameMenuEntry(
  this: void,
  lak: LakTable,
  keybindingManager: KeybindingManager,
  panelName: string
): undefined {
  const panelId = KEYBOARD_OPTIONS.currentPanelId
  KEYBOARD_OPTIONS.currentPanelId = panelId + 1
  KEYBOARD_OPTIONS.panelNames[panelId] = panelName

  const sflist = keybindingManager.list

  const savedScrollPos = new LuaTable<boolean, number>()
  savedScrollPos.set(false, 0)
  savedScrollPos.set(true, 0)

  const setShowAddonKeybinds = (state: boolean, forceRefresh?: boolean): undefined => {
    if (lak.showAddonKeybinds !== state) {
      savedScrollPos.set(!state, sflist.list.scrollbar.GetValue())
      lak.showAddonKeybinds = state
      sflist.RefreshFilters()
      sflist.list.timeline.Stop()
      sflist.list.scrollbar.SetValue(savedScrollPos.get(state))
    } else if (forceRefresh === true) {
      sflist.RefreshFilters()
    }
    return undefined
  }

  const selectedCallback = (): undefined => {
    GAME_MENU_SCENE.AddFragment(KEYBINDINGS_FRAGMENT)
    setShowAddonKeybinds(true)
    return undefined
  }

  const unselectedCallback = (): undefined => {
    GAME_MENU_SCENE.RemoveFragment(KEYBINDINGS_FRAGMENT)
    setShowAddonKeybinds(false)
    return undefined
  }

  ZO_GameMenu_AddControlsPanel({
    id: panelId,
    name: panelName,
    callback: selectedCallback,
    unselectedCallback: unselectedCallback,
  })

  const gameMenu = ZO_GameMenu_InGame.gameMenu
  ZO_PreHook(gameMenu.navigationTree, "Reset", unselectedCallback)
  return undefined
}
