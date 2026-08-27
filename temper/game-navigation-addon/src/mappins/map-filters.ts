import { addCompassCustomPin } from "./compass-pins"
import { CustomPins } from "./custom-pins-config"
import { AchievementItems } from "./data/achievement-items-data"
import { FishIcon } from "./data/generated/fish-icon-data.generated"
import { InstrumentsTooltip } from "./data/generated/instruments-tooltip-data.generated"
import { MiningSampleTooltip } from "./data/generated/mining-sample-tooltip-data.generated"
import { PrecursorTooltip } from "./data/generated/precursor-tooltip-data.generated"
import { ShrineIcon } from "./data/generated/shrine-icon-data.generated"
import { asControl } from "./narrow"
import { PinsAva, PinsImperial, PinsNirn } from "./pin-membership"
import type { PinDef } from "./pin-types"
import { registerEvents } from "./register-events"
import { getSavedVars } from "./saved-variables"
import { getPinManager, getPinTypeId } from "./state"
import { Loc } from "./ui-strings"

type TooltipText = string | ((this: void) => string)

function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

function getCroppedAchievementInfo(this: void, id: number): LuaMultiReturn<[string, string]> {
  const [name, , , icon] = GetAchievementInfo(id)
  const [pos] = string.find(name, "<<player")
  if (pos !== undefined) {
    const [aCapture, bCapture] = string.match(
      string.sub(name, pos),
      "<<player{([%D]+)/[%D]+}>>([%D]*)"
    )
    const a = parseLuaCapture(aCapture)
    const b = parseLuaCapture(bCapture)
    const cropped = table.concat([string.sub(name, 0, pos - 1), a ?? "", b ?? ""])
    return $multi(cropped, icon)
  }
  return $multi(name, icon)
}

function croppedLine(this: void, id: number, trailingNewline: boolean): string {
  const [name, icon] = getCroppedAchievementInfo(id)
  return zo_strformat("|t24:24:<<2>>|t <<1>>" + (trailingNewline ? "\n" : ""), name, icon)
}

function buildTooltipText(this: void, def: PinDef): TooltipText {
  if (def.name === "pinType_Unknown_POI") {
    return (
      zo_iconFormat("/esoui/art/icons/poi/poi_areaofinterest_incomplete.dds", 24, 24) +
      " " +
      GetString(SI_GAMEPAD_PLAYER_PROGERSS_BAR_UNKNOWN_ZONE) +
      "\n" +
      zo_iconFormat("/esoui/art/icons/poi/poi_crafting_incomplete.dds", 24, 24) +
      " " +
      GetString(SI_SPECIALIZEDITEMTYPE213) +
      "\n" +
      zo_iconFormat("/esoui/art/icons/poi/poi_mundus_incomplete.dds", 24, 24) +
      " " +
      GetString(SI_ZONECOMPLETIONTYPE12)
    )
  }
  if (def.name === "pinType_Shrines") {
    return (
      zo_iconFormat(ShrineIcon[0] ?? "", 24, 24) +
      " " +
      GetString(SI_MONSTERSOCIALCLASS42) +
      "\n" +
      zo_iconFormat(ShrineIcon[1] ?? "", 24, 24) +
      " " +
      GetString(SI_MONSTERSOCIALCLASS45)
    )
  }
  if (def.name === "pinType_Fishing_Nodes") {
    return (
      zo_iconFormat(FishIcon[0] ?? "", 24, 24) +
      " " +
      Loc("Foul") +
      "\n" +
      zo_iconFormat(FishIcon[1] ?? "", 24, 24) +
      " " +
      Loc("River") +
      "\n" +
      zo_iconFormat(FishIcon[2] ?? "", 24, 24) +
      " " +
      Loc("Salt") +
      "\n" +
      zo_iconFormat(FishIcon[3] ?? "", 24, 24) +
      " " +
      Loc("Lake")
    )
  }
  if (def.name === "pinType_Portals") {
    const portal = "/esoui/art/icons/poi/poi_portal_complete.dds"
    return (
      zo_iconFormat(portal, 24, 24) +
      " " +
      Loc("Celestial_Rifts") +
      "\n" +
      zo_iconFormat(portal, 24, 24) +
      " " +
      Loc("Dark_Fissures") +
      "\n" +
      zo_iconFormat(portal, 24, 24) +
      " " +
      Loc("Oblivion_Portals") +
      "\n" +
      zo_iconFormat(portal, 24, 24) +
      " " +
      Loc("Shadow_Fissures") +
      "\n" +
      zo_iconFormat(portal, 24, 24) +
      " " +
      Loc("Lava_Lashers") +
      "\n" +
      zo_iconFormat(portal, 24, 24) +
      " " +
      Loc("Soul_Reaper")
    )
  }
  if (def.name === "pinType_Clockwork_City") {
    return (): string => {
      let text = ""
      for (const [, data] of ipairs(PrecursorTooltip)) {
        const [, c, r] = GetAchievementCriterion(1958, data.v)
        const items = AchievementItems[1958]
        const haveItem = items !== undefined && items[data.v] === true
        const color = c === r ? "|c33EE33" : haveItem ? "|cEEEE22" : "|cEEEEEE"
        const info = "\n[" + color + tostring(data.v) + "|r] "
        text = text + info + data.desc
      }
      return croppedLine(1958, false) + text
    }
  }
  if (def.name === "pinType_Greymoor") {
    return (): string => {
      let text1 = ""
      for (const [, data] of ipairs(MiningSampleTooltip)) {
        const [, c, r] = GetAchievementCriterion(2759, data.v)
        const items = AchievementItems[2759]
        const haveItem = items !== undefined && items[data.v] === true
        const color = c === r ? "|c33EE33" : haveItem ? "|cEEEE22" : "|cEEEEEE"
        const info = "\n[" + color + tostring(data.v) + "|r] "
        text1 = text1 + info + data.desc
      }
      let text2 = ""
      for (const [, data] of ipairs(InstrumentsTooltip)) {
        const [, c, r] = GetAchievementCriterion(2669, data.v)
        const items = AchievementItems[2669]
        const haveItem = items !== undefined && items[data.v] === true
        const color = c === r ? "|c33EE33" : haveItem ? "|cEEEE22" : "|cEEEEEE"
        const info = "\n[" + color + tostring(data.v) + "|r] "
        text2 = text2 + info + data.desc
      }
      const def69: PinDef | undefined = CustomPins[69]
      const def68: PinDef | undefined = CustomPins[68]
      return (
        croppedLine(def69?.ach ?? 0, false) +
        text1 +
        "\n|t300:8:/EsoUI/Art/Miscellaneous/horizontalDivider.dds|t\n" +
        croppedLine(def68?.ach ?? 0, false) +
        text2
      )
    }
  }
  let tooltipText = ""
  for (const [, pin] of pairs(def.pin ?? {})) {
    if (tooltipText !== "") {
      tooltipText = tooltipText + "\n"
    }
    const child: PinDef | undefined = CustomPins[pin]
    if (child !== undefined && child.name === "pinType_Lightbringer") {
      tooltipText =
        tooltipText + croppedLine(873, true) + croppedLine(871, true) + croppedLine(869, false)
    } else if (child !== undefined) {
      const childAch = child.ach
      let name: string
      if (childAch !== undefined) {
        const [cropped] = getCroppedAchievementInfo(childAch)
        name = cropped
      } else {
        const [stripped] = string.gsub(child.name, "pinType_", "")
        name = Loc(stripped)
      }
      const tex = child.def_texture !== undefined ? child.def_texture : asPath(child.texture)
      tooltipText = tooltipText + zo_iconFormat(tex, 24, 24) + " " + name
    }
  }
  return tooltipText
}

function asPath(this: void, tex: PinDef["texture"]): string {
  return typeof tex === "string" ? tex : ""
}

function addCheckbox(this: void, def: PinDef, panel: WorldMapFilterPanel): Control {
  const pool = panel.checkBoxPool
  if (pool === undefined) {
    throw new Error("TemperMapPins: filter panel missing checkBoxPool")
  }
  const checkbox = pool.AcquireObject()
  const icon = zo_iconFormat(asPath(def.def_texture ?? def.texture), 24, 24)
  let name: string
  if (def.ach !== undefined) {
    const [cropped] = getCroppedAchievementInfo(def.ach)
    name = cropped
  } else {
    const [stripped] = string.gsub(def.name, "pinType_", "")
    name = Loc(stripped)
  }
  ZO_CheckButton_SetLabelText(checkbox, icon + " " + name)
  panel.AnchorControl(checkbox)
  const tooltipText: TooltipText = buildTooltipText(def)
  const hasTooltip = typeof tooltipText === "string" ? tooltipText !== "" : true
  if (hasTooltip) {
    checkbox.SetHandler("OnMouseEnter", (...args: unknown[]): undefined => {
      const self = asControl(args[0])
      ZO_Tooltips_ShowTextTooltip(
        self,
        LEFT,
        typeof tooltipText === "string" ? tooltipText : tooltipText()
      )
    })
    checkbox.SetHandler("OnMouseExit", ZO_Tooltips_HideTextTooltip)
  }
  return checkbox
}

function setEnabled(
  this: void,
  i: number,
  def: PinDef,
  control: Control,
  enabled: boolean,
  init: boolean
): undefined {
  const ids = def.id ?? {}
  for (const [pin, id] of pairs(ids)) {
    const needsRefresh = getPinManager().IsCustomPinEnabled(id) !== enabled
    const filterType = GetMapFilterType()
    if (
      filterType === MAP_FILTER_TYPE_STANDARD ||
      filterType === MAP_FILTER_TYPE_AVA_CYRODIIL ||
      filterType === MAP_FILTER_TYPE_AVA_IMPERIAL
    ) {
      ZO_CheckButton_SetCheckState(control, enabled)
    }
    getPinManager().SetCustomPinEnabled(id, enabled)
    if (needsRefresh) {
      addCompassCustomPin(id, pin)
      if (!init) {
        ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(i))
        registerEvents()
      }
    }
  }
}

export function addPinFilter(this: void, i: number): undefined {
  const def: PinDef | undefined = CustomPins[i]
  if (def === undefined) {
    return
  }
  if (PinsNirn[i] === true) {
    const panel = WORLD_MAP_FILTERS.pvePanel
    if (panel !== undefined) {
      const control = addCheckbox(def, panel)
      ZO_CheckButton_SetToggleFunction(control, (self: Control, st: boolean): undefined => {
        getSavedVars()[i] = st
        setEnabled(i, def, self, st, false)
      })
      setEnabled(i, def, control, getSavedVars()[i] === true, true)
    }
  }
  if (PinsAva[i] === true) {
    const panel = WORLD_MAP_FILTERS.pvpPanel
    if (panel !== undefined) {
      const control = addCheckbox(def, panel)
      ZO_CheckButton_SetToggleFunction(control, (self: Control, st: boolean): undefined => {
        getSavedVars()[i] = st
        setEnabled(i, def, self, st, false)
      })
      setEnabled(i, def, control, getSavedVars()[i] === true, true)
    }
  }
  if (PinsImperial[i] === true) {
    const panel = WORLD_MAP_FILTERS.imperialPvPPanel
    if (panel !== undefined) {
      const control = addCheckbox(def, panel)
      ZO_CheckButton_SetToggleFunction(control, (self: Control, st: boolean): undefined => {
        getSavedVars()[i] = st
        setEnabled(i, def, self, st, false)
      })
      setEnabled(i, def, control, getSavedVars()[i] === true, true)
    }
  }
}

function scrollPanel(
  this: void,
  panel: WorldMapFilterPanel | undefined,
  scrollChild: Control | undefined,
  parentControl: Control | undefined,
  checkBox1: Control | undefined,
  comboBox1: Control | undefined,
  container: Control | undefined
): undefined {
  if (panel === undefined) {
    return
  }
  const child =
    scrollChild ??
    WINDOW_MANAGER.CreateControlFromVirtual(
      "ZO_WorldMapFiltersContainer",
      asControl(parentControl),
      "ZO_ScrollContainer"
    ).GetNamedChild("ScrollChild")
  if (panel.checkBoxPool !== undefined) {
    panel.checkBoxPool.parent = child
    for (const [, control] of pairs(panel.checkBoxPool.m_Active)) {
      control.SetParent(asControl(child))
    }
    if (checkBox1 !== undefined) {
      const [, point, anchorControl, relPoint, x, y] = checkBox1.GetAnchor(0)
      if (anchorControl === panel.control && child !== undefined) {
        checkBox1.SetAnchor(point, child, relPoint, x, y)
      }
    }
  }
  if (panel.comboBoxPool !== undefined) {
    panel.comboBoxPool.parent = child
    for (const [, control] of pairs(panel.comboBoxPool.m_Active)) {
      control.SetParent(asControl(child))
    }
    if (comboBox1 !== undefined) {
      const [, point, anchorControl, relPoint, x, y] = comboBox1.GetAnchor(0)
      if (anchorControl === panel.control && child !== undefined) {
        comboBox1.SetAnchor(point, child, relPoint, x, y)
      }
    }
  }
  if (container !== undefined) {
    container.SetAnchorFill()
  }
}

export function makeMapFiltersScroll(this: void): undefined {
  scrollPanel(
    WORLD_MAP_FILTERS.pvePanel,
    ZO_WorldMapFiltersPvEContainerScrollChild,
    ZO_WorldMapFiltersPvE,
    ZO_WorldMapFiltersPvECheckBox1,
    ZO_WorldMapFiltersPvEComboBox1,
    ZO_WorldMapFiltersPvEContainer
  )
  scrollPanel(
    WORLD_MAP_FILTERS.pvpPanel,
    ZO_WorldMapFiltersPvPContainerScrollChild,
    ZO_WorldMapFiltersPvP,
    ZO_WorldMapFiltersPvPCheckBox1,
    ZO_WorldMapFiltersPvPComboBox1,
    ZO_WorldMapFiltersPvPContainer
  )
  scrollPanel(
    WORLD_MAP_FILTERS.imperialPvPPanel,
    ZO_WorldMapFiltersImperialPvPContainerScrollChild,
    ZO_WorldMapFiltersImperialPvP,
    ZO_WorldMapFiltersImperialPvPCheckBox1,
    ZO_WorldMapFiltersImperialPvPComboBox1,
    ZO_WorldMapFiltersImperialPvPContainer
  )
}
