import { asLabelControl } from "../potion-casts/potion-casts.module.code.ts"
import {
  TEXTURE_POISON_DISABLED,
  TEXTURE_POISON_DOWN,
  TEXTURE_POISON_OVER,
  TEXTURE_POISON_UP,
} from "../potion-constants/potion-constants.module.code.ts"
import {
  getAccountSettings,
  getPlayerSettings,
  getSavedFavorites,
} from "../potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"
import { clearTooltips } from "../potion-tooltip-helpers/potion-tooltip-helpers.module.code.ts"
import {
  clearInventory,
  clearResultList,
  loadSolventSelection,
  refreshCurrentPage,
  refreshTitle,
  saveSolventSelection,
  showFilterPage,
  showStationOrTopLevel,
} from "../potion-window-helpers/potion-window-helpers.module.code.ts"

interface SceneManagerView {
  AddSceneGroup: (this: SceneManagerView, name: string, sceneGroup: unknown) => undefined
  ShowBaseScene: (this: SceneManagerView) => undefined
}
function asSceneManagerView(value: unknown): SceneManagerView {
  return value as SceneManagerView
}

interface SceneWithFragmentGroup extends Scene {
  AddFragmentGroup: (this: Scene, fragmentGroup: object) => void
}
function asSceneWithFragmentGroup(value: unknown): SceneWithFragmentGroup {
  return value as SceneWithFragmentGroup
}

type KeybindDescriptorArray = KeybindButtonGroupDescriptor[]
function asKeybindDescriptorArray(value: unknown): KeybindDescriptorArray {
  return value as KeybindDescriptorArray
}

function asControl(value: unknown): Control {
  return value as Control
}

function initMainMenu(this: void): undefined {
  const descriptor = PotMaker.name
  const sceneName = PotMaker.name

  const sceneManagerView = asSceneManagerView(SCENE_MANAGER)

  const scene = asSceneWithFragmentGroup(ZO_Scene.New(sceneName, SCENE_MANAGER))

  scene.AddFragmentGroup(FRAGMENT_GROUP.MOUSE_DRIVEN_UI_WINDOW)
  scene.AddFragment(RIGHT_PANEL_BG_FRAGMENT)

  scene.AddFragment(FRAME_EMOTE_FRAGMENT_MAP)
  scene.AddFragment(ZO_WindowSoundFragment.New(SOUNDS.ALCHEMY_OPENED, SOUNDS.ALCHEMY_CLOSED))

  const fragment = ZO_FadeSceneFragment.New(TemperPotionsTopLevel, false, 0)
  fragment.RegisterCallback("StateChange", (_oldState: number, newState: number): undefined => {
    if (newState === SCENE_FRAGMENT_SHOWING) {
      PotMaker.Init()

      EVENT_MANAGER.RegisterForEvent(
        PotMaker.name,
        EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
        PotMaker.slotUpdated
      )
      showStationOrTopLevel()
      let mode = getPlayerSettings().lastUsedTab
      if (mode !== PotMaker.descriptorPotion && mode !== PotMaker.descriptorPoison) {
        mode = PotMaker.descriptorPotion
      }
      if (ZO_MenuBar_GetSelectedDescriptor(PotMaker.modeBar) !== mode) {
        ZO_MenuBar_SelectDescriptor(PotMaker.modeBar, mode)
      } else {
        PotMaker.addStuffToInventory()
      }
    } else if (newState === SCENE_FRAGMENT_SHOWN) {
      refreshTitle()
      refreshCurrentPage()
      PushActionLayerByName(GetString(SI_KEYBINDINGS_LAYER_POTIONMAKER))
      KEYBIND_STRIP.AddKeybindButtonGroup(asKeybindDescriptorArray(PotMaker.keybindStripDescriptor))
    } else if (newState === SCENE_FRAGMENT_HIDING) {
      EVENT_MANAGER.UnregisterForEvent(PotMaker.name, EVENT_INVENTORY_SINGLE_SLOT_UPDATE)
      clearTooltips()
      KEYBIND_STRIP.RemoveKeybindButtonGroup(
        asKeybindDescriptorArray(PotMaker.keybindStripDescriptor)
      )
      RemoveActionLayerByName(GetString(SI_KEYBINDINGS_LAYER_POTIONMAKER))
    } else if (newState === SCENE_FRAGMENT_HIDDEN) {
      ClearMenu()
      if (!PotMaker.resultListShown) {
        clearResultList()
        clearInventory()
      }
    }
  })
  scene.AddFragment(fragment)

  sceneManagerView.AddSceneGroup("TemperPotionsSceneGroup", ZO_SceneGroup.New(descriptor))

  PotMaker.modeBar = asControl(TemperPotionsTopLevel.GetNamedChild("ModeMenuBar"))
  PotMaker.modeBarLabel = asLabelControl(PotMaker.modeBar.GetNamedChild("Label"))

  function potions(this: void): undefined {
    const creationData = {
      activeTabText: SI_BINDING_NAME_POTIONMAKER,
      categoryName: SI_BINDING_NAME_POTIONMAKER,
      descriptor: PotMaker.descriptorPotion,
      normal: "esoui/art/inventory/inventory_tabicon_consumables_up.dds",
      pressed: "esoui/art/inventory/inventory_tabicon_consumables_down.dds",
      highlight: "esoui/art/inventory/inventory_tabicon_consumables_over.dds",
      disabled: "esoui/art/inventory/inventory_tabicon_consumables_disabled.dds",
      callback: function (this: void): undefined {
        saveSolventSelection()
        PotMaker.solventMode = ITEMTYPE_POTION_BASE
        if (PotMaker.atAlchemyStation || SCENE_MANAGER.IsShowing(sceneName)) {
          showStationOrTopLevel()
          showFilterPage()
          TemperPotions.title.SetText(GetString(SI_BINDING_NAME_POTIONMAKER))
          PotMaker.addStuffToInventory()
          PotMaker.updateControls()
          getPlayerSettings().lastUsedTab = PotMaker.descriptorPotion
          loadSolventSelection()
        }
      },
    }

    ZO_MenuBar_AddButton(PotMaker.modeBar, creationData)
  }
  function poisons(this: void): undefined {
    const creationData = {
      activeTabText: SI_BINDING_NAME_POISONMAKER,
      categoryName: SI_BINDING_NAME_POISONMAKER,
      descriptor: PotMaker.descriptorPoison,
      normal: TEXTURE_POISON_UP,
      pressed: TEXTURE_POISON_DOWN,
      highlight: TEXTURE_POISON_OVER,
      disabled: TEXTURE_POISON_DISABLED,
      callback: function (this: void): undefined {
        saveSolventSelection()
        PotMaker.solventMode = ITEMTYPE_POISON_BASE
        if (PotMaker.atAlchemyStation || SCENE_MANAGER.IsShowing(sceneName)) {
          showStationOrTopLevel()
          showFilterPage()
          TemperPotions.title.SetText(GetString(SI_BINDING_NAME_POISONMAKER))
          PotMaker.addStuffToInventory()
          PotMaker.updateControls()
          getPlayerSettings().lastUsedTab = PotMaker.descriptorPoison
          loadSolventSelection()
        }
      },
    }

    ZO_MenuBar_AddButton(PotMaker.modeBar, creationData)
  }

  potions()
  poisons()

  PotMaker.LMM2 = LibMainMenu2
  PotMaker.LMM2?.Init()

  const categoryLayoutInfo = {
    binding: "POTIONMAKER",
    categoryName: SI_BINDING_NAME_POTIONMAKER,
    callback: function (this: void, _buttonData: unknown): undefined {
      if (!SCENE_MANAGER.IsShowing(sceneName)) {
        SCENE_MANAGER.Show(sceneName)
      } else {
        sceneManagerView.ShowBaseScene()
      }
    },
    visible: function (this: void, _buttonData: unknown): boolean {
      return getAccountSettings().showMainMenuItem
    },
    normal: "esoui/art/inventory/inventory_tabicon_consumables_up.dds",
    pressed: "esoui/art/inventory/inventory_tabicon_consumables_down.dds",
    highlight: "esoui/art/inventory/inventory_tabicon_consumables_over.dds",
    disabled: "esoui/art/inventory/inventory_tabicon_consumables_disabled.dds",
  }

  PotMaker.LMM2?.AddMenuItem(descriptor, categoryLayoutInfo as LibMainMenu2MenuItemData)
  GAMEPAD_ALCHEMY_ROOT_SCENE.AddFragment(RIGHT_PANEL_BG_FRAGMENT)
  GAMEPAD_ALCHEMY_ROOT_SCENE.AddFragment(fragment)

  ZO_MenuBar_SelectDescriptor(
    PotMaker.modeBar,
    getPlayerSettings().lastUsedTab ?? PotMaker.descriptorPotion
  )
}
PotMaker.initMainMenu = initMainMenu

function initFavorites(this: void): undefined {
  PotMaker.samePotions = {}
  PotMaker.sameTraits = {}
  for (const id in getSavedFavorites()) {
    const data = getSavedFavorites()[id]
    if (data !== undefined) {
      PotMaker.samePotions[String(data.samePotion)] = true
      PotMaker.sameTraits[String(data.sameTraits)] = true
    }
  }
}
PotMaker.initFavorites = initFavorites
