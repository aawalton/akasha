import {
  asCallback,
  asControl,
  asLabelControl,
  asOptionalString,
  asTabData,
  asZoComboBox,
  parseHookArgs,
} from "../journal-casts/journal-casts.module.code.ts"
import type { MenuBarButton, TabData } from "../journal-shape/journal-shape.module.code.ts"
import { Internal } from "../journal-state/journal-state.module.code.ts"

const Controls = Internal.controls

interface TabMenuButton {
  descriptor: string
  categoryName?: string
  title?: string | number
  subtitle?: string | number
  callback: (this: void, button: MenuBarButton) => void
  normal?: string
  pressed?: string
  highlight?: string
}

Internal.LazyInitialize = (initialDescriptor?: string): undefined => {
  if (Internal.initialized) {
    return
  }
  Internal.initialized = true

  Controls.frame = ExtendedJournalFrame
  Controls.menu = asControl(Controls.frame.GetNamedChild("MenuBar"))
  Controls.subtitle = asLabelControl(Controls.menu.GetNamedChild("Label"))

  const fragment = ZO_SimpleSceneFragment.New(Controls.frame)
  fragment.RegisterCallback("StateChange", (_oldState: number, newState: number): undefined => {
    if (newState === SCENE_FRAGMENT_SHOWING) {
      Internal.PrepareTabForDisplay(
        asOptionalString(ZO_MenuBar_GetSelectedDescriptor(Controls.menu))
      )
    } else if (newState === SCENE_FRAGMENT_HIDING) {
      Internal.FireCallbackForCurrentTab("Hide")
      Internal.activeTab = undefined
      Internal.RefreshSettingsButton()
      Internal.CleanupDefaultActionButton()
    }
  })

  const getSetTitleFragment = (): SetTitleFragment => {
    const stfrag = ZO_SetTitleFragment.New()
    stfrag.Show = function (this: SetTitleFragment): undefined {
      if (Controls.title === undefined) {
        Controls.title = SCENE_MANAGER.GetCurrentScene()
          .GetFragmentWithCategory("Title")
          .GetControl()
          .GetNamedChild<LabelControl>("Label")
      }
      Internal.UpdateTitle()
      this.OnShown()
    }
    return stfrag
  }

  const scene = ZO_Scene.New(Internal.SCENE_NAME, SCENE_MANAGER)
  Internal.scene = scene
  scene.AddFragment(fragment)
  scene.AddFragment(FRAME_EMOTE_FRAGMENT_JOURNAL)
  scene.AddFragment(CODEX_WINDOW_SOUNDS)
  scene.AddFragmentGroup(FRAGMENT_GROUP.MOUSE_DRIVEN_UI_WINDOW)
  scene.AddFragmentGroup(FRAGMENT_GROUP.FRAME_TARGET_STANDARD_RIGHT_PANEL)
  if (Internal.altMode === undefined) {
    scene.AddFragment(getSetTitleFragment())
    scene.AddFragment(TITLE_FRAGMENT)
    scene.AddFragment(RIGHT_BG_FRAGMENT)
  } else {
    scene.RemoveFragment(FRAME_PLAYER_FRAGMENT)
  }

  if (Internal.mainMenuFragment !== undefined) {
    scene.AddFragment(Internal.mainMenuFragment)
    scene.AddFragment(TOP_BAR_FRAGMENT)
    scene.AddFragmentGroup(FRAGMENT_GROUP.PLAYER_PROGRESS_BAR_KEYBOARD_CURRENT)
  }

  const descriptors: string[] = []
  for (const descriptor in Internal.tabs) {
    descriptors.push(descriptor)
  }
  table.sort(
    descriptors,
    (a: string, b: string): boolean =>
      asTabData(Internal.tabs[a]).order < asTabData(Internal.tabs[b]).order
  )

  for (const descriptor of descriptors) {
    const tab: TabData = asTabData(Internal.tabs[descriptor])

    const control = tab.control
    control.SetParent(Controls.frame)
    control.ClearAnchors()
    control.SetAnchor(TOPLEFT)
    control.SetAnchor(BOTTOMRIGHT)

    const button: TabMenuButton = {
      descriptor,
      categoryName: tab.name,
      title: tab.title,
      subtitle: tab.subtitle,
      callback: Internal.HandleTabSwitch,
    }

    if (button.title === undefined) {
      const [legacyTitle, legacySubtitle] = zo_strsplit(":", Internal.GetString(tab.name))
      button.title = legacyTitle
      button.subtitle = legacySubtitle
    }

    if (tab.iconPrefix !== undefined) {
      button.normal = tab.iconPrefix + "up.dds"
      button.pressed = tab.iconPrefix + "down.dds"
      button.highlight = tab.iconPrefix + "over.dds"
    } else {
      button.normal = tab.iconNormal
      button.pressed = tab.iconPressed
      button.highlight = tab.iconHighlight
    }

    ZO_MenuBar_AddButton(Controls.menu, button)
  }

  if (initialDescriptor !== undefined) {
    ZO_MenuBar_SelectDescriptor(Controls.menu, initialDescriptor, true)
  } else {
    ZO_MenuBar_SelectFirstVisibleButton(Controls.menu, true)
  }

  SecurePostHook(ZO_COMBO_BOX_DROPDOWN_KEYBOARD, "Show", (...args) => {
    const comboBox = asZoComboBox(parseHookArgs(args)[1])
    if (comboBox.shouldOpenAbove === true) {
      ZO_COMBO_BOX_DROPDOWN_KEYBOARD.control.ClearAnchors()
      ZO_COMBO_BOX_DROPDOWN_KEYBOARD.control.SetAnchor(BOTTOMLEFT, comboBox.GetContainer(), TOPLEFT)
    }
  })

  if (Internal.altMode !== undefined) {
    asCallback(Internal.altMode)()
  }
}
