import type { IpairsFn } from "./casts"
import {
  asCategoryLayoutArray,
  asControl,
  asGlobalTable,
  asIpairsFn,
  asLabelControl,
  asLmmSceneGroupInfo,
  asMenuMetatable,
  asRefreshFn,
  asString,
  asTabClickable,
} from "./casts"
import { MAJOR } from "./constants"
import { getMainMenu } from "./menu"
import type { Lib } from "./types"

export function initMenu(self: Lib): undefined {
  const menu = getMainMenu()
  const menuClass = asMenuMetatable(getmetatable(menu)).__index
  const orgRefreshCategoryIndicators = asRefreshFn(menuClass.RefreshCategoryIndicators)
  const glob = asGlobalTable(globalThis)

  function getCategories(this: void, ...args: unknown[]): unknown {
    menuClass.RefreshCategoryIndicators = orgRefreshCategoryIndicators
    const savedIpairs = asIpairsFn(glob.ipairs)
    const replacement: IpairsFn = (categories) => {
      self.CATEGORY_LAYOUT_INFO = asCategoryLayoutArray(categories)
      glob.ipairs = savedIpairs
      return savedIpairs(categories)
    }
    glob.ipairs = replacement
    return orgRefreshCategoryIndicators(...args)
  }
  menuClass.RefreshCategoryIndicators = getCategories
  menu.RefreshCategoryIndicators()

  EVENT_MANAGER.UnregisterForEvent(MAJOR, EVENT_SECURE_RENDER_MODE_CHANGED)
  EVENT_MANAGER.RegisterForEvent<[enabled: boolean]>(
    MAJOR,
    EVENT_SECURE_RENDER_MODE_CHANGED,
    (_eventCode, enabled) => {
      if (!enabled && getMainMenu().lastCategory === MENU_CATEGORY_MARKET) {
        getMainMenu().lastCategory = MENU_CATEGORY_INVENTORY
        ZO_MenuBar_ClearSelection(getMainMenu().categoryBar)
      }
    }
  )

  const LMMXML = CreateTopLevelWindow("LMMXML")
  LMMXML.SetAnchor(CENTER, GuiRoot, undefined, 0, 28)
  const categoryBar = CreateControlFromVirtual("$(parent)CategoryBar", LMMXML, "ZO_MenuBarTemplate")
  categoryBar.SetAnchor(TOP)
  const sceneGroupBar = CreateControlFromVirtual(
    "$(parent)SceneGroupBar",
    LMMXML,
    "ZO_LabelButtonBar"
  )
  sceneGroupBar.SetAnchor(RIGHT, GuiRoot, undefined, -40, -340)

  const libMainMenuSubcategoryButton = CreateControl<LabelControl>(
    "libMainMenuSubcategoryButton",
    GuiRoot,
    CT_LABEL
  )
  const [cr, cg, cb, ca] = ZO_CONTRAST_TEXT.UnpackRGBA()
  libMainMenuSubcategoryButton.SetColor(cr, cg, cb, ca)
  libMainMenuSubcategoryButton.SetFont("ZoFontHeader3")
  libMainMenuSubcategoryButton.SetHandler("OnMouseEnter", (ctrl: LabelControl) => {
    const [hr, hg, hb, ha] = ZO_HIGHLIGHT_TEXT.UnpackRGBA()
    ctrl.SetColor(hr, hg, hb, ha)
  })
  libMainMenuSubcategoryButton.SetHandler("OnMouseExit", (ctrl: LabelControl) => {
    const [xr, xg, xb, xa] = ZO_CONTRAST_TEXT.UnpackRGBA()
    ctrl.SetColor(xr, xg, xb, xa)
  })
  libMainMenuSubcategoryButton.SetMouseEnabled(true)

  self.control = LMMXML

  self.categoryBar = asControl(GetControl(self.control, "CategoryBar"))
  self.categoryBarFragment = ZO_SimpleSceneFragment.New(self.categoryBar)

  self.sceneGroupBar = asControl(GetControl(self.control, "SceneGroupBar"))
  self.sceneGroupBarLabel = asLabelControl(GetControl(self.control, "SceneGroupBarLabel"))

  self.tabPressedCallback = (ctrl) => {
    if (ctrl.sceneGroupName !== undefined) {
      asTabClickable(self).OnSceneGroupTabClicked(ctrl.sceneGroupName)
    }
  }

  self.sceneShowCallback = (_oldState, newState) => {
    if (newState === SCENE_SHOWING) {
      const sceneGroupInfo = asLmmSceneGroupInfo(
        self.sceneGroupInfo[asString(self.sceneShowGroupName)]
      )
      self.SetupSceneGroupBar(sceneGroupInfo.category, asString(self.sceneShowGroupName))
      const scene = SCENE_MANAGER.GetCurrentScene()
      scene.UnregisterCallback("StateChange", self.sceneShowCallback)
    }
  }

  menu.lastCategory = MENU_CATEGORY_INVENTORY

  self.categoryInfo = menu.categoryInfo
  self.sceneInfo = menu.sceneInfo
  self.sceneGroupInfo = menu.sceneGroupInfo
  self.categoryAreaFragments = menu.categoryAreaFragments
}
