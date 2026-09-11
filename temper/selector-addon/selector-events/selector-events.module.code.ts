import { GLOBAL_PACK_NAME } from "akasha/temper/selector-addon/selector-constants/selector-constants.module.code.ts"
import { getCurrentSelectedPack } from "akasha/temper/selector-addon/selector-saved-variables/selector-saved-variables.module.code.ts"
import { searchAddon } from "akasha/temper/selector-addon/selector-search/selector-search.module.code.ts"
import { STRINGS } from "akasha/temper/selector-addon/selector-strings/selector-strings.module.code.ts"
import { refreshPackDropdown } from "akasha/temper/selector-addon/selector-ui-dropdown/selector-ui-dropdown.module.code.ts"
import {
  createSelectorControls,
  getControls,
} from "akasha/temper/selector-addon/selector-ui-layout/selector-ui-layout.module.code.ts"

const ADDONS_HOST_SCENE = "gameMenuInGame"

function onAddonsPanelShown(): undefined {
  if (getControls() === undefined) {
    createSelectorControls()
    wireSearchBox()
  }
  refreshPackDropdown()
  restoreSelectedPackLabel()
}

function wireSearchBox(): undefined {
  const controls = getControls()
  if (controls === undefined) {
    return
  }
  controls.searchBox.SetHandler("OnEnter", function (this: void): undefined {
    const c = getControls()
    if (c !== undefined) {
      searchAddon(c.searchBox.GetText())
    }
  })
}

function restoreSelectedPackLabel(): undefined {
  const controls = getControls()
  if (controls === undefined) {
    return
  }
  const ref = getCurrentSelectedPack()
  if (ref === undefined || ref.packName === "") {
    return
  }
  const owner =
    ref.charName === "" || ref.charName === GLOBAL_PACK_NAME ? STRINGS.packGlobal : ref.charName
  controls.selectedPackLabel.SetText(STRINGS.selectedPackName.replace("%s", owner) + ref.packName)
}

export function registerEvents(): undefined {
  const scene = SCENE_MANAGER.GetScene(ADDONS_HOST_SCENE)
  scene.RegisterCallback(
    "StateChange",
    function (this: void, _oldState: number, newState: number): undefined {
      if (newState === SCENE_SHOWING) {
        onAddonsPanelShown()
      }
    }
  )
}
