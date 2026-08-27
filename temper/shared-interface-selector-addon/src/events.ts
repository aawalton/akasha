import { GLOBAL_PACK_NAME } from "./constants"
import { getCurrentSelectedPack } from "./saved-variables"
import { searchAddon } from "./search"
import { STRINGS } from "./strings"
import { refreshPackDropdown } from "./ui-dropdown"
import { createSelectorControls, getControls } from "./ui-layout"

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
