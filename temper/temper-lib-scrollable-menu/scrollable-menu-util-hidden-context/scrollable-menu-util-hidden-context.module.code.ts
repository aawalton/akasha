import { asBoolean } from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastGetOwningWindowThisUnknownUnknown,
  asLsmCastGetParentThisUnknownRecordStringUnknown,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import type { LsmCastIsDropdownVisibleThisUnknownBooleanMDropdownO } from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastRecordStringRecordStringUnknown,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
  asLsmCastRecordStringUnknownUndefined2,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidCtrlUnknownBoolean } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidUndefined,
  asObject,
  asUnknown,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

type LsmCastLocalTypeofGetControlName = typeof getControlName
function asLsmCastLocalTypeofGetControlName(value: unknown): LsmCastLocalTypeofGetControlName {
  return value as LsmCastLocalTypeofGetControlName
}

import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libUtil = lib.Util

const tos = tostring

let getControlName: (this: void, control: unknown, alternativeControl?: unknown) => string

const libUtil_BelongsToContextMenuCheck = asLsmCastThisVoidCtrlUnknownBoolean(
  libUtil.belongsToContextMenuCheck
)
const hideContextMenu = asLsmCastThisVoidUndefined(libUtil.hideContextMenu)

export function hiddenForContextMenuReasons(
  this: void,
  selfVar: Record<string, unknown>,
  button: number,
  mocCtrl: Record<string, unknown> | undefined,
  comboBox: Record<string, unknown> | undefined,
  entry: unknown,
  isSubmenu: unknown,
  gContextMenu: unknown,
  cm: LsmCastIsDropdownVisibleThisUnknownBooleanMDropdownO,
  contextMenuDropdownObject: Record<string, unknown>,
  isCntxtMenuOwnedByComboBox: boolean
): boolean {
  const doDebugNow = false
  let returnValue = false
  let clickedNoEntry = false
  if (doDebugNow) {
    d(">isContextMenu -> TRUE")
  }
  let doNotHideContextMenu = false
  let mocCtrlName: string | undefined

  if (button === MOUSE_BUTTON_INDEX_LEFT) {
    if (!comboBox) {
      if (doDebugNow) {
        d("<2 not comboBox -> true")
      }
      returnValue = true
      clickedNoEntry = true
    } else {
      if (type(entry) === "table" && ZO_IsTableEmpty(asObject(entry))) {
        if (doDebugNow) {
          d(
            "<2 ZO_IsTableEmpty(entry) -> true; ctxtDropdown==mocCtrl.dropdown: " +
              tos(
                contextMenuDropdownObject === asLsmCastRecordStringUnknown(mocCtrl).m_dropdownObject
              ) +
              "; owningWind==cntxMen: " +
              tos(
                asLsmCastGetOwningWindowThisUnknownUnknown(mocCtrl).GetOwningWindow() ===
                  cm.m_dropdown
              )
          )
        }
        if (mocCtrl) {
          if (mocCtrl === asLsmCastRecordStringUnknown(GuiRoot)) {
            returnValue = true
            clickedNoEntry = true
          } else {
            const mc = asLsmCastRecordStringUnknown(mocCtrl)
            if (
              contextMenuDropdownObject === mc.m_dropdownObject ||
              (mc.GetOwningWindow &&
                asLsmCastGetOwningWindowThisUnknownUnknown(mc).GetOwningWindow() === cm.m_dropdown)
            ) {
              if (doDebugNow) {
                d(">>2 - submenu search header editBox or refresh button clicked")
              }
              returnValue = false
              doNotHideContextMenu = true
            } else {
              if (doDebugNow) {
                d(">!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                const lsmDebug = asLsmCastRecordStringUnknown(
                  asLsmCastRecordStringUnknownUndefined(_G.LSM_Debug) ?? {}
                )
                _G.LSM_Debug = lsmDebug
                const checkIfHiddenForReasonsDbg = asLsmCastRecordStringUnknown(
                  asLsmCastRecordStringUnknownUndefined2(lsmDebug.checkIfHiddenForReasons) ?? {}
                )
                lsmDebug.checkIfHiddenForReasons = checkIfHiddenForReasonsDbg

                getControlName =
                  getControlName ?? asLsmCastLocalTypeofGetControlName(libUtil.getControlName)
                mocCtrlName = getControlName(mocCtrl)
                checkIfHiddenForReasonsDbg[mocCtrlName] = {
                  mocCtrl: (type(mocCtrl) === "table" && ZO_ShallowTableCopy(mocCtrl)) || undefined,
                  closeOnSelect: mc.closeOnSelect,
                  isCntxtMenOwnedByComboBox: isCntxtMenuOwnedByComboBox,
                  enableMultiSelect: selfVar.m_enableMultiSelect,
                }
              }
              if (mc.m_owner === undefined) {
                const parent = asLsmCastGetParentThisUnknownRecordStringUnknown(mc).GetParent()
                mocCtrl = parent
                if (doDebugNow && mocCtrlName !== undefined) {
                  asLsmCastRecordStringUnknown(
                    asLsmCastRecordStringRecordStringUnknown(
                      asLsmCastRecordStringUnknown(_G.LSM_Debug).checkIfHiddenForReasons
                    )[mocCtrlName]
                  ).parent = parent
                }
              }
              const owner = asLsmCastRecordStringUnknown(mocCtrl).m_owner
              if (doDebugNow) {
                d(
                  ">>2 - isSubmenu: " +
                    tos(isSubmenu) +
                    "/" +
                    tos((owner && asLsmCastRecordStringUnknown(owner).isSubmenu) || undefined) +
                    "; closeOnSelect: " +
                    tos(
                      (mocCtrl && asLsmCastRecordStringUnknown(mocCtrl).closeOnSelect) || undefined
                    )
                )
                if (owner && mocCtrlName !== undefined) {
                  const dbgEntry = asLsmCastRecordStringUnknown(
                    asLsmCastRecordStringRecordStringUnknown(
                      asLsmCastRecordStringUnknown(_G.LSM_Debug).checkIfHiddenForReasons
                    )[mocCtrlName]
                  )
                  dbgEntry.owner = owner
                  dbgEntry.isSubmenu = isSubmenu || asLsmCastRecordStringUnknown(owner).isSubmenu
                }
              }
              if (
                owner &&
                (isSubmenu === true || asLsmCastRecordStringUnknown(owner).isSubmenu === true) &&
                isCntxtMenuOwnedByComboBox === true
              ) {
                if (doDebugNow) {
                  d(
                    ">>2 - clicked contextMenu entry, not moc.closeOnSelect: " +
                      tos(!asLsmCastRecordStringUnknown(mocCtrl).closeOnSelect) +
                      ", multiSelect: " +
                      tos(selfVar.m_enableMultiSelect) +
                      ", result: " +
                      tos(
                        !asLsmCastRecordStringUnknown(mocCtrl).closeOnSelect ||
                          selfVar.m_enableMultiSelect
                      )
                  )
                }
                returnValue =
                  !asLsmCastRecordStringUnknown(mocCtrl).closeOnSelect ||
                  asBoolean(selfVar.m_enableMultiSelect)
              } else {
                if (doDebugNow) {
                  d(">>2 owner and no submenu -> return true")
                }
                returnValue = true
              }
              if (doDebugNow && mocCtrlName !== undefined) {
                asLsmCastRecordStringUnknown(
                  asLsmCastRecordStringRecordStringUnknown(
                    asLsmCastRecordStringUnknown(_G.LSM_Debug).checkIfHiddenForReasons
                  )[mocCtrlName]
                ).returnValue = returnValue
                d("<!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
              }
            }
          }
        } else {
          if (doDebugNow) {
            d(">>2 no mocCtrl -> return true")
          }
          returnValue = true
          clickedNoEntry = true
        }
      } else {
        if (mocCtrl) {
          if (mocCtrl === asLsmCastRecordStringUnknown(GuiRoot)) {
            if (doDebugNow) {
              d(">>2_1GuiRoot!")
            }
            returnValue = true
            clickedNoEntry = true
          } else {
            const mc = asLsmCastRecordStringUnknown(mocCtrl)
            const owner =
              asUnknown(mc.m_owner) ??
              asUnknown(asLsmCastGetParentThisUnknownRecordStringUnknown(mc).GetParent().m_owner)
            if (owner) {
              if (doDebugNow) {
                d(">>2_1owner found")
              }
              if (owner === gContextMenu) {
                if (doDebugNow) {
                  d(">>2_1 - closeOnSelect: " + tos(mc.closeOnSelect))
                }
                returnValue = asBoolean(mc.closeOnSelect)
              } else {
                if (doDebugNow) {
                  d(
                    ">>2_1 - true: isSubmenu: " +
                      tos(isSubmenu) +
                      "/" +
                      tos(asLsmCastRecordStringUnknown(owner).isSubmenu) +
                      "; closeOnSelect: " +
                      tos(mc.closeOnSelect)
                  )
                }
                if (
                  (isSubmenu === true || asLsmCastRecordStringUnknown(owner).isSubmenu === true) &&
                  isCntxtMenuOwnedByComboBox === true
                ) {
                  if (doDebugNow) {
                    d(
                      ">>>2_1 - clicked contextMenu entry, not moc.closeOnSelect: " +
                        tos(!mc.closeOnSelect)
                    )
                  }
                  returnValue = !mc.closeOnSelect || asBoolean(selfVar.m_enableMultiSelect)
                } else {
                  if (doDebugNow) {
                    d(">>>2_1 - true")
                  }
                  returnValue = true
                }
              }
            } else {
              if (doDebugNow) {
                d(">>2_1 - owner not found")
              }
              clickedNoEntry = true
            }
          }
        }
      }
    }

    if (
      !clickedNoEntry &&
      ((mocCtrl && asLsmCastRecordStringUnknown(mocCtrl).closeOnSelect === false) ||
        selfVar.m_enableMultiSelect)
    ) {
      doNotHideContextMenu = true
      if (doDebugNow) {
        d("1??? Setting suppressNextOnGlobalMouseUp = true ???")
      }
      asLsmCastRecordStringUnknown(lib.preventerVars).suppressNextOnGlobalMouseUp = true
      if (doDebugNow) {
        d(
          ">suppressNextOnGlobalMouseUp: " +
            tos(asLsmCastRecordStringUnknown(lib.preventerVars).suppressNextOnGlobalMouseUp)
        )
      }
      returnValue = false
    }
  } else if (button === MOUSE_BUTTON_INDEX_RIGHT) {
    if (
      mocCtrl &&
      contextMenuDropdownObject === asLsmCastRecordStringUnknown(mocCtrl).m_dropdownObject
    ) {
      returnValue = false
      doNotHideContextMenu = true
    } else {
      if (mocCtrl && libUtil_BelongsToContextMenuCheck(mocCtrl)) {
        returnValue = false
        doNotHideContextMenu = true
      } else {
        returnValue = true
      }
    }
  }

  if (!doNotHideContextMenu) {
    hideContextMenu()
  }
  return returnValue
}
