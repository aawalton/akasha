import { asLsmCastGetOwningWindowThisVoidRecordStringUnknownUnde } from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import { asLsmCastThisVoidCtrlUnknownBoolean } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libUtil = lib.Util

const tos = tostring

const belongsToContextMenuCheck = asLsmCastThisVoidCtrlUnknownBoolean(
  libUtil.belongsToContextMenuCheck
)

interface HiddenClicksSearchable {
  WasTextSearchContextMenuEntryClicked: (this: void) => boolean
}

interface HiddenClicksContextMenu {
  m_dropdownObject: HiddenClicksSearchable
}

export function contextMenuClickFlags(
  this: void,
  gContextMenu: HiddenClicksContextMenu,
  dropdownObject: HiddenClicksSearchable,
  mocCtrl: Record<string, unknown> | undefined,
  isContextMenuVisible: boolean
): LuaMultiReturn<[boolean, boolean, boolean, boolean, boolean]> {
  const doDebugNow = false
  let wasTextSearchContextMenuEntryClicked = dropdownObject.WasTextSearchContextMenuEntryClicked()
  let wasFilterHeaderClicked = false
  let wasEditBoxClickedAtContextMenu = false
  let wasSliderClickedAtContextMenu = false
  let wasMultiIconClickedAtContextMenu = false
  if (isContextMenuVisible && !wasTextSearchContextMenuEntryClicked) {
    wasTextSearchContextMenuEntryClicked =
      gContextMenu.m_dropdownObject.WasTextSearchContextMenuEntryClicked()
    if (doDebugNow) {
      d(">wasTextSearchContextMenuEntryClicked: " + tos(wasTextSearchContextMenuEntryClicked))
    }
    if (!wasTextSearchContextMenuEntryClicked) {
      if (mocCtrl !== undefined) {
        if (mocCtrl.isEditBox === true) {
          wasEditBoxClickedAtContextMenu = true
          if (doDebugNow) {
            d(">wasEditBoxClickedAtContextMenu: " + tos(wasEditBoxClickedAtContextMenu))
          }
        } else if (mocCtrl.isSlider === true) {
          wasSliderClickedAtContextMenu = true
          if (doDebugNow) {
            d(">wasSliderClickedAtContextMenu: " + tos(wasSliderClickedAtContextMenu))
          }
        } else if (mocCtrl.ClearIcons) {
          if (!mocCtrl.closeOnSelect) {
            wasMultiIconClickedAtContextMenu = true
            if (doDebugNow) {
              d(">wasMultiIconClickedAtContextMenu: " + tos(wasMultiIconClickedAtContextMenu))
            }
          }
        } else {
          const owningWindowOfMocCtrl =
            asLsmCastGetOwningWindowThisVoidRecordStringUnknownUnde(mocCtrl).GetOwningWindow()
          if (owningWindowOfMocCtrl !== undefined) {
            if (owningWindowOfMocCtrl.header && belongsToContextMenuCheck(owningWindowOfMocCtrl)) {
              if (doDebugNow) {
                d(">clicked header's child control at the contextMenu")
              }
              wasFilterHeaderClicked = true
            }
          }
        }
      }
    }
  }
  return $multi(
    wasTextSearchContextMenuEntryClicked,
    wasFilterHeaderClicked,
    wasEditBoxClickedAtContextMenu,
    wasSliderClickedAtContextMenu,
    wasMultiIconClickedAtContextMenu
  )
}
