export interface AccountData {
  Keybindings: Record<string, VkBind[] | undefined>
}

interface VotansKeybinderState {
  account: AccountData
  masterList: Record<string, VkBind[] | undefined>
  isDirty: boolean
  editMode: boolean
  bindingsSyncronized: boolean
  searchBox: EditControl | undefined
}

export const state: VotansKeybinderState = {
  account: { Keybindings: {} },
  masterList: {},
  isDirty: true,
  editMode: false,
  bindingsSyncronized: false,
  searchBox: undefined,
}

export function resetBindingSyncState(this: void): undefined {
  state.bindingsSyncronized = false
  state.editMode = false
}
