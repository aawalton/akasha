import {
  asAnimationFieldHolder,
  asAnimationTimeline,
  asTableKey,
} from "../shifter-casts/shifter-casts.module.code.ts"
import { ANIMATION_FIELD_NAME } from "../shifter-constants/shifter-constants.module.code.ts"
import {
  fireCallback,
  getShallowClonedTable,
  refreshFilter,
} from "../shifter-helpers/shifter-helpers.module.code.ts"
import { ShifterBoxListProto } from "../shifter-list-class/shifter-list-class.module.code.ts"
import { lib } from "../shifter-state/shifter-state.module.code.ts"
import type {
  MasterEntry,
  RowData,
  ShifterBoxList,
} from "../shifter-types/shifter-types.module.code.ts"

ShifterBoxListProto.AddEntry = function (this: ShifterBoxList, key, value, categoryId): undefined {
  const data: MasterEntry = {
    value,
    categoryId,
  }
  this.masterList.set(asTableKey(key), data)
}

ShifterBoxListProto.RemoveEntry = function (
  this: ShifterBoxList,
  key
): LuaMultiReturn<[unknown, unknown, unknown]> {
  const existing = this.masterList.get(asTableKey(key))
  if (existing !== undefined) {
    const data = getShallowClonedTable(existing)
    this.masterList.delete(asTableKey(key))
    if (this.list.selectedMultiData !== undefined) {
      this.list.selectedMultiData.delete(asTableKey(key))
    }
    return $multi(key, data?.value, data?.categoryId)
  }
  return $multi(undefined, undefined, undefined)
}

ShifterBoxListProto.ClearMasterList = function (this: ShifterBoxList): undefined {
  this.masterList = new LuaTable()
  refreshFilter(this, true)
}

ShifterBoxListProto.UnselectEntries = function (this: ShifterBoxList): undefined {
  this.list.selectedMultiData = new LuaTable()
  this.CommitScrollList()
  this.buttonControl.SetState(BSTATE_DISABLED, true)
}

ShifterBoxListProto.SelectControl = function (
  this: ShifterBoxList,
  control: Control,
  animateInstantly?: boolean
): undefined {
  const controlTemplate = this.list.selectionTemplate
  const animationFieldName = ANIMATION_FIELD_NAME
  if (controlTemplate !== undefined) {
    const holder = asAnimationFieldHolder(control)
    if (holder[animationFieldName] === undefined) {
      const highlight = CreateControlFromVirtual(
        "$(parent)Scroll",
        control,
        controlTemplate,
        animationFieldName
      )
      holder[animationFieldName] = asAnimationTimeline(
        ANIMATION_MANAGER.CreateTimelineFromVirtual("ShowOnMouseOverLabelAnimation", highlight)
      )
    }
    if (animateInstantly === true) {
      asAnimationTimeline(holder[animationFieldName]).PlayInstantlyToEnd()
    } else {
      asAnimationTimeline(holder[animationFieldName]).PlayForward()
    }
  }
}

ShifterBoxListProto.UnselectControl = function (
  this: ShifterBoxList,
  control: Control,
  animateInstantly?: boolean
): undefined {
  const animationFieldName = ANIMATION_FIELD_NAME
  const holder = asAnimationFieldHolder(control)
  if (holder[animationFieldName] !== undefined) {
    if (animateInstantly === true) {
      asAnimationTimeline(holder[animationFieldName]).PlayInstantlyToStart()
    } else {
      asAnimationTimeline(holder[animationFieldName]).PlayBackward()
    }
  }
}

ShifterBoxListProto.ToggleEntrySelection = function (
  this: ShifterBoxList,
  data?: RowData,
  control?: Control,
  reselectingDuringRebuild?: boolean,
  animateInstantly?: boolean,
  deselectOnReselect?: boolean
): undefined {
  if (!this.enabled) return
  const reselecting = reselectingDuringRebuild ?? false
  const animate = animateInstantly ?? false
  const deselect = deselectOnReselect ?? true
  let dataKey: unknown
  if (data !== undefined) {
    for (let i = 0; i < this.list.data.length; i++) {
      const entry = this.list.data[i]
      if (entry === undefined) continue
      const currData = entry.data
      if (currData === data) {
        dataKey = currData.key
        break
      }
    }
    if (dataKey === undefined) {
      return
    }
  }
  if (this.list.selectedMultiData === undefined) {
    this.list.selectedMultiData = new LuaTable()
  }
  if (data !== undefined) {
    let entryControl = control
    if (entryControl === undefined) {
      entryControl = ZO_ScrollList_GetDataControl(this.list, data)
    }
    const selectedMultiData = this.list.selectedMultiData
    if (selectedMultiData !== undefined) {
      if (selectedMultiData.get(asTableKey(dataKey)) === undefined) {
        selectedMultiData.set(asTableKey(dataKey), data)
        if (entryControl !== undefined) this.SelectControl(entryControl, animate)
        fireCallback(
          this.shifterBox,
          entryControl,
          lib.EVENT_ENTRY_HIGHLIGHTED,
          this.shifterBox,
          dataKey,
          data.value,
          data.categoryId,
          this.isLeftList
        )
      } else if (deselect) {
        selectedMultiData.delete(asTableKey(dataKey))
        if (entryControl !== undefined) this.UnselectControl(entryControl, animate)
        fireCallback(
          this.shifterBox,
          entryControl,
          lib.EVENT_ENTRY_UNHIGHLIGHTED,
          this.shifterBox,
          dataKey,
          data.value,
          data.categoryId,
          this.isLeftList
        )
      }
    }
  }
  if (this.list.selectionCallback !== undefined) {
    this.list.selectionCallback(data, this.list.selectedMultiData, reselecting)
  }
}
