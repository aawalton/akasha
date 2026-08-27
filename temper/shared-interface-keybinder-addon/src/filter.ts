import { KEYBIND_MANAGER } from "./keybind-manager"
import { state } from "./state"

const FILTER_IDENTIFIER = "TEMPER_KEYBINDER_FILTER_CHANGED"

let filterText = ""
let isBuildList = false

export function installBuildMasterListHook(this: void): undefined {
  const upperCache: Record<string, string | undefined> = {}
  const textFilter = (localizedActionName: string): boolean => {
    let upper = upperCache[localizedActionName]
    if (upper === undefined) {
      upper = zo_strupper(localizedActionName)
      upperCache[localizedActionName] = upper
    }
    return zo_plainstrfind(upper, filterText) !== undefined
  }

  const list = KEYBIND_MANAGER.list
  const orgBuildMasterList = list.BuildMasterList
  list.BuildMasterList = function (this: VkKeybindListManager, ...args: unknown[]): undefined {
    isBuildList = true
    orgBuildMasterList.call(this, ...args)
    isBuildList = false
  }

  const createLayer = (layerData: VkLayerData): VkLayerData => {
    const newLayer = ZO_ShallowTableCopy(layerData)
    newLayer.categories = []
    setmetatable(newLayer, getmetatable(layerData))
    return newLayer
  }

  const orgGetKeybindData = KEYBINDINGS_MANAGER.GetKeybindData
  KEYBINDINGS_MANAGER.GetKeybindData = function (
    this: VkKeybindingsManager,
    ...args: unknown[]
  ): VkLayerData[] {
    if (!isBuildList || filterText === "") {
      return orgGetKeybindData.call(this, ...args)
    }
    const unfiltered = orgGetKeybindData.call(this, ...args)
    const filtered: VkLayerData[] = []
    for (const layerData of unfiltered) {
      let newLayer: VkLayerData | undefined
      for (const categoryData of layerData.categories) {
        if (categoryData.categoryName !== "" && textFilter(categoryData.categoryName)) {
          newLayer = newLayer ?? createLayer(layerData)
          newLayer.categories.push(categoryData)
        } else {
          let newCategory: VkCategoryData | undefined
          for (const action of categoryData.actions) {
            const actionData = action.GetDataSource()
            if (
              (actionData.localizedActionName !== "" &&
                textFilter(actionData.localizedActionName)) ||
              textFilter(actionData.actionName)
            ) {
              newLayer = newLayer ?? createLayer(layerData)
              if (newCategory === undefined) {
                newCategory = ZO_ShallowTableCopy(categoryData)
                newCategory.actions = []
                setmetatable(newCategory, getmetatable(categoryData))
                newLayer.categories.push(newCategory)
              }
              newCategory.actions.push(action)
            }
          }
        }
      }
      if (newLayer !== undefined) {
        filtered.push(newLayer)
      }
    }
    return filtered
  }
}

function doUpdate(this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(FILTER_IDENTIFIER)
  const box = state.searchBox
  if (box === undefined) {
    return
  }
  filterText = zo_strupper(box.GetText())
  KEYBIND_MANAGER.list.BuildMasterList()
  KEYBIND_MANAGER.list.RefreshFilters()
}

export function filterTextChanged(this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(FILTER_IDENTIFIER)
  EVENT_MANAGER.RegisterForUpdate(FILTER_IDENTIFIER, 200, doUpdate)
}
