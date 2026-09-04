import {
  asBoolean,
  asPresent,
  asStrRecordOpt,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { asLibSlots } from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import {
  asMoreOptionsButton,
  asSearchUiControl,
} from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

const WM = WINDOW_MANAGER
const MAJOR = "LibSets"
const libPrefix = lib.prefix

const checkLSM = lib.CheckLSM

type ButtonData = {
  parentControl?: Control
  buttonName?: string
  callback?: (this: void, ...args: unknown[]) => void
  width?: number
  height?: number
  normal?: string
  highlight?: string
  pressed?: string
  disabled?: string
  tooltip?: string
}

function addButton(
  this: void,
  myAnchorPoint: number,
  relativeTo: Control | undefined,
  relativePoint: number,
  offsetX: number,
  offsetY: number,
  buttonData: ButtonData | undefined
): LibSetsMoreOptionsButton | undefined {
  if (
    buttonData === undefined ||
    buttonData.parentControl === undefined ||
    buttonData.buttonName === undefined ||
    buttonData.callback === undefined
  ) {
    return undefined
  }
  const btnName = buttonData.parentControl.GetName() + MAJOR + buttonData.buttonName
  let button = WM.GetControlByName<LibSetsMoreOptionsButton>(btnName, "")
  if (button === undefined) {
    button = WM.CreateControl(btnName, buttonData.parentControl, CT_BUTTON)
  }
  if (button !== undefined) {
    const buttonResolved = button
    buttonResolved.SetDimensions(buttonData.width ?? 32, buttonData.height ?? 32)

    buttonResolved.SetAnchor(myAnchorPoint, relativeTo, relativePoint, offsetX, offsetY)

    let texture = WM.GetControlByName<TextureControl>(btnName, "Texture")
    if (texture === undefined) {
      texture = WM.CreateControl(btnName + "Texture", buttonResolved, CT_TEXTURE)
    }
    texture.SetAnchorFill()

    texture.SetTexture(buttonData.normal ?? "")

    buttonResolved.upTexture = buttonData.normal
    buttonResolved.mouseOver = buttonData.highlight
    buttonResolved.clickedTexture = buttonData.pressed

    buttonResolved.tooltipText = buttonData.tooltip
    buttonResolved.tooltipAlign = TOP
    buttonResolved.SetHandler("OnMouseEnter", (...args: unknown[]) => {
      const self = asMoreOptionsButton(args[0])
      asPresent(self.GetChild<TextureControl>(1)).SetTexture(self.mouseOver ?? "")
      ZO_Tooltips_ShowTextTooltip(self, asPresent(self.tooltipAlign), asPresent(self.tooltipText))
    })
    buttonResolved.SetHandler("OnMouseExit", (...args: unknown[]) => {
      const self = asMoreOptionsButton(args[0])
      asPresent(self.GetChild<TextureControl>(1)).SetTexture(self.upTexture ?? "")
      ZO_Tooltips_HideTextTooltip()
    })
    const buttonCallback = buttonData.callback
    buttonResolved.SetHandler("OnClicked", (...args: unknown[]) => {
      buttonCallback(...args)
    })
    buttonResolved.SetHandler("OnMouseUp", (...args: unknown[]) => {
      const butn = asMoreOptionsButton(args[0])
      const upInside = asBoolean(args[2])
      if (upInside) {
        asPresent(butn.GetChild<TextureControl>(1)).SetTexture(butn.upTexture ?? "")
      }
    })
    buttonResolved.SetHandler("OnMouseDown", (...args: unknown[]) => {
      const butn = asMoreOptionsButton(args[0])
      asPresent(butn.GetChild<TextureControl>(1)).SetTexture(butn.clickedTexture ?? "")
    })

    buttonResolved.SetHidden(false)
    buttonResolved.SetMouseEnabled(true)

    return buttonResolved
  }
  return undefined
}

function checkAndChangeActualZoneButtonVisibleState(
  this: void,
  fragmentStateNew?: number
): undefined {
  const itemSetCollectionBookMoreOptionsButton = lib.itemSetCollectionBookMoreOptionsButton
  if (itemSetCollectionBookMoreOptionsButton === undefined) {
    return
  }

  let doHide = !asPresent(lib.svData)["addSetCollectionsCurrentZoneButton"]
  if (doHide === false && fragmentStateNew !== undefined) {
    if (fragmentStateNew === SCENE_FRAGMENT_HIDING) {
      doHide = false
    } else if (fragmentStateNew === SCENE_FRAGMENT_SHOWN) {
      doHide = true
    }
  }
  itemSetCollectionBookMoreOptionsButton.SetHidden(doHide)
}

function addUIButtons(this: void): undefined {
  const addSetCollectionsCurrentZoneButton = asPresent(lib.svData)[
    "addSetCollectionsCurrentZoneButton"
  ]
  if (addSetCollectionsCurrentZoneButton === true) {
    if (lib.itemSetCollectionBookMoreOptionsButton === undefined) {
      const localization = asPresent(asStrRecordOpt(lib.localization[lib.clientLang]))

      const moreOptionsButtonTooltip =
        lib.LSM !== undefined
          ? tostring(localization.moreOptions)
          : tostring(localization.currentZone)
      const buttonDataOpenCurrentParentZone: ButtonData = {
        buttonName: "MoreOptions",
        parentControl: ZO_ItemSetsBook_Keyboard_TopLevelFilters,
        tooltip: libPrefix + moreOptionsButtonTooltip,
        callback: () => {
          if (checkLSM() === true) {
            ClearCustomScrollableMenu()
            AddCustomScrollableMenuEntry(tostring(localization.parentZone), () => {
              lib.OpenSetItemCollectionBrowserForCurrentZone(true)
            })
            AddCustomScrollableMenuEntry(tostring(localization.currentZone), () => {
              if (!lib.OpenSetItemCollectionBrowserForCurrentZone(false)) {
                lib.OpenSetItemCollectionBrowserForCurrentZone(true)
              }
            })
            ShowCustomScrollableMenu(
              asSearchUiControl(asPresent(lib.itemSetCollectionBookMoreOptionsButton))
            )
          } else {
            if (!lib.OpenSetItemCollectionBrowserForCurrentZone(false)) {
              lib.OpenSetItemCollectionBrowserForCurrentZone(true)
            }
          }
        },
        width: 20,
        height: 20,
        normal: "/esoui/art/buttons/dropbox_arrow_normal.dds",
        pressed: "/esoui/art/buttons/dropbox_arrow_mousedown.dds",
        highlight: "/esoui/art/buttons/dropbox_arrow_mouseover.dds",
        disabled: "/esoui/art/buttons/dropbox_arrow_disabled.dds",
      }
      lib.itemSetCollectionBookMoreOptionsButton = addButton(
        LEFT,
        ZO_ItemSetsBook_Keyboard_TopLevelFilters,
        RIGHT,
        ((buttonDataOpenCurrentParentZone.width ?? 0) + 4) * -1,
        10,
        buttonDataOpenCurrentParentZone
      )

      const reconstructFragmentChange = (_oldState: number, newState: number): undefined => {
        if (newState === SCENE_FRAGMENT_SHOWN || newState === SCENE_FRAGMENT_HIDING) {
          checkAndChangeActualZoneButtonVisibleState(newState)
        }
      }
      RETRAIT_STATION_RECONSTRUCT_FRAGMENT.RegisterCallback(
        "StateChange",
        reconstructFragmentChange
      )
    }
  }
  checkAndChangeActualZoneButtonVisibleState()
}
lib.addUIButtons = addUIButtons

asLibSlots(lib)["_addUIButtons"] = addUIButtons
