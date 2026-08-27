import { getAntiquityDigZoneName } from "./active-leads"
import { DropdownHideTooltip, DropdownShowTooltip, SetupDropdown } from "./dropdowns"
import { strings } from "./locale/ui-strings"
import { transmogrify } from "./reporting"
import { toggleRDL } from "./toggle"
import {
  AlertsMouseEnter,
  AlertsMouseExit,
  HeaderMouseEnter,
  HeaderMouseExit,
  LeadfoundMouseEnter,
  LeadfoundMouseExit,
  LocationBoxMouseEnter,
  LocationBoxMouseExit,
  RowMouseEnter,
  RowMouseExit,
  RowMouseUp,
} from "./tooltips"

export interface TemperLeadsApi {
  toggleRDL: typeof toggleRDL
  SetupDropdown: typeof SetupDropdown
  DropdownShowTooltip: typeof DropdownShowTooltip
  DropdownHideTooltip: typeof DropdownHideTooltip
  HeaderMouseEnter: typeof HeaderMouseEnter
  HeaderMouseExit: typeof HeaderMouseExit
  RowMouseEnter: typeof RowMouseEnter
  RowMouseExit: typeof RowMouseExit
  RowMouseUp: typeof RowMouseUp
  LeadfoundMouseEnter: typeof LeadfoundMouseEnter
  LeadfoundMouseExit: typeof LeadfoundMouseExit
  AlertsMouseEnter: typeof AlertsMouseEnter
  AlertsMouseExit: typeof AlertsMouseExit
  LocationBoxMouseEnter: typeof LocationBoxMouseEnter
  LocationBoxMouseExit: typeof LocationBoxMouseExit
  transmogrify: typeof transmogrify
  SORTHEADER_NAMES: typeof strings.SORTHEADER_NAMES
  getAntiquityDigZoneName: typeof getAntiquityDigZoneName
}

declare global {
  var TemperLeads: TemperLeadsApi | undefined
}

globalThis.TemperLeads = {
  toggleRDL,
  SetupDropdown,
  DropdownShowTooltip,
  DropdownHideTooltip,
  HeaderMouseEnter,
  HeaderMouseExit,
  RowMouseEnter,
  RowMouseExit,
  RowMouseUp,
  LeadfoundMouseEnter,
  LeadfoundMouseExit,
  AlertsMouseEnter,
  AlertsMouseExit,
  LocationBoxMouseEnter,
  LocationBoxMouseExit,
  transmogrify,
  SORTHEADER_NAMES: strings.SORTHEADER_NAMES,
  getAntiquityDigZoneName,
}
