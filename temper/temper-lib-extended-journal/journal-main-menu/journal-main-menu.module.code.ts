import { Internal, Public } from "../journal-state/journal-state.module.code.ts"

const Controls = Internal.controls

ZO_CreateStringId("SI_KEYBINDINGS_CATEGORY_EXTENDED_JOURNAL", GetString(SI_LEJ_NAME))

EVENT_MANAGER.RegisterForEvent(
  Internal.name,
  EVENT_ADD_ON_LOADED,
  (_eventCode: number, addonName: string) => {
    if (addonName !== Internal.name) {
      return
    }

    EVENT_MANAGER.UnregisterForEvent(Internal.name, EVENT_ADD_ON_LOADED)

    Internal.LoadTooltipColors()

    if (!Public.Used) {
      return
    }

    SI_BINDING_NAME_EXTENDED_JOURNAL = SI_LEJ_NAME

    if (
      MAIN_MENU_KEYBOARD.categoryBar !== undefined &&
      MAIN_MENU_KEYBOARD.categoryBarFragment !== undefined
    ) {
      const categoryBar = MAIN_MENU_KEYBOARD.categoryBar
      Controls.mainMenu = categoryBar
      Internal.mainMenuFragment = MAIN_MENU_KEYBOARD.categoryBarFragment
      Internal.FixMainMenuCategory = (): undefined => {
        MAIN_MENU_KEYBOARD.lastCategory = MENU_CATEGORY_CHARACTER
      }

      const iconPrefix = "/esoui/art/treeicons/achievements_indexicon_prologue_"

      ZO_MenuBar_AddButton(categoryBar, {
        descriptor: Internal.name,
        categoryName: SI_LEJ_NAME,
        binding: "EXTENDED_JOURNAL",
        normal: iconPrefix + "up.dds",
        pressed: iconPrefix + "down.dds",
        highlight: iconPrefix + "over.dds",
        callback: () => {
          Public.Show()
        },
      })
    } else {
      Internal.FixMainMenuCategory = () => {}
    }
  }
)
