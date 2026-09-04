import { installActionBarTimerHooks } from "../fco-skill-action-bar-timers/fco-skill-action-bar-timers.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"

const skillsWindow = SKILLS_WINDOW

type SkillTypeStateMap = Record<number, boolean | undefined>

function isSkillTypeStateMap(this: void, value: unknown): value is SkillTypeStateMap {
  return type(value) === "table"
}

function changeSkillLineTypeEntry(
  this: void,
  ctrl: FcocsSkillLineEntryControl | undefined,
  newStatus: boolean | undefined,
  isContextMenu: boolean
): boolean | undefined {
  if (ctrl === undefined) {
    return false
  }
  if (newStatus === undefined && isContextMenu) {
    return false
  }
  const settings = STATE.settingsVars.settings
  if (settings.enableSkillLineContextMenu !== true) {
    return false
  }

  const data = ctrl.node?.data ?? ctrl.data
  if (data !== undefined) {
    let foundError = false
    let status = newStatus
    if (data.isSubclassingNode !== true) {
      const skillLineTypeData = data
      const skillLineIndex = skillLineTypeData.skillLineIndex
      const skillType = skillLineTypeData.skillTypeData?.skillType
      if (skillLineIndex !== undefined && skillType !== undefined) {
        const skillLineIndexStateMap = settings.skillLineIndexState
        if (isContextMenu) {
          if (status !== undefined) {
            ctrl.SetEnabled(status)
          }
          const existing = skillLineIndexStateMap[skillLineIndex]
          let skillTypeStateMap: SkillTypeStateMap
          if (isSkillTypeStateMap(existing)) {
            skillTypeStateMap = existing
          } else {
            skillTypeStateMap = {}
            skillLineIndexStateMap[skillLineIndex] = skillTypeStateMap
          }
          let newStatusSavedVars: boolean | undefined
          if (status === false) {
            newStatusSavedVars = false
          }
          skillTypeStateMap[skillType] = newStatusSavedVars
        } else {
          const skillLineIndexSavedData = skillLineIndexStateMap[skillLineIndex]
          if (isSkillTypeStateMap(skillLineIndexSavedData)) {
            const skillLineIndexState = skillLineIndexSavedData[skillType]
            if (skillLineIndexState !== undefined) {
              ctrl.SetEnabled(skillLineIndexState)
              status = skillLineIndexState
            } else {
              foundError = true
            }
          } else {
            foundError = true
          }
          if (foundError) {
            ctrl.SetEnabled(true)
            if (status === undefined) {
              status = false
            }
          }
        }
      }
    } else {
      foundError = true
    }

    if (!foundError && status !== undefined && ctrl.statusIcon !== undefined) {
      const statusIcon = ctrl.statusIcon
      if (!statusIcon.HasIcon()) {
        const statusIconTextureVar = "/esoui/art/buttons/cancel_up.dds"
        if (status === true) {
          statusIcon.ClearIcons()
          statusIcon.SetColor(0, 0, 0, 1)
          statusIcon.Hide()
        } else {
          statusIcon.AddIcon(statusIconTextureVar)
          statusIcon.SetColor(1, 0, 0, 1)
          statusIcon.Show()
        }
      }
    }
  }
  return undefined
}

function setSkillLineTypeStatus(
  this: void,
  ctrl: FcocsSkillLineEntryControl | undefined,
  status: boolean | undefined
): boolean | undefined {
  if (ctrl === undefined || status === undefined) {
    return false
  }
  let contextMenuEntryText = ""
  const newStatus = !status
  if (status) {
    contextMenuEntryText = "Mark skill line as 'non relevant'"
  } else {
    contextMenuEntryText = "Mark skill line as 'relevant' again"
  }
  AddCustomScrollableMenuEntry(contextMenuEntryText, function (this: void): undefined {
    changeSkillLineTypeEntry(ctrl, newStatus, true)
  })
  return undefined
}

function addSkillTypeContextMenuEntry(
  this: void,
  ctrl: FcocsSkillLineEntryControl | undefined
): boolean | undefined {
  const settings = STATE.settingsVars.settings
  if (settings.enableSkillLineContextMenu !== true) {
    return false
  }
  if (skillsWindow.control.IsHidden()) {
    return undefined
  }
  if (ctrl !== undefined) {
    ClearCustomScrollableMenu(ctrl)
    if (ctrl.enabled !== undefined) {
      setSkillLineTypeStatus(ctrl, ctrl.enabled)
      ShowCustomScrollableMenu(ctrl)
    }
  }
  return undefined
}

const preHookedSkillTypeEntryCtrls = new LuaMap<FcocsSkillLineEntryControl, boolean>()

export function preHookSkillLinesOnMouseDown(this: void): undefined {
  const skillLinesTree = skillsWindow.skillLinesTree
  if (
    skillsWindow !== undefined &&
    skillLinesTree !== undefined &&
    skillLinesTree.rootNode !== undefined &&
    skillLinesTree.rootNode.children !== undefined
  ) {
    const skillsWindowSkillTypesHeader = skillLinesTree.rootNode.children
    for (const skillTypeHeaderData of skillsWindowSkillTypesHeader) {
      if (skillTypeHeaderData !== undefined && skillTypeHeaderData.children !== undefined) {
        for (const skillTypeData of skillTypeHeaderData.children) {
          if (
            skillTypeData !== undefined &&
            skillTypeData.control !== undefined &&
            skillTypeData.enabled === true
          ) {
            const skillTypeEntryCtrl = skillTypeData.control
            const data = skillTypeEntryCtrl.node?.data ?? skillTypeEntryCtrl.data
            if (data !== undefined && data.isSubclassingNode !== true) {
              if (preHookedSkillTypeEntryCtrls.get(skillTypeEntryCtrl) !== true) {
                ZO_PostHookHandler(
                  skillTypeEntryCtrl,
                  "OnMouseUp",
                  function (
                    this: void,
                    ctrl: FcocsSkillLineEntryControl,
                    button: number,
                    upInside: boolean
                  ): undefined {
                    if (button === MOUSE_BUTTON_INDEX_RIGHT && upInside) {
                      addSkillTypeContextMenuEntry(ctrl)
                    }
                  }
                )
                preHookedSkillTypeEntryCtrls.set(skillTypeEntryCtrl, true)
              }
              changeSkillLineTypeEntry(skillTypeEntryCtrl, undefined, false)
            }
          }
        }
      }
    }
  }
}

installActionBarTimerHooks()

let SKILLS_ON_EFFECTIVELY_SHOWN_HOOKED = false
export function skillChanges(this: void): undefined {
  if (!SKILLS_ON_EFFECTIVELY_SHOWN_HOOKED) {
    ZO_PreHook("ZO_Skills_OnEffectivelyShown", function (this: void): unknown {
      if (STATE.settingsVars.settings.enableSkillLineContextMenu !== true) {
        return false
      }
      zo_callLater(function (this: void): undefined {
        preHookSkillLinesOnMouseDown()
      }, 150)
      return undefined
    })
    SKILLS_ON_EFFECTIVELY_SHOWN_HOOKED = true
  }
}
