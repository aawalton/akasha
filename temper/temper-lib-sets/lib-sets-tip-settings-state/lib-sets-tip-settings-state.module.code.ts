interface MenuState {
  lam: LibAddonMenu2Surface | undefined
  settingsMenuCreated: LuaMap<boolean, boolean>
}

function makeMenuCreated(this: void): LuaMap<boolean, boolean> {
  const m = new LuaMap<boolean, boolean>()
  m.set(true, false)
  m.set(false, false)
  return m
}

export const MENU_STATE: MenuState = {
  lam: undefined,
  settingsMenuCreated: makeMenuCreated(),
}
