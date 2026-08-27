import "./context-menus-2"

import { getDb } from "../saved-variables"
import type { BuffRowControl } from "./buff-panel"
import {
  POSTTOCHAT_MODE_SELECTED_UNIT,
  POSTTOCHAT_MODE_SELECTED_UNITNAME,
  POSTTOCHAT_MODE_SELECTION,
  POSTTOCHAT_MODE_SELECTION_HEALING,
  postBuffUptime as postBuffUptimeToChat,
  postToChat,
} from "./post-to-chat"
import type { SelectionRowControl } from "./selection-ui"
import {
  getCurrentFight,
  getFightData,
  getSelections,
  type UpdatableControl,
  uncollapsedBuffs,
} from "./ui-state"
import { updateReport } from "./window"

let favs: Record<string, boolean | undefined> = {}
let buffname: string | undefined
let unitType: string | undefined

function addFavouriteBuff(this: void): undefined {
  if (buffname != null) {
    favs[buffname] = true
  }
  updateReport()
  return undefined
}

function removeFavouriteBuff(this: void): undefined {
  if (buffname != null) {
    favs[buffname] = undefined
  }
  updateReport()
  return undefined
}

function postBuffUptime(this: void): undefined {
  if (buffname != null) {
    postBuffUptimeToChat(getCurrentFight(), buffname)
  }
  return undefined
}

function postSelectionBuffUptime(this: void): undefined {
  if (buffname != null) {
    postBuffUptimeToChat(getCurrentFight(), buffname, unitType)
  }
  return undefined
}

function toggleCollapseBuff(this: void): undefined {
  if (buffname != null) {
    if (uncollapsedBuffs[buffname] === true) {
      uncollapsedBuffs[buffname] = undefined
    } else {
      uncollapsedBuffs[buffname] = true
    }
  }

  const buffList =
    TemperCombat_Report.GetNamedChild("_RightPanel")?.GetNamedChild<UpdatableControl>("BuffList")
  buffList?.Update?.(buffList)
  return undefined
}

export function buffContextMenu(
  this: void,
  bufflistitem: BuffRowControl,
  upInside: boolean
): undefined {
  if (!upInside) {
    return undefined
  }

  const dataId = bufflistitem.dataId
  if (typeof dataId !== "string") {
    return undefined
  }
  buffname = dataId
  const db = getDb()
  favs = db.FightReport.FavouriteBuffs

  let func: (this: void) => undefined
  let text: string

  if (favs[buffname] === undefined) {
    func = addFavouriteBuff
    text = GetString(SI_TEMPER_COMBAT_FAVOURITE_ADD)
  } else {
    func = removeFavouriteBuff
    text = GetString(SI_TEMPER_COMBAT_FAVOURITE_REMOVE)
  }

  ClearMenu()
  AddCustomMenuItem(text, func)

  AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_POSTBUFF), postBuffUptime)

  const category = db.FightReport.category

  if (
    (category === "damageOut" || category === "damageIn") &&
    db.FightReport.rightpanel === "buffsout"
  ) {
    unitType = "boss"
    AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_POSTBUFF_BOSS), postSelectionBuffUptime)
  } else if (
    (category === "healingOut" || category === "healingIn") &&
    db.FightReport.rightpanel === "buffsout"
  ) {
    unitType = "group"
    AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_POSTBUFF_GROUP), postSelectionBuffUptime)
  }

  if (bufflistitem.hasDetails === true) {
    const stringId =
      uncollapsedBuffs[buffname] === true ? SI_TEMPER_COMBAT_COLLAPSE : SI_TEMPER_COMBAT_UNCOLLAPSE

    AddCustomMenuItem(GetString(stringId), toggleCollapseBuff)
  }

  ShowMenu(bufflistitem)
  return undefined
}

let unitContextMenuUnitId: number | undefined

function postUnitDPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_SELECTED_UNIT, getCurrentFight(), unitContextMenuUnitId)
  return undefined
}

function postUnitNameDPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_SELECTED_UNITNAME, getCurrentFight(), unitContextMenuUnitId)
  return undefined
}

function postSelectionDPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_SELECTION, getCurrentFight())
  return undefined
}

function postSelectionHPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_SELECTION_HEALING, getCurrentFight())
  return undefined
}

export function unitContextMenu(
  this: void,
  unitItem: SelectionRowControl,
  upInside: boolean
): undefined {
  const db = getDb()
  const category = db.FightReport.category

  if (!(upInside || category === "damageOut" || category === "healingOut")) {
    return undefined
  }

  const dataId = unitItem.dataId

  ClearMenu()

  if (category === "damageOut") {
    unitContextMenuUnitId = typeof dataId === "number" ? dataId : undefined

    const unit =
      unitContextMenuUnitId != null ? getFightData()?.units[unitContextMenuUnitId] : undefined
    if (unit == null) {
      return undefined
    }
    const unitName: string = unit.name

    AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_POSTUNITDPS), postUnitDPS)
    AddCustomMenuItem(
      zo_strformat(GetString(SI_TEMPER_COMBAT_POSTUNITNAMEDPS), unitName, 2),
      postUnitNameDPS
    )

    if (getSelections().unit[category] != null) {
      AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_POSTSELECTIONDPS), postSelectionDPS)
    }
  } else if (category === "healingOut" && getSelections().unit[category] != null) {
    AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_POSTSELECTIONHPS), postSelectionHPS)
  }

  ShowMenu(unitItem)
  return undefined
}

TemperCombat.BuffContextMenu = buffContextMenu
TemperCombat.UnitContextMenu = unitContextMenu
