import { getAlertsTooltipMessages } from "../leads-alerts/leads-alerts.module.code.ts"
import {
  LOCDATA_TYPE_FIXLOCATION,
  UNKNOWN,
} from "../leads-location-types/leads-location-types.module.code.ts"
import { LOCATIONS } from "../leads-locations/leads-locations.module.code.ts"
import {
  antiquityFound,
  getLastAntiquityFound,
} from "../leads-reporting/leads-reporting.module.code.ts"
import { SET_ID_TO_ITEM_ID } from "../leads-set-links/leads-set-links.module.code.ts"
import { STRINGS } from "../leads-ui-strings/leads-ui-strings.module.code.ts"
import { getUnitList } from "../leads-unit-list/leads-unit-list.module.code.ts"

function restoreTooltipMaxX(maxX: number): undefined {
  InformationTooltip.SetDimensionConstraints(undefined, undefined, maxX, undefined)
}

let origTooltipMaxX: number | undefined

function addInkling(): undefined {
  ZO_Tooltip_AddDivider(InformationTooltip)
  for (const line of STRINGS.TOOLTIP_INKLING) {
    InformationTooltip.AddLine(line, "ZoFontGameSmall")
  }
}

export function headerMouseEnter(
  this: void,
  control: Control,
  tooltipIndex: number | undefined
): undefined {
  if (tooltipIndex !== undefined) {
    InitializeTooltip(InformationTooltip, control, LEFT, -5, 0)
    const text = STRINGS.SORTHEADER_TOOLTIP[tooltipIndex - 1]
    if (text !== undefined) {
      SetTooltipText(InformationTooltip, text)
    }
  }
}

export function headerMouseExit(
  this: void,
  _control: Control,
  tooltipIndex: number | undefined
): undefined {
  if (tooltipIndex !== undefined) {
    ClearTooltip(InformationTooltip)
  }
}

export function rowMouseEnter(this: void, control: LeadsRowControl): undefined {
  const data = control.data
  if (data !== undefined) {
    InitializeTooltip(InformationTooltip, control, LEFT, -5, 0)
    const [minX, minY, maxX, maxY] = InformationTooltip.GetDimensionConstraints()
    origTooltipMaxX = maxX
    InformationTooltip.SetDimensionConstraints(minX, minY, 500, maxY)
    InformationTooltip.SetAntiquityLead(data.Aid)
    InformationTooltip.AddVerticalPadding(6)
    ZO_Tooltip_AddDivider(InformationTooltip)
    InformationTooltip.AddVerticalPadding(10)
    const locationEntry = LOCATIONS[data.Aid]
    SetTooltipText(
      InformationTooltip,
      "|c42D6D1" + (locationEntry !== undefined ? locationEntry.description : UNKNOWN) + "|r"
    )
    InformationTooltip.AddVerticalPadding(10)
    if (locationEntry !== undefined && locationEntry.type === LOCDATA_TYPE_FIXLOCATION) {
      InformationTooltip.AddLine(STRINGS.TOOLTIP_MAPPINS)
      InformationTooltip.AddVerticalPadding(10)
    }
    ZO_Tooltip_AddDivider(InformationTooltip)
    const itemId = SET_ID_TO_ITEM_ID[data.SetId]
    if (itemId !== undefined) {
      const itemLink = string.format(
        "|H1:item:%d:%d:50:0:0:0:0:0:0:0:0:0:0:0:0:%d:%d:0:0:%d:0|h|h",
        itemId,
        ITEM_DISPLAY_QUALITY_ARTIFACT,
        ITEMSTYLE_NONE,
        0,
        10000
      )
      const [, bonus] = GetItemLinkSetBonusInfo(itemLink, false, 1)
      const armorType = GetItemLinkArmorType(itemLink)
      InformationTooltip.AddVerticalPadding(10)
      if (armorType === 0) {
        InformationTooltip.AddLine(
          zo_strformat("<<1>>", GetString("SI_EQUIPTYPE", GetItemLinkEquipType(itemLink)))
        )
      } else {
        InformationTooltip.AddLine(
          zo_strformat(
            "<<1>> <<2>>",
            GetString("SI_ARMORTYPE", armorType),
            GetString("SI_EQUIPTYPE", GetItemLinkEquipType(itemLink))
          )
        )
      }
      SetTooltipText(InformationTooltip, zo_strformat("<<1>>", bonus))
      InformationTooltip.AddVerticalPadding(6)
      ZO_Tooltip_AddDivider(InformationTooltip)
    }
    for (const line of STRINGS.TOOLTIP_LEAD_HOWUPDATE) {
      InformationTooltip.AddLine(line, "ZoFontGameSmall")
    }
    addInkling()
  }
  getUnitList().Row_OnMouseEnter(control)
}

export function rowMouseExit(this: void, control: LeadsRowControl): undefined {
  if (control.data !== undefined) {
    if (origTooltipMaxX !== undefined) {
      restoreTooltipMaxX(origTooltipMaxX)
    }
    ClearTooltip(InformationTooltip)
  }
  getUnitList().Row_OnMouseExit(control)
}

export function rowMouseUp(this: void, control: LeadsRowControl): undefined {
  const data = control.data
  if (data !== undefined) {
    antiquityFound(0, data.Aid)
  }
}

export function leadFoundMouseEnter(this: void, control: Control): undefined {
  InitializeTooltip(InformationTooltip, control, BOTTOMLEFT, 0, 0)
  const [minX, minY, maxX, maxY] = InformationTooltip.GetDimensionConstraints()
  origTooltipMaxX = maxX
  InformationTooltip.SetDimensionConstraints(minX, minY, 450, maxY)
  for (const line of STRINGS.TOOLTIP_URL) {
    InformationTooltip.AddLine(
      line,
      "",
      1,
      1,
      1,
      LEFT,
      MODIFY_TEXT_TYPE_NONE,
      TEXT_ALIGN_LEFT,
      true
    )
  }
  addInkling()
}

export function leadFoundMouseExit(this: void, _control: Control): undefined {
  if (origTooltipMaxX !== undefined) {
    restoreTooltipMaxX(origTooltipMaxX)
  }
  ClearTooltip(InformationTooltip)
}

export function alertsMouseEnter(this: void, control: Control): undefined {
  InitializeTooltip(InformationTooltip, control, LEFT, -5, 0)
  const [minX, minY, maxX, maxY] = InformationTooltip.GetDimensionConstraints()
  origTooltipMaxX = maxX
  InformationTooltip.SetDimensionConstraints(minX, minY, 450, maxY)
  for (const message of getAlertsTooltipMessages()) {
    InformationTooltip.AddLine(message)
  }
}

export function alertsMouseExit(this: void, _control: Control): undefined {
  if (origTooltipMaxX !== undefined) {
    restoreTooltipMaxX(origTooltipMaxX)
  }
  ClearTooltip(InformationTooltip)
}

export function locationBoxMouseEnter(this: void, control: Control): undefined {
  const lastFound = getLastAntiquityFound()
  if (lastFound !== 0) {
    InitializeTooltip(InformationTooltip, control, LEFT, -25, 0)
    const entry = LOCATIONS[lastFound]
    SetTooltipText(
      InformationTooltip,
      "|c42D6D1" + (entry !== undefined ? entry.description : UNKNOWN) + "|r"
    )
  }
}

export function locationBoxMouseExit(this: void, _control: Control): undefined {
  if (getLastAntiquityFound() !== 0) {
    ClearTooltip(InformationTooltip)
  }
}
