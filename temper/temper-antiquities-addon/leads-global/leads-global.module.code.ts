import { getAntiquityDigZoneName } from "../leads-active-leads/leads-active-leads.module.code.ts"
import {
  dropdownHideTooltip,
  dropdownShowTooltip,
  setupDropdown,
} from "../leads-dropdowns/leads-dropdowns.module.code.ts"
import { transmogrify } from "../leads-reporting/leads-reporting.module.code.ts"
import { toggleLeadsWindow } from "../leads-toggle/leads-toggle.module.code.ts"
import {
  alertsMouseEnter,
  alertsMouseExit,
  headerMouseEnter,
  headerMouseExit,
  leadFoundMouseEnter,
  leadFoundMouseExit,
  locationBoxMouseEnter,
  locationBoxMouseExit,
  rowMouseEnter,
  rowMouseExit,
  rowMouseUp,
} from "../leads-tooltips/leads-tooltips.module.code.ts"
import { STRINGS } from "../leads-ui-strings/leads-ui-strings.module.code.ts"

globalThis.TemperLeads = {
  toggleRDL: toggleLeadsWindow,
  SetupDropdown: setupDropdown,
  DropdownShowTooltip: dropdownShowTooltip,
  DropdownHideTooltip: dropdownHideTooltip,
  HeaderMouseEnter: headerMouseEnter,
  HeaderMouseExit: headerMouseExit,
  RowMouseEnter: rowMouseEnter,
  RowMouseExit: rowMouseExit,
  RowMouseUp: rowMouseUp,
  LeadfoundMouseEnter: leadFoundMouseEnter,
  LeadfoundMouseExit: leadFoundMouseExit,
  AlertsMouseEnter: alertsMouseEnter,
  AlertsMouseExit: alertsMouseExit,
  LocationBoxMouseEnter: locationBoxMouseEnter,
  LocationBoxMouseExit: locationBoxMouseExit,
  transmogrify,
  SORTHEADER_NAMES: STRINGS.SORTHEADER_NAMES,
  getAntiquityDigZoneName,
}
