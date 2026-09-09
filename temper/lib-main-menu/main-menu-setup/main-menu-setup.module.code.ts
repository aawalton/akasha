import type { GlobalTable, IpairsFn } from "../main-menu-casts/main-menu-casts.module.code.ts"
import {
  asCategoryLayoutArray,
  asIpairsFn,
  asLmmSceneGroupInfo,
  asMenuMetatable,
  asRefreshFn,
  asTabClickable,
} from "../main-menu-casts/main-menu-casts.module.code.ts"
import { getMainMenu } from "../main-menu-keyboard/main-menu-keyboard.module.code.ts"
import type { Lib } from "../main-menu-shape/main-menu-shape.module.code.ts"
import { MAJOR } from "../main-menu-version/main-menu-version.module.code.ts"

export function initMenu(self: Lib): undefined {
  const menu = getMainMenu()
  const menuClass = asMenuMetatable(getmetatable(menu)).__index
  const orgRefreshCategoryIndicators = asRefreshFn(menuClass.RefreshCategoryIndicators)
  const glob = globalThis as GlobalTable

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

  const lmmXml = CreateTopLevelWindow("LMMXML")
  lmmXml.SetAnchor(CENTER, GuiRoot, undefined, 0, 28)
  const categoryBar = CreateControlFromVirtual("$(parent)CategoryBar", lmmXml, "ZO_MenuBarTemplate")
  categoryBar.SetAnchor(TOP)
  const sceneGroupBar = CreateControlFromVirtual(
    "$(parent)SceneGroupBar",
    lmmXml,
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
  libMainMenuSubcategoryButton.SetHandler("OnMouseEnter", (ctrl: unknown) => {
    const label = ctrl as LabelControl
    const [hr, hg, hb, ha] = ZO_HIGHLIGHT_TEXT.UnpackRGBA()
    label.SetColor(hr, hg, hb, ha)
  })
  libMainMenuSubcategoryButton.SetHandler("OnMouseExit", (ctrl: unknown) => {
    const label = ctrl as LabelControl
    const [xr, xg, xb, xa] = ZO_CONTRAST_TEXT.UnpackRGBA()
    label.SetColor(xr, xg, xb, xa)
  })
  libMainMenuSubcategoryButton.SetMouseEnabled(true)

  self.control = lmmXml

  self.categoryBar = GetControl(self.control, "CategoryBar") as Control
  self.categoryBarFragment = ZO_SimpleSceneFragment.New(self.categoryBar)

  self.sceneGroupBar = GetControl(self.control, "SceneGroupBar") as Control
  self.sceneGroupBarLabel = GetControl(self.control, "SceneGroupBarLabel") as LabelControl

  self.tabPressedCallback = (ctrl) => {
    if (ctrl.sceneGroupName !== undefined) {
      asTabClickable(self).OnSceneGroupTabClicked(ctrl.sceneGroupName)
    }
  }

  self.sceneShowCallback = (_oldState, newState) => {
    if (newState === SCENE_SHOWING) {
      const sceneGroupInfo = asLmmSceneGroupInfo(
        self.sceneGroupInfo[self.sceneShowGroupName as string]
      )
      self.SetupSceneGroupBar(sceneGroupInfo.category, self.sceneShowGroupName as string)
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
