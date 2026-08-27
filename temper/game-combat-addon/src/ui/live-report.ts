import type { CurrentData } from "../core/types"
import { getDb } from "../saved-variables"
import { isTooltipList, refreshLiveReport, resizeLiveReport } from "./live-report-2"
import type { LayoutControl, TooltipCarrier } from "./ui-helpers"
import { namedChild, storeOrigLayout } from "./ui-helpers"

export { resizeLiveReport }

interface LiveReportControl extends LayoutControl, TopLevelWindow {
  Toggle?: (this: void, control: Control, value?: boolean) => undefined
}

declare global {
  const TemperCombat_LiveReport: LiveReportControl
}

export function maxStat(): string {
  const [, magicka] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_MAGICKA)
  const [, stamina] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_STAMINA)
  const [, health] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_HEALTH)

  let maxPower = "Magicka"
  if (stamina > magicka) {
    maxPower = "Stamina"
  }
  if (health > magicka && health > stamina) {
    maxPower = "Health"
  }
  return maxPower
}

let fragment: HUDFadeSceneFragment | undefined

export function toggleLiveReport(value?: boolean): undefined {
  const liveReport = TemperCombat_LiveReport
  const resolved = value ?? liveReport.IsHidden()

  const frag = assert(fragment)

  if (resolved === true) {
    SCENE_MANAGER.GetScene("hud").AddFragment(frag)
    SCENE_MANAGER.GetScene("hudui").AddFragment(frag)
    SCENE_MANAGER.GetScene("siegeBar").AddFragment(frag)

    const currentScene = SCENE_MANAGER.currentScene != null ? SCENE_MANAGER.currentScene.name : ""
    const isShownForCurrentScene =
      currentScene === "hud" || currentScene === "hudui" || currentScene === "siegeBar"

    liveReport.SetHidden(!isShownForCurrentScene)
  } else {
    SCENE_MANAGER.GetScene("hud").RemoveFragment(frag)
    SCENE_MANAGER.GetScene("hudui").RemoveFragment(frag)
    SCENE_MANAGER.GetScene("siegeBar").RemoveFragment(frag)

    liveReport.SetHidden(true)
  }
  return undefined
}

export function setLiveReportLocked(locked: boolean): undefined {
  const liveReport = TemperCombat_LiveReport
  namedChild(liveReport, "ResizeFrame").SetMouseEnabled(!locked)
  liveReport.SetMovable(!locked)
  return undefined
}

export function setLiveReportBgAlpha(alpha: number): undefined {
  namedChild(TemperCombat_LiveReport, "BG").SetAlpha(alpha)
  return undefined
}

export function updateLiveReport(data?: CurrentData): undefined {
  if (data == null) {
    refreshLiveReport()
    return undefined
  }

  const livereport = TemperCombat_LiveReport
  const db = getDb()
  const DPSOut = data.DPSOut
  const DPSIn = data.DPSIn
  const HPSOut = data.HPSOut
  const HPSAOut = data.OHPSOut ?? 0
  const HPSIn = data.HPSIn
  const dpstime = data.dpstime
  const hpstime = data.hpstime
  const groupDPSOut = data.groupDPSOut
  const groupDPSIn = data.groupDPSIn
  const groupHPSOut = data.groupHPSOut

  if ((DPSOut === 0 && HPSOut === 0 && DPSIn === 0) || livereport.IsHidden()) {
    return undefined
  }

  let SDPS = 0
  let groupSDPS = 0

  if (db.liveReport.damageOutSingle) {
    const block = namedChild(livereport, "DamageOutSingle")
    const iconControl = namedChild<TextureControl>(block, "Icon")
    const tooltipControl = namedChild<TooltipCarrier>(block, "Tooltip")
    const texture = "/esoui/art/icons/mapkey/mapkey_fightersguild.dds"
    let tooltip: number = SI_TEMPER_COMBAT_LIVEREPORT_DPSSINGLE_TOOLTIP

    if (data.bossfight === true) {
      iconControl.SetTexture("esoui/art/tutorial/poi_groupboss_complete.dds")
      tooltip = SI_TEMPER_COMBAT_LIVEREPORT_DPSBOSS_TOOLTIP
    }

    iconControl.SetTexture(texture)
    const tooltipLines = tooltipControl.tooltip
    if (isTooltipList(tooltipLines)) {
      tooltipLines[0] = tooltip
    }
    SDPS = data.bossDPSOut ?? 0
    groupSDPS = data.bossDPSOutGroup ?? 0
  }

  let DPSString: string | number
  let HPSString: string | number
  let DPSInString: string | number
  let SDPSString: string | number
  const maxtime = zo_roundToNearest(zo_max(dpstime, hpstime), 0.1)
  const timeString = string.format("%d:%04.1f", maxtime / 60, maxtime % 60)

  if (db.recordgrp === true && (groupDPSOut > 0 || groupDPSIn > 0 || groupHPSOut > 0)) {
    let dpsratio = 0
    let hpsratio = 0
    let idpsratio = 0
    let sdpsratio = 0
    if (groupDPSOut > 0) {
      dpsratio = zo_floor((DPSOut / groupDPSOut) * 1000) / 10
    }
    if (groupDPSIn > 0) {
      idpsratio = zo_floor((DPSIn / groupDPSIn) * 1000) / 10
    }
    if (groupSDPS > 0) {
      sdpsratio = zo_floor((SDPS / groupSDPS) * 1000) / 10
    }
    if (groupHPSOut > 0) {
      hpsratio = zo_floor((HPSOut / groupHPSOut) * 1000) / 10
    }

    DPSString = zo_strformat(GetString(SI_TEMPER_COMBAT_SHOW_XPS), DPSOut, groupDPSOut, dpsratio)
    DPSInString = zo_strformat(GetString(SI_TEMPER_COMBAT_SHOW_XPS), DPSIn, groupDPSIn, idpsratio)
    HPSString = zo_strformat(GetString(SI_TEMPER_COMBAT_SHOW_XPS), HPSOut, groupHPSOut, hpsratio)
    SDPSString = zo_strformat(GetString(SI_TEMPER_COMBAT_SHOW_XPS), SDPS, groupSDPS, sdpsratio)
  } else {
    DPSString = DPSOut
    DPSInString = DPSIn
    HPSString = HPSOut
    SDPSString = SDPS
  }

  const setLabel = (blockName: string, text: string | number): undefined => {
    namedChild<LabelControl>(namedChild(livereport, blockName), "Label").SetText(text)
    return undefined
  }

  setLabel("DamageOutSingle", SDPSString)
  setLabel("DamageOut", DPSString)
  setLabel("HealOut", HPSString)
  setLabel("HealOutAbsolute", HPSAOut)
  setLabel("DamageIn", DPSInString)
  setLabel("HealIn", HPSIn)
  setLabel("Time", timeString)
  return undefined
}

export function initLiveReport(): undefined {
  const setLR = getDb().liveReport
  const liveReport = TemperCombat_LiveReport

  const bg = namedChild(liveReport, "BG")

  storeOrigLayout(liveReport)

  const pos = getDb().TemperCombat_LiveReport

  liveReport.ClearAnchors()
  liveReport.SetAnchor(CENTER, undefined, TOPLEFT, pos.x, pos.y)

  fragment = ZO_HUDFadeSceneFragment.New(liveReport)

  liveReport.Toggle = (_control, value) => toggleLiveReport(value)

  toggleLiveReport(setLR.enabled)
  resizeLiveReport(setLR.scale)
  namedChild(liveReport, "ResizeFrame").SetMouseEnabled(!setLR.locked)
  liveReport.SetMovable(!setLR.locked)

  bg.SetAlpha(setLR.bgalpha / 100)
  return undefined
}
